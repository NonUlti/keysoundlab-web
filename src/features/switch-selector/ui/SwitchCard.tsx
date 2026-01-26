'use client';

import type { Switch } from '@/domain/switch/types';

interface SwitchCardProps {
  switch: Switch;
  selected?: boolean;
  onSelect: (switchItem: Switch) => void;
}

/**
 * 개별 스위치 카드 컴포넌트
 */
export function SwitchCard({ switch: switchItem, selected, onSelect }: SwitchCardProps) {
  return (
    <div
      className={`switch-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(switchItem)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(switchItem);
        }
      }}
    >
      {switchItem.imageUrl && (
        <img
          src={switchItem.imageUrl}
          alt={switchItem.name}
          className="switch-image"
        />
      )}
      <div className="switch-info">
        <h3>{switchItem.name}</h3>
        <p className="manufacturer">{switchItem.manufacturer}</p>
        <div className="specs">
          <span className="type">{switchItem.type}</span>
          <span className="force">{switchItem.actuationForce}g</span>
        </div>
      </div>
    </div>
  );
}
