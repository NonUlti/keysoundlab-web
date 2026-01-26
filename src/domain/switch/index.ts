// Types
export type { Switch, SwitchType, SwitchFilter, SoundMapping } from './types';

// Models
export {
  createSwitch,
  getPrimarySoundFile,
  getSoundFileForKeyType,
  isType,
  isActuationForceInRange,
  matchesQuery,
} from './models/Switch';

// Repository
export { SwitchRepository } from './repository/SwitchRepository';
export type { ISwitchAdapter } from './repository/SwitchRepository';
export { LocalSwitchAdapter } from './repository/adapters/LocalSwitchAdapter';
export { RemoteSwitchAdapter } from './repository/adapters/RemoteSwitchAdapter';
