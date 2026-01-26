/**
 * 로깅 유틸리티
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type Logger = {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

export const createLogger = (prefix: string, enabled: boolean = true): Logger => {
  const log = (level: LogLevel, ...args: unknown[]) => {
    if (!enabled) return;

    const timestamp = new Date().toISOString();
    const message = `[${timestamp}] [${prefix}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.debug(message, ...args);
        break;
      case 'info':
        console.info(message, ...args);
        break;
      case 'warn':
        console.warn(message, ...args);
        break;
      case 'error':
        console.error(message, ...args);
        break;
    }
  };

  return {
    debug: (...args) => log('debug', ...args),
    info: (...args) => log('info', ...args),
    warn: (...args) => log('warn', ...args),
    error: (...args) => log('error', ...args),
  };
};

export const logger = createLogger('KeySoundLab', process.env.NODE_ENV === 'development');
