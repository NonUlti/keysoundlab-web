import type { Switch } from '../types';
import type { SwitchFilter } from '../types';

/**
 * 스위치 데이터 어댑터 인터페이스
 */
export interface ISwitchAdapter {
  fetchAll(): Promise<Switch[]>;
  fetchById(id: string): Promise<Switch | null>;
}

/**
 * 스위치 데이터 접근 계층
 * 데이터 소스를 추상화하여 비즈니스 로직과 분리
 */
export class SwitchRepository {
  private adapter: ISwitchAdapter;
  private cache: Map<string, Switch> = new Map();

  constructor(adapter: ISwitchAdapter) {
    this.adapter = adapter;
  }

  /**
   * 모든 스위치 조회
   */
  public async getAll(): Promise<Switch[]> {
    const switches = await this.adapter.fetchAll();

    // 캐시 업데이트
    switches.forEach(sw => this.cache.set(sw.id, sw));

    return switches;
  }

  /**
   * ID로 스위치 조회
   */
  public async getById(id: string): Promise<Switch | null> {
    // 캐시 먼저 확인
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    const sw = await this.adapter.fetchById(id);
    if (sw) {
      this.cache.set(id, sw);
    }

    return sw;
  }

  /**
   * 필터 조건으로 스위치 검색
   */
  public async findByFilter(filter: SwitchFilter): Promise<Switch[]> {
    const allSwitches = await this.getAll();

    return allSwitches.filter(sw => {
      // 타입 필터
      if (filter.type && sw.type !== filter.type) {
        return false;
      }

      // 제조사 필터
      if (filter.manufacturer && sw.manufacturer !== filter.manufacturer) {
        return false;
      }

      // 액추에이션 포스 범위 필터
      if (
        filter.minActuationForce !== undefined &&
        sw.actuationForce < filter.minActuationForce
      ) {
        return false;
      }

      if (
        filter.maxActuationForce !== undefined &&
        sw.actuationForce > filter.maxActuationForce
      ) {
        return false;
      }

      // 검색 쿼리 필터
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        const matchesName = sw.name.toLowerCase().includes(query);
        const matchesManufacturer = sw.manufacturer.toLowerCase().includes(query);
        const matchesDescription = sw.description?.toLowerCase().includes(query) ?? false;

        if (!matchesName && !matchesManufacturer && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * 제조사 목록 조회
   */
  public async getManufacturers(): Promise<string[]> {
    const switches = await this.getAll();
    const manufacturers = new Set(switches.map(sw => sw.manufacturer));
    return Array.from(manufacturers).sort();
  }

  /**
   * 캐시 초기화
   */
  public clearCache(): void {
    this.cache.clear();
  }
}
