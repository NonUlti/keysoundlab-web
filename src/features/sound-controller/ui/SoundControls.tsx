'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';

interface SoundControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onMute?: () => void;
  isMuted?: boolean;
}

/**
 * 볼륨 및 사운드 설정 UI
 */
export function SoundControls({
  volume,
  onVolumeChange,
  onMute,
  isMuted,
}: SoundControlsProps) {
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const [localVolume, setLocalVolume] = useState(volume);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <label htmlFor="volume">{t('volume.label')}</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={localVolume}
          onChange={handleVolumeChange}
          className="w-[150px]"
        />
        <span className="min-w-12 text-right">{Math.round(localVolume * 100)}%</span>
      </div>

      {onMute && (
        <button
          onClick={onMute}
          className="py-2 px-4 bg-accent text-white border-none rounded cursor-pointer transition-opacity hover:opacity-80"
        >
          {isMuted ? t('volume.unmute') : t('volume.mute')}
        </button>
      )}
    </div>
  );
}
