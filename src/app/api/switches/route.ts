import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Switch, SwitchType } from '@/domain/switch/types';

/**
 * 스위치 데이터를 서버에서 읽어와 필터링/정렬 후 반환
 * GET /api/switches?type=linear&manufacturer=Cherry&q=red&sort=name&order=asc
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // 쿼리 파라미터 파싱
    const typeFilter = searchParams.get('type') as SwitchType | null;
    const manufacturerFilter = searchParams.get('manufacturer');
    const searchQuery = searchParams.get('q');
    const sortBy = searchParams.get('sort') ?? 'name';
    const order = searchParams.get('order') ?? 'asc';

    // switches.json 읽기
    const filePath = path.join(process.cwd(), 'public', 'data', 'switches.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let switches: Switch[] = JSON.parse(fileContent);

    // 필터링
    if (typeFilter) {
      switches = switches.filter(sw => sw.type === typeFilter);
    }

    if (manufacturerFilter) {
      switches = switches.filter(sw => sw.manufacturer === manufacturerFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      switches = switches.filter(sw =>
        sw.name.toLowerCase().includes(query) ||
        sw.manufacturer.toLowerCase().includes(query) ||
        (sw.description?.toLowerCase().includes(query) ?? false)
      );
    }

    // 정렬
    switches.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'manufacturer':
          comparison = a.manufacturer.localeCompare(b.manufacturer);
          break;
        case 'actuationForce':
          comparison = a.actuationForce - b.actuationForce;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }

      return order === 'desc' ? -comparison : comparison;
    });

    // 제조사 목록 추출 (필터 UI용)
    const allSwitchesRaw = JSON.parse(fileContent) as Switch[];
    const manufacturers = [...new Set(allSwitchesRaw.map(sw => sw.manufacturer))].sort();

    return NextResponse.json({
      switches,
      total: switches.length,
      manufacturers,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to load switches', message },
      { status: 500 }
    );
  }
}
