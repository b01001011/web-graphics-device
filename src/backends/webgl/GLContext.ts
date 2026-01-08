import type { Context, Device } from '../../core'
import { GLDevice } from './GLDevice'

export class GLContext implements Context {
  #device: GLDevice
  
  constructor($canvas: HTMLCanvasElement) {
    let gl = $canvas.getContext('webgl2')
    if(!gl) {
      throw new Error(`Error: gl is null.`)
    }
    this.#device = new GLDevice(gl);
  }

  getDevice(): Device {
    return this.#device
  }
}
