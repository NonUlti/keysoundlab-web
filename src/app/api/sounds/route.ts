import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 사운드 파일 메타데이터 조회
 * GET /api/sounds?switchId=cherry-mx-red
 *
 * 지정한 스위치의 사운드 파일 존재 여부와 경로를 반환.
 * switchId 없이 호출하면 전체 사운드 디렉토리 구조를 반환.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const switchId = searchParams.get('switchId');

  const soundsDir = path.join(process.cwd(), 'public', 'sounds');

  if (switchId) {
    return getSwitchSounds(soundsDir, switchId);
  }

  return getAllSounds(soundsDir);
}

async function getSwitchSounds(soundsDir: string, switchId: string) {
  const keyTypes = ['default', 'spacebar', 'enter', 'shift', 'backspace', 'stabilizer'] as const;

  // 구조화된 경로 확인: /sounds/{switchId}/{keyType}.wav
  const switchDir = path.join(soundsDir, switchId);
  const hasStructuredDir = await exists(switchDir);

  if (hasStructuredDir) {
    const files: Record<string, string | null> = {};
    for (const keyType of keyTypes) {
      const filePath = path.join(switchDir, `${keyType}.wav`);
      files[keyType] = (await exists(filePath)) ? `/sounds/${switchId}/${keyType}.wav` : null;
    }

    return NextResponse.json({
      switchId,
      structure: 'directory',
      files,
    });
  }

  // 레거시 경로 확인: /sounds/{switchId}.wav
  const legacyPath = path.join(soundsDir, `${switchId}.wav`);
  const hasLegacyFile = await exists(legacyPath);

  return NextResponse.json({
    switchId,
    structure: hasLegacyFile ? 'flat' : 'none',
    files: hasLegacyFile
      ? { default: `/sounds/${switchId}.wav` }
      : {},
  });
}

async function getAllSounds(soundsDir: string) {
  const dirExists = await exists(soundsDir);
  if (!dirExists) {
    return NextResponse.json({ sounds: [], total: 0 });
  }

  const entries = await fs.readdir(soundsDir, { withFileTypes: true });
  const sounds: Array<{ id: string; type: 'file' | 'directory'; path: string }> = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      sounds.push({
        id: entry.name,
        type: 'directory',
        path: `/sounds/${entry.name}/`,
      });
    } else if (entry.name.endsWith('.wav')) {
      sounds.push({
        id: entry.name.replace('.wav', ''),
        type: 'file',
        path: `/sounds/${entry.name}`,
      });
    }
  }

  return NextResponse.json({ sounds, total: sounds.length });
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
