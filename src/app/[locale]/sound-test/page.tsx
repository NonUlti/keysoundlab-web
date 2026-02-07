'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/shared/ui';
import { SwitchSelector, useSwitchSelection } from '@/features/switch-selector';
import { KeyboardDisplay, useKeyboardVisualization } from '@/features/keyboard-display';
import { SoundControls, useSoundEngine, useSoundPreload } from '@/features/sound-controller';
import { useKeyboardInput } from '@/features/workspace/hooks/useKeyboardInput';
import { SwitchRepository } from '@/domain/switch/repository/SwitchRepository';
import { LocalSwitchAdapter } from '@/domain/switch/repository/adapters/LocalSwitchAdapter';
import { appConfig } from '@/config/app.config';
import { createLogger } from '@/shared/utils/logger';
import { NAMESPACES } from '@/i18n/constants';

const logger = createLogger('SoundTestPage');

/**
 * 사운드 테스트 페이지
 */
export default function SoundTestPage() {
  const t = useTranslations(NAMESPACES.SOUND_TEST);

  // 스위치 리포지토리 초기화
  const [repository] = useState(
    () => new SwitchRepository(new LocalSwitchAdapter(appConfig.dataSource.switchesUrl))
  );

  // 스위치 선택 상태
  const { selectedSwitch, selectSwitch: originalSelectSwitch } = useSwitchSelection();

  // 오디오 엔진
  const { isReady, playSound, setVolume, resume, engine } = useSoundEngine();

  // 스위치 선택 시 오디오 컨텍스트 자동 재개
  const selectSwitch = useCallback(async (sw: Parameters<typeof originalSelectSwitch>[0]) => {
    originalSelectSwitch(sw);
    if (!isReady && engine) {
      logger.info('Auto-resuming audio on switch selection');
      await resume();
    }
  }, [originalSelectSwitch, isReady, engine, resume]);

  // 키보드 시각화
  const {
    pressedKeys,
    handleKeyPress,
    handleKeyRelease,
  } = useKeyboardVisualization();

  // 사운드 프리로드 (선택된 스위치만)
  const switchesToLoad = useMemo(() => {
    return selectedSwitch ? [selectedSwitch] : [];
  }, [selectedSwitch]);

  const { loading: soundLoading, error: soundError, cache } = useSoundPreload(
    engine?.getContext() ?? null,
    switchesToLoad
  );

  // 키보드 입력 처리 콜백
  const handleKeyPressCallback = useCallback(async (keyCode: string, soundId: string | null) => {
    handleKeyPress(keyCode);

    // 오디오 엔진 준비 상태 확인 및 자동 재개 시도
    if (!isReady && engine) {
      logger.info('Audio engine not ready, attempting to resume...');
      try {
        await resume();
      } catch (error) {
        logger.error('Failed to resume audio:', error);
        return;
      }
    }

    // 선택된 스위치 확인
    if (!selectedSwitch) {
      logger.debug('No switch selected');
      return;
    }

    // 사운드 재생
    if (soundId && cache) {
      const buffer = cache.get(soundId);
      if (buffer) {
        logger.debug(`Playing sound: ${soundId} for key: ${keyCode}`);
        try {
          playSound(buffer);
        } catch (error) {
          logger.error('Failed to play sound:', error);
        }
      } else {
        logger.warn(`Sound buffer not found for: ${soundId}`);
      }
    } else if (!soundId) {
      logger.debug(`No sound ID for key: ${keyCode}`);
    } else if (!cache) {
      logger.warn('Sound cache not ready');
    }
  }, [handleKeyPress, cache, playSound, isReady, engine, resume, selectedSwitch]);

  const handleKeyReleaseCallback = useCallback((keyCode: string) => {
    handleKeyRelease(keyCode);
  }, [handleKeyRelease]);

  useKeyboardInput({
    currentSwitch: selectedSwitch ?? null,
    onKeyPress: handleKeyPressCallback,
    onKeyRelease: handleKeyReleaseCallback,
  });

  // 오디오 컨텍스트 재개 (사용자 제스처 필요)
  const handleInitAudio = async () => {
    await resume();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        rightContent={
          <SoundControls
            volume={0.8}
            onVolumeChange={setVolume}
          />
        }
      />

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-60 bg-secondary border-r border-border overflow-y-auto p-3 shrink-0">
          <SwitchSelector
            repository={repository}
            selectedSwitch={selectedSwitch}
            onSelectSwitch={selectSwitch}
          />
        </aside>

        <main className="flex-1 py-6 px-8 overflow-y-auto flex flex-col">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {!isReady && (
              <button
                onClick={handleInitAudio}
                className="py-2 px-4 text-sm bg-accent text-white border-none rounded cursor-pointer transition-opacity hover:opacity-80"
              >
                {t('audio.start')}
              </button>
            )}

            {selectedSwitch && (
              <div className="flex items-center gap-2 py-2 px-4 bg-secondary rounded-md border border-border">
                <span className="text-xs text-text-secondary">{t('status.selected')}</span>
                <span className="text-sm font-semibold text-accent">{selectedSwitch.name}</span>
                {soundLoading && <span className="text-xs text-text-secondary animate-[pulse_1.5s_infinite]">{t('status.loading')}</span>}
              </div>
            )}

            {soundError && (
              <div className="py-2 px-4 bg-[rgba(var(--error-rgb),0.1)] border border-[rgb(var(--error-rgb))] rounded-md text-[rgb(var(--error-rgb))] text-[13px]">
                {t('status.soundError')} {soundError.message}
              </div>
            )}
          </div>

          {!selectedSwitch && !soundLoading && !soundError && (
            <div className="flex items-center justify-center p-8 text-text-secondary text-sm bg-secondary rounded-lg border border-dashed border-border mb-4">
              {t('status.selectSwitch')}
            </div>
          )}

          <KeyboardDisplay pressedKeys={pressedKeys} />
        </main>
      </div>
    </div>
  );
}
