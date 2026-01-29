'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Header } from '@/shared/ui';
import { NAMESPACES } from '@/i18n/constants';

/**
 * 메인 랜딩 페이지
 */
export default function HomePage() {
  const t = useTranslations(NAMESPACES.HOME);
  const tCommon = useTranslations(NAMESPACES.COMMON);

  return (
    <div className="landing-page">
      <Header />

      <main className="landing-main">
        <section className="hero-section">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <Link href="/sound-test" className="cta-button">
            {t('hero.cta')}
          </Link>
        </section>

        <section className="features-section">
          <h2 className="section-title">{t('features.title')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎹</div>
              <h3>{t('features.realtime.title')}</h3>
              <p>{t('features.realtime.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎚️</div>
              <h3>{t('features.switches.title')}</h3>
              <p>{t('features.switches.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⌨️</div>
              <h3>{t('features.visual.title')}</h3>
              <p>{t('features.visual.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>{t('features.keyTypes.title')}</h3>
              <p>{t('features.keyTypes.description')}</p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-title">{t('howItWorks.title')}</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>{t('howItWorks.step1.title')}</h3>
                <p>{t('howItWorks.step1.description')}</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>{t('howItWorks.step2.title')}</h3>
                <p>{t('howItWorks.step2.description')}</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>{t('howItWorks.step3.title')}</h3>
                <p>{t('howItWorks.step3.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>{tCommon('footer.copyright')}</p>
      </footer>
    </div>
  );
}
