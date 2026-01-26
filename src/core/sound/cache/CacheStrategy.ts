/**
 * LRU 캐시 전략 인터페이스
 */
export interface CacheStrategy<K, V> {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  remove: (key: K) => boolean;
  clear: () => void;
  size: () => number;
}

/**
 * LRU (Least Recently Used) 캐시 전략 생성
 */
export const createLRUCacheStrategy = <K, V>(
  maxSize: number = 50
): CacheStrategy<K, V> => {
  const cache = new Map<K, V>();
  const accessOrder: K[] = [];

  const updateAccessOrder = (key: K): void => {
    const index = accessOrder.indexOf(key);
    if (index !== -1) {
      accessOrder.splice(index, 1);
      accessOrder.push(key);
    }
  };

  return {
    set(key, value) {
      // 이미 존재하면 제거
      if (cache.has(key)) {
        this.remove(key);
      }

      // 최대 크기 초과 시 가장 오래된 항목 제거
      if (cache.size >= maxSize) {
        const oldestKey = accessOrder.shift();
        if (oldestKey !== undefined) {
          cache.delete(oldestKey);
        }
      }

      cache.set(key, value);
      accessOrder.push(key);
    },

    get(key) {
      const value = cache.get(key);
      if (value !== undefined) {
        updateAccessOrder(key);
      }
      return value;
    },

    has(key) {
      return cache.has(key);
    },

    remove(key) {
      const deleted = cache.delete(key);
      if (deleted) {
        const index = accessOrder.indexOf(key);
        if (index !== -1) {
          accessOrder.splice(index, 1);
        }
      }
      return deleted;
    },

    clear() {
      cache.clear();
      accessOrder.length = 0;
    },

    size() {
      return cache.size;
    },
  };
};

// 기존 클래스 형태도 유지 (하위 호환성)
export class LRUCacheStrategy<K, V> implements CacheStrategy<K, V> {
  private strategy: CacheStrategy<K, V>;

  constructor(maxSize: number = 50) {
    this.strategy = createLRUCacheStrategy<K, V>(maxSize);
  }

  set(key: K, value: V): void {
    this.strategy.set(key, value);
  }

  get(key: K): V | undefined {
    return this.strategy.get(key);
  }

  has(key: K): boolean {
    return this.strategy.has(key);
  }

  remove(key: K): boolean {
    return this.strategy.remove(key);
  }

  clear(): void {
    this.strategy.clear();
  }

  size(): number {
    return this.strategy.size();
  }
}
