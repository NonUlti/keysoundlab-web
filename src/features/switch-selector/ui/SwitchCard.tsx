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
    <button
      type="button"
      className={`w-full text-left py-2.5 px-3 bg-primary border rounded-md cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        selected
          ? 'border-accent bg-[rgba(var(--accent-rgb),0.1)]'
          : 'border-border hover:border-accent hover:bg-[rgba(var(--accent-rgb),0.05)]'
      }`}
      onClick={() => onSelect(switchItem)}
      aria-pressed={selected}
    >
      {switchItem.imageUrl && (
        <img
          src={switchItem.imageUrl}
          alt={switchItem.name}
          className="w-full h-auto max-h-20 object-contain rounded mb-2"
        />
      )}
      <div>
        <span className="block text-sm font-semibold mb-0.5">{switchItem.name}</span>
        <span className="block text-xs text-text-secondary mb-1">{switchItem.manufacturer}</span>
        <span className="flex gap-1.5 text-xs">
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary capitalize">{switchItem.type}</span>
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary">{switchItem.actuationForce}g</span>
        </span>
      </div>
    </button>
  );
}
