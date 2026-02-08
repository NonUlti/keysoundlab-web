'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { NAMESPACES } from '@/i18n/constants';

const STORAGE_KEY = 'keysoundlab-onboarding-seen';

interface OnboardingGuideProps {
  onComplete: () => void;
}

/**
 * 사운드 테스트 페이지 온보딩 가이드
 * 최초 방문 시 3단계 가이드 오버레이를 표시
 */
export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const t = useTranslations(NAMESPACES.SOUND_TEST);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setVisible(true);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  }, [step]);

  const handlePrev = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handleFinish = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    onComplete();
  }, [onComplete]);

  if (!visible) return null;

  const steps = [
    {
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" />
          <path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" />
        </svg>
      ),
      highlight: 'sidebar',
    },
    {
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ),
      highlight: 'audio',
    },
    {
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="M6 8h.001" /><path d="M10 8h.001" /><path d="M14 8h.001" />
          <path d="M18 8h.001" /><path d="M8 12h.001" /><path d="M12 12h.001" />
          <path d="M16 12h.001" /><path d="M7 16h10" />
        </svg>
      ),
      highlight: 'keyboard',
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleFinish} />

      {/* Guide card */}
      <div className="relative z-10 w-[90vw] max-w-md mx-4 bg-primary border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Step indicator */}
        <div className="flex gap-1.5 px-6 pt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-[rgba(var(--accent-rgb),0.1)] text-accent">
            {currentStep.icon}
          </div>
          <h2 className="text-xl font-bold mb-2 text-text-primary">{currentStep.title}</h2>
          <p className="text-sm text-text-secondary leading-relaxed">{currentStep.description}</p>
        </div>

        {/* Step count */}
        <div className="text-center pb-2">
          <span className="text-xs text-text-secondary">
            {t('onboarding.stepOf', { current: step + 1, total: steps.length })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            type="button"
            onClick={handleFinish}
            className="py-2 px-4 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t('onboarding.skip')}
          </button>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="py-2.5 px-5 text-sm font-medium border border-border rounded-lg text-text-primary hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {t('onboarding.prev')}
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="py-2.5 px-5 text-sm font-medium bg-accent-gradient text-white rounded-lg hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {step < 2 ? t('onboarding.next') : t('onboarding.finish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
