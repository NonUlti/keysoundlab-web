'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Header } from '@/shared/ui';
import { SwitchSelector, useSwitchSelection } from '@/features/switch-selector';
import { KeyboardDisplay, useKeyboardVisualization } from '@/features/keyboard-display';
import { SoundControls, useSoundEngine, useSoundPreload } from '@/features/sound-controller';
import { useKeyboardInput } from '@/features/workspace/hooks/useKeyboardInput';
import { SwitchRepository } from '@/domain/switch/repository/SwitchRepository';
import { LocalSwitchAdapter } from '@/domain/switch/repository/adapters/LocalSwitchAdapter';
import { appConfig } from '@/config/app.config';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundTestPage');

/**
 * 사운드 테스트 페이지
 */
export default function SoundTestPage() {
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
    <div className="sound-test-page">
      <Header
        rightContent={
          <SoundControls
            volume={0.8}
            onVolumeChange={setVolume}
          />
        }
      />

      <div className="sound-test-content">
        <aside className="sound-test-sidebar">
          <SwitchSelector
            repository={repository}
            selectedSwitch={selectedSwitch}
            onSelectSwitch={selectSwitch}
          />
        </aside>

        <main className="sound-test-main">
          <div className="sound-test-status">
            {!isReady && (
              <button onClick={handleInitAudio} className="init-audio-btn">
                오디오 시작
              </button>
            )}

            {selectedSwitch && (
              <div className="current-switch">
                <span className="current-switch-label">선택됨:</span>
                <span className="current-switch-name">{selectedSwitch.name}</span>
                {soundLoading && <span className="loading-indicator">로딩중...</span>}
              </div>
            )}

            {soundError && (
              <div className="error-message">
                사운드 로딩 실패: {soundError.message}
              </div>
            )}
          </div>

          {!selectedSwitch && !soundLoading && !soundError && (
            <div className="empty-state">
              왼쪽에서 스위치를 선택하세요
            </div>
          )}

          <KeyboardDisplay pressedKeys={pressedKeys} />
        </main>
      </div>
    </div>
  );
}
