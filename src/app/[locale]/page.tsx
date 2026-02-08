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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 md:p-8">
        <section className="text-center py-8 px-4 md:py-16 md:px-8 max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold mb-4 hero-gradient-text">{t('hero.title')}</h1>
          <p className="text-base md:text-xl text-text-secondary mb-8">{t('hero.subtitle')}</p>
          <Link
            href="/sound-test"
            className="inline-block py-3 px-8 md:py-4 md:px-10 bg-accent-gradient text-white no-underline rounded-lg text-base md:text-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(var(--accent-rgb),0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('hero.cta')}
          </Link>
        </section>

        <section className="py-8 px-4 md:py-16 md:px-8 max-w-[1200px] mx-auto">
          <h2 className="text-2xl md:text-[32px] font-bold text-center mb-8">{t('features.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-6 md:p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-4xl mb-4">🎹</div>
              <h3 className="text-lg md:text-xl mb-2">{t('features.realtime.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.realtime.description')}</p>
            </div>
            <div className="p-6 md:p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-4xl mb-4">🎚️</div>
              <h3 className="text-lg md:text-xl mb-2">{t('features.switches.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.switches.description')}</p>
            </div>
            <div className="p-6 md:p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-4xl mb-4">⌨️</div>
              <h3 className="text-lg md:text-xl mb-2">{t('features.visual.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.visual.description')}</p>
            </div>
            <div className="p-6 md:p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-lg md:text-xl mb-2">{t('features.keyTypes.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.keyTypes.description')}</p>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 md:py-16 md:px-8 max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-[32px] font-bold text-center mb-8">{t('howItWorks.title')}</h2>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-secondary rounded-xl border border-border">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-gradient rounded-full flex items-center justify-center text-lg md:text-xl font-bold shrink-0 text-white">1</div>
              <div>
                <h3 className="text-base md:text-lg mb-1">{t('howItWorks.step1.title')}</h3>
                <p className="text-text-secondary text-sm">{t('howItWorks.step1.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-secondary rounded-xl border border-border">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-gradient rounded-full flex items-center justify-center text-lg md:text-xl font-bold shrink-0 text-white">2</div>
              <div>
                <h3 className="text-base md:text-lg mb-1">{t('howItWorks.step2.title')}</h3>
                <p className="text-text-secondary text-sm">{t('howItWorks.step2.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 md:gap-6 p-4 md:p-6 bg-secondary rounded-xl border border-border">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-gradient rounded-full flex items-center justify-center text-lg md:text-xl font-bold shrink-0 text-white">3</div>
              <div>
                <h3 className="text-base md:text-lg mb-1">{t('howItWorks.step3.title')}</h3>
                <p className="text-text-secondary text-sm">{t('howItWorks.step3.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 text-center text-text-secondary border-t border-border">
        <p>{tCommon('footer.copyright')}</p>
      </footer>
    </div>
  );
}
