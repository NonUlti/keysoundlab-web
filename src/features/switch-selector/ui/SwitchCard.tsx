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
      className={`py-2.5 px-3 bg-primary border rounded-md cursor-pointer transition-all ${
        selected
          ? 'border-accent bg-[rgba(var(--accent-rgb),0.1)]'
          : 'border-border hover:border-accent hover:bg-[rgba(var(--accent-rgb),0.05)]'
      }`}
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
        />
      )}
      <div>
        <h3 className="text-sm font-semibold mb-0.5">{switchItem.name}</h3>
        <p className="text-[11px] text-text-secondary mb-1">{switchItem.manufacturer}</p>
        <div className="flex gap-1.5 text-[10px]">
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary capitalize">{switchItem.type}</span>
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary">{switchItem.actuationForce}g</span>
        </div>
      </div>
    </div>
  );
}
