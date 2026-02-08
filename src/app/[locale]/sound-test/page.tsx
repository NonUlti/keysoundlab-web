'use client';

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/shared/ui';
import { SwitchSelector, useSwitchSelection } from '@/features/switch-selector';
import { KeyboardDisplay, useKeyboardVisualization } from '@/features/keyboard-display';
import { SoundControls, WaveformVisualizer, useSoundEngine, useSoundPreload } from '@/features/sound-controller';
import { useKeyboardInput } from '@/features/workspace/hooks/useKeyboardInput';
import { OnboardingGuide } from '@/features/workspace/ui/OnboardingGuide';
import { SwitchRepository } from '@/domain/switch/repository/SwitchRepository';
import { LocalSwitchAdapter } from '@/domain/switch/repository/adapters/LocalSwitchAdapter';
import { appConfig } from '@/config/app.config';
import { createKeyboardMapper } from '@/domain';
import type { KeyboardOS } from '@/domain/keyboard';
import { createLogger } from '@/shared/utils/logger';
import { NAMESPACES } from '@/i18n/constants';

const logger = createLogger('SoundTestPage');

/**
 * 사운드 테스트 페이지
 */
export default function SoundTestPage() {
  const t = useTranslations(NAMESPACES.SOUND_TEST);

  // 모바일 사이드바 상태
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 키보드 OS 상태 (키 레이블 표시용)
  const [keyboardOS, setKeyboardOS] = useState<KeyboardOS>('windows');
  useEffect(() => {
    const saved = localStorage.getItem('keyboard-os');
    if (saved === 'windows' || saved === 'mac') {
      setKeyboardOS(saved);
    } else if (/Mac|iPhone|iPad/.test(navigator.platform)) {
      setKeyboardOS('mac');
    }
  }, []);
  const handleKeyboardOSChange = useCallback((os: KeyboardOS) => {
    setKeyboardOS(os);
    localStorage.setItem('keyboard-os', os);
  }, []);

  // 스위치 리포지토리 초기화
  const [repository] = useState(
    () => new SwitchRepository(new LocalSwitchAdapter(appConfig.dataSource.switchesUrl))
  );

  // 스위치 선택 상태
  const { selectedSwitch, selectSwitch: originalSelectSwitch } = useSwitchSelection();

  // 오디오 엔진
  const { isReady, playSound, setVolume, resume, engine, analyserNode } = useSoundEngine();

  // 스위치 선택 시 오디오 컨텍스트 자동 재개
  const selectSwitch = useCallback(async (sw: Parameters<typeof originalSelectSwitch>[0]) => {
    originalSelectSwitch(sw);
    setSidebarOpen(false);
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

  // 마우스 클릭용 키보드 매퍼
  const mouseMapperRef = useRef(createKeyboardMapper());

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

  // 마우스 매퍼에 선택된 스위치 동기화
  useEffect(() => {
    mouseMapperRef.current.setCurrentSwitch(selectedSwitch ?? null);
  }, [selectedSwitch]);

  // 마우스 클릭 이벤트 핸들러
  const handleKeyMouseDown = useCallback((code: string) => {
    const soundId = mouseMapperRef.current.mapKeyToSound(code);
    handleKeyPressCallback(code, soundId);
  }, [handleKeyPressCallback]);

  const handleKeyMouseUp = useCallback((code: string) => {
    handleKeyReleaseCallback(code);
  }, [handleKeyReleaseCallback]);

  useKeyboardInput({
    currentSwitch: selectedSwitch ?? null,
    onKeyPress: handleKeyPressCallback,
    onKeyRelease: handleKeyReleaseCallback,
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* 온보딩 가이드 (최초 방문 시) */}
      <OnboardingGuide onComplete={() => {}} />

      <Header />

      {/* 모바일: 스위치 선택 버튼 (lg 이하에서 표시) */}
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 py-2 px-3 text-sm font-medium bg-primary border border-border rounded-lg hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" />
            <path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" />
          </svg>
          {sidebarOpen ? t('mobileSwitch.close') : t('mobileSwitch.open')}
        </button>
        {selectedSwitch && (
          <span className="text-sm text-accent font-semibold truncate">{selectedSwitch.name}</span>
        )}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* 사이드바: 데스크톱에서 항상 표시, 모바일에서 토글 */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-secondary border-b lg:border-b-0 lg:border-r border-border overflow-y-auto p-3 shrink-0 max-h-[50vh] lg:max-h-none`}>
          <SwitchSelector
            repository={repository}
            selectedSwitch={selectedSwitch}
            onSelectSwitch={selectSwitch}
          />
        </aside>

        <main className="flex-1 py-4 px-4 md:py-6 md:px-8 overflow-y-auto flex flex-col">
          <div className="overflow-x-auto">
            <div className="w-fit mx-auto">
              <div className="flex items-center gap-3 md:gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-2 py-2 px-3 md:px-4 bg-secondary rounded-md border border-border">
                  {selectedSwitch ? (
                    <>
                      <span className="text-xs text-text-secondary">{t('status.selected')}</span>
                      <span className="text-sm font-semibold text-accent">{selectedSwitch.name}</span>
                      {soundLoading && <span className="text-xs text-text-secondary animate-[pulse_1.5s_infinite]">{t('status.loading')}</span>}
                    </>
                  ) : (
                    <span className="text-sm text-text-secondary">{t('status.selectSwitch')}</span>
                  )}
                </div>

                <div className="flex gap-2 items-center" role="group" aria-label={t('keyboard.os')}>
                  <button
                    type="button"
                    onClick={() => handleKeyboardOSChange('windows')}
                    className={`text-sm p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${keyboardOS === 'windows' ? 'font-bold text-accent' : 'font-normal text-text-secondary hover:text-text-primary'}`}
                    aria-current={keyboardOS === 'windows' ? 'true' : undefined}
                  >
                    {t('keyboard.windows')}
                  </button>
                  <span className="text-border" aria-hidden="true">|</span>
                  <button
                    type="button"
                    onClick={() => handleKeyboardOSChange('mac')}
                    className={`text-sm p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${keyboardOS === 'mac' ? 'font-bold text-accent' : 'font-normal text-text-secondary hover:text-text-primary'}`}
                    aria-current={keyboardOS === 'mac' ? 'true' : undefined}
                  >
                    {t('keyboard.mac')}
                  </button>
                </div>

                <div className="ml-auto">
                  <SoundControls
                    volume={0.8}
                    onVolumeChange={setVolume}
                  />
                </div>

                {soundError && (
                  <div className="py-2 px-3 md:px-4 bg-[rgba(var(--error-rgb),0.1)] border border-[rgb(var(--error-rgb))] rounded-md text-[rgb(var(--error-rgb))] text-sm">
                    {t('status.soundError')} {soundError.message}
                  </div>
                )}
              </div>

              <KeyboardDisplay pressedKeys={pressedKeys} onKeyMouseDown={handleKeyMouseDown} onKeyMouseUp={handleKeyMouseUp} os={keyboardOS} />

              {/* 파형 시각화 */}
              {isReady && selectedSwitch && (
                <div className="mt-4">
                  <WaveformVisualizer analyserNode={analyserNode} isActive={isReady} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
