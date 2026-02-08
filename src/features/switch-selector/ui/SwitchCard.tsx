'use client';

import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';
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
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const typeLabel = t(`switchType.${switchItem.type}`);

  return (
    <button
      type="button"
      className={`w-full text-left py-2.5 px-3 bg-primary border rounded-lg cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
        selected
          ? 'border-accent bg-[rgba(var(--accent-rgb),0.1)] shadow-sm'
          : 'border-border hover:border-accent hover:bg-[rgba(var(--accent-rgb),0.05)]'
      }`}
      onClick={() => onSelect(switchItem)}
      aria-pressed={selected}
      aria-label={`${switchItem.name} - ${switchItem.manufacturer}, ${typeLabel}, ${switchItem.actuationForce}g`}
    >
      {switchItem.imageUrl && (
        <img
          src={switchItem.imageUrl}
          alt=""
          className="w-full h-auto max-h-20 object-contain rounded mb-2"
          loading="lazy"
        />
      )}
      <div>
        <span className="block text-sm font-semibold mb-0.5">{switchItem.name}</span>
        <span className="block text-xs text-text-secondary mb-1">{switchItem.manufacturer}</span>
        <span className="flex gap-1.5 text-xs">
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary">{typeLabel}</span>
          <span className="py-0.5 px-1.5 bg-secondary rounded text-text-secondary">{switchItem.actuationForce}g</span>
        </span>
      </div>
    </button>
  );
}
