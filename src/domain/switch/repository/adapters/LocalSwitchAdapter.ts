import type { Switch } from '../../types';
import type { ISwitchAdapter } from '../SwitchRepository';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('LocalSwitchAdapter');

/**
 * 로컬 JSON 파일 기반 스위치 어댑터
 */
export class LocalSwitchAdapter implements ISwitchAdapter {
  private dataUrl: string;

  constructor(dataUrl: string = '/data/switches.json') {
    this.dataUrl = dataUrl;
  }

  /**
   * 모든 스위치 데이터 가져오기
   */
  public async fetchAll(): Promise<Switch[]> {
    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch switches: ${response.statusText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      logger.error('Failed to load switches from local file:', error);
      throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
  }

  /**
   * ID로 특정 스위치 가져오기
   */
  public async fetchById(id: string): Promise<Switch | null> {
    const all = await this.fetchAll();
    return all.find(sw => sw.id === id) ?? null;
  }
}
