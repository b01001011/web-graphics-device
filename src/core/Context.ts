import type { Device } from './Device'

export interface Context {
  getDevice: () => Device;
}
