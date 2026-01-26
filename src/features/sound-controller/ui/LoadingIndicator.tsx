'use client';

interface LoadingIndicatorProps {
  progress: number;
  message?: string;
}

/**
 * 사운드 로딩 상태 표시
 */
export function LoadingIndicator({ progress, message }: LoadingIndicatorProps) {
  return (
    <div className="loading-indicator">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      {message && <p className="loading-message">{message}</p>}
      <p className="progress-text">{Math.round(progress)}%</p>
    </div>
  );
}
