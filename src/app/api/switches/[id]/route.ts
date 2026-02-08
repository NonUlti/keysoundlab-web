import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Switch } from '@/domain/switch/types';

/**
 * 단일 스위치 데이터 조회
 * GET /api/switches/:id
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), 'public', 'data', 'switches.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const switches: Switch[] = JSON.parse(fileContent);

    const sw = switches.find(s => s.id === id);

    if (!sw) {
      return NextResponse.json(
        { error: 'Switch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ switch: sw });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to load switch', message },
      { status: 500 }
    );
  }
}
