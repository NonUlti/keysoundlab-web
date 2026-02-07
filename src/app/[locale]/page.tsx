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

      <main className="flex-1 p-8">
        <section className="text-center py-16 px-8 max-w-[800px] mx-auto">
          <h1 className="text-[56px] font-extrabold mb-4 hero-gradient-text">{t('hero.title')}</h1>
          <p className="text-xl text-text-secondary mb-8">{t('hero.subtitle')}</p>
          <Link
            href="/sound-test"
            className="inline-block py-4 px-10 bg-accent-gradient text-white no-underline rounded-lg text-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(var(--accent-rgb),0.3)]"
          >
            {t('hero.cta')}
          </Link>
        </section>

        <section className="py-16 px-8 max-w-[1200px] mx-auto">
          <h2 className="text-[32px] font-bold text-center mb-8">{t('features.title')}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            <div className="p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-[40px] mb-4">🎹</div>
              <h3 className="text-xl mb-2">{t('features.realtime.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.realtime.description')}</p>
            </div>
            <div className="p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-[40px] mb-4">🎚️</div>
              <h3 className="text-xl mb-2">{t('features.switches.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.switches.description')}</p>
            </div>
            <div className="p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-[40px] mb-4">⌨️</div>
              <h3 className="text-xl mb-2">{t('features.visual.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.visual.description')}</p>
            </div>
            <div className="p-8 bg-secondary border border-border rounded-xl text-center transition-all hover:-translate-y-1 hover:border-accent">
              <div className="text-[40px] mb-4">🔊</div>
              <h3 className="text-xl mb-2">{t('features.keyTypes.title')}</h3>
              <p className="text-text-secondary text-sm">{t('features.keyTypes.description')}</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-8 max-w-[800px] mx-auto">
          <h2 className="text-[32px] font-bold text-center mb-8">{t('howItWorks.title')}</h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center text-xl font-bold shrink-0 text-white">1</div>
              <div>
                <h3 className="text-lg mb-1">{t('howItWorks.step1.title')}</h3>
                <p className="text-text-secondary text-sm">{t('howItWorks.step1.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center text-xl font-bold shrink-0 text-white">2</div>
              <div>
                <h3 className="text-lg mb-1">{t('howItWorks.step2.title')}</h3>
                <p className="text-text-secondary text-sm">{t('howItWorks.step2.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent-gradient rounded-full flex items-center justify-center text-xl font-bold shrink-0 text-white">3</div>
              <div>
                <h3 className="text-lg mb-1">{t('howItWorks.step3.title')}</h3>
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
