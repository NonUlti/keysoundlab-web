'use client';

import { useState, useEffect, useCallback } from 'react';
import { AudioEngine } from '@/core/audio/engine/AudioEngine';
import { createSoundPlayer } from '@/core/audio/player/SoundPlayer';
import { createVoicePool, type VoicePool } from '@/core/audio/player/VoicePool';
import { createVolumeNode, type VolumeNode } from '@/core/audio/effects/VolumeNode';
import { createCompressorNode } from '@/core/audio/effects/CompressorNode';
import type { ISoundPlayer } from '@/core/audio/player/types';
import { createLogger } from '@/shared/utils/logger';

const logger = createLogger('SoundEngine');

/**
 * 오디오 엔진 통합 훅
 * core 오디오 시스템과 React 컴포넌트 연결
 */
export function useSoundEngine() {
  const [engine, setEngine] = useState<AudioEngine | null>(null);
  const [player, setPlayer] = useState<ISoundPlayer | null>(null);
  const [volumeNode, setVolumeNode] = useState<VolumeNode | null>(null);
  const [voicePool, setVoicePool] = useState<VoicePool | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 엔진 초기화
  useEffect(() => {
    const audioEngine = AudioEngine.getInstance();
    const context = audioEngine.getContext();

    const volume = createVolumeNode(context, 0.8);

    // CompressorNode 생성 (키보드 타이핑 시 다이나믹 레인지 압축)
    const compressor = createCompressorNode(context, {
      threshold: -24,
      knee: 30,
      ratio: 12,
      attack: 0.003,
      release: 0.25,
    });

    // AnalyserNode 생성 (파형 시각화용)
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    // 오디오 그래프: SourceNode → VolumeNode → CompressorNode → AnalyserNode → destination
    volume.getNode().connect(compressor.getNode());
    compressor.getNode().connect(analyser);
    analyser.connect(context.destination);

    const pool = createVoicePool(32);
    const soundPlayer = createSoundPlayer(context, volume.getNode());

    setEngine(audioEngine);
    setVolumeNode(volume);
    setVoicePool(pool);
    setPlayer(soundPlayer);
    setAnalyserNode(analyser);

    // AudioContext 상태 확인
    setIsReady(context.state === 'running');

    // AudioContext 상태 변화 감지
    const handleStateChange = () => {
      const state = context.state;
      logger.info(`AudioContext state changed to: ${state}`);
      setIsReady(state === 'running');
    };

    context.addEventListener('statechange', handleStateChange);

    return () => {
      context.removeEventListener('statechange', handleStateChange);
      soundPlayer.stopAll();
    };
  }, []);

  // 사운드 재생
  const playSound = useCallback(
    (buffer: AudioBuffer) => {
      if (!player) {
        logger.warn('Player not ready');
        return;
      }
      if (!voicePool) {
        logger.warn('VoicePool not ready');
        return;
      }

      try {
        const sound = player.play(buffer);
        voicePool.addVoice(sound);
      } catch (error) {
        logger.error('Failed to play sound:', error);
      }
    },
    [player, voicePool]
  );

  // 볼륨 조절
  const setVolume = useCallback(
    (volume: number) => {
      if (!volumeNode) return;
      volumeNode.setVolume(volume);
    },
    [volumeNode]
  );

  // 오디오 컨텍스트 재개 (사용자 제스처 후)
  const resume = useCallback(async () => {
    if (!engine) {
      logger.warn('Engine not ready');
      return;
    }

    try {
      await engine.resume();
      const state = engine.getState();
      logger.info(`AudioContext resumed, state: ${state}`);
      setIsReady(state === 'running');
    } catch (error) {
      logger.error('Failed to resume:', error);
    }
  }, [engine]);

  return {
    isReady,
    playSound,
    setVolume,
    resume,
    engine,
    player,
    analyserNode,
  };
}
