'use client';

import { useState } from 'react';

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
  const [localVolume, setLocalVolume] = useState(volume);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div className="sound-controls">
      <div className="volume-control">
        <label htmlFor="volume">볼륨</label>
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
          {isMuted ? '음소거 해제' : '음소거'}
        </button>
      )}
    </div>
  );
}
