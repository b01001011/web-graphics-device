import type { Context, Device } from '../../core'
import { WebGLDevice } from './WebGLDevice'

export class WebGLContext implements Context {
  private device: WebGLDevice
  
  constructor($canvas: HTMLCanvasElement) {
    this.device = new WebGLDevice();
  }

  getDevice(): Device {
    return this.device;
  }
}
