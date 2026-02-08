'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';

interface SoundControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

/**
 * 볼륨 및 사운드 설정 UI
 */
export function SoundControls({
  volume,
  onVolumeChange,
}: SoundControlsProps) {
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const [localVolume, setLocalVolume] = useState(volume);
  const previousVolumeRef = useRef(volume);
  const isMuted = localVolume === 0;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onVolumeChange(newVolume);
    if (newVolume > 0) {
      previousVolumeRef.current = newVolume;
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      const restored = previousVolumeRef.current;
      setLocalVolume(restored);
      onVolumeChange(restored);
    } else {
      previousVolumeRef.current = localVolume;
      setLocalVolume(0);
      onVolumeChange(0);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handleToggleMute}
        className="p-1.5 rounded bg-transparent border-none cursor-pointer transition-colors text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={isMuted ? t('volume.unmute') : t('volume.mute')}
        title={isMuted ? t('volume.unmute') : t('volume.mute')}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={localVolume}
        onChange={handleVolumeChange}
        className="w-20 md:w-[150px]"
        aria-label={t('volume.label')}
      />
      <span className="min-w-8 md:min-w-12 text-right text-sm text-text-secondary">
        {Math.round(localVolume * 100)}%
      </span>
    </div>
  );
}
