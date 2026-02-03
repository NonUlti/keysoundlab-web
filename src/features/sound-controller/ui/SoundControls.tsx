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
    <div className="sound-controls">
      <div className="volume-control">
        <label htmlFor="volume">{t('volume.label')}</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={localVolume}
          onChange={handleVolumeChange}
        />
        <span className="volume-value">{Math.round(localVolume * 100)}%</span>
      </div>

      {onMute && (
        <button onClick={onMute} className="mute-button">
          {isMuted ? t('volume.unmute') : t('volume.mute')}
        </button>
      )}
    </div>
  );
}
