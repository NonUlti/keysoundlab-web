import type { Switch } from '../../types';
import type { ISwitchAdapter } from '../SwitchRepository';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('RemoteSwitchAdapter');

/**
 * 원격 API 기반 스위치 어댑터
 * 향후 백엔드 통합 시 사용
 */
export class RemoteSwitchAdapter implements ISwitchAdapter {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * 모든 스위치 데이터 가져오기
   */
  public async fetchAll(): Promise<Switch[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/switches`);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.switches ?? [];
    } catch (error) {
      logger.error('Failed to fetch switches from API:', error);
      throw error;
    }
  }

  /**
   * ID로 특정 스위치 가져오기
   */
  public async fetchById(id: string): Promise<Switch | null> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/switches/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.switch ?? null;
    } catch (error) {
      logger.error(`Failed to fetch switch ${id} from API:`, error);
      throw error;
    }
  }
}
