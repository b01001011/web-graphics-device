import { 
  type RenderTarget, 
  type RenderTargetDescriptor,
  type Texture
} from '../../core'

import { GLDevice } from './GLDevice'

export class GLRenderTarget implements RenderTarget {
  #device: GLDevice
  #texture: Texture | null
  #glRenderBuffer: WebGLRenderbuffer | null

  constructor(device: GLDevice, descriptor: RenderTargetDescriptor) {
    this.#device = device
    this.#texture = descriptor.texture ?? null
    this.#glRenderBuffer = null

    const gl = this.#device.getGL()

    if(!this.#texture) {
      this.#glRenderBuffer = gl.createRenderbuffer()
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.#glRenderBuffer)
    }
  }

  dispose() {
    if(this.#glRenderBuffer) {
      const gl = this.#device.getGL()
      gl.deleteRenderbuffer(this.#glRenderBuffer);
    }
    
    if(this.#texture) {
      this.#texture.dispose();
    }
  }
}
