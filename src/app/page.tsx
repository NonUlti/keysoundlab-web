'use client';

import Link from 'next/link';
import { Header } from '@/shared/ui';

/**
 * 메인 랜딩 페이지
 */
export default function HomePage() {
  return (
    <div className="landing-page">
      <Header />

      <main className="landing-main">
        <section className="hero-section">
          <h1 className="hero-title">KeySoundLab</h1>
          <p className="hero-subtitle">
            키보드 스위치 사운드를 실시간으로 테스트해보세요
          </p>
          <Link href="/sound-test" className="cta-button">
            사운드 테스트 시작
          </Link>
        </section>

        <section className="features-section">
          <h2 className="section-title">주요 기능</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎹</div>
              <h3>실시간 사운드</h3>
              <p>물리 키보드를 입력하면 선택한 스위치의 소리가 즉시 재생됩니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎚️</div>
              <h3>다양한 스위치</h3>
              <p>Cherry MX, Gateron 등 다양한 기계식 스위치 사운드를 지원합니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⌨️</div>
              <h3>시각적 피드백</h3>
              <p>87키 TKL 레이아웃으로 현재 누른 키를 시각적으로 확인할 수 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>키 타입별 사운드</h3>
              <p>스페이스바, 엔터 등 스태빌라이저 키는 다른 소리로 재생됩니다.</p>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-title">사용 방법</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>스위치 선택</h3>
                <p>사이드바에서 테스트하고 싶은 스위치를 선택합니다.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>오디오 시작</h3>
                <p>&quot;오디오 시작&quot; 버튼을 클릭하여 사운드를 활성화합니다.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>타이핑 테스트</h3>
                <p>키보드를 입력하면 선택한 스위치의 소리가 재생됩니다.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>KeySoundLab - 키보드 스위치 사운드 테스트</p>
      </footer>
    </div>
  );
}
