import type { 
  BufferDescriptor, 
  Device, 
  ProgramDescriptor 
} from '../../core'
import { GLBuffer } from './GLBuffer'
import { GLProgram } from './GLProgram'

export class GLDevice implements Device {
  #gl: WebGL2RenderingContext
  #uniformBufferMaxSize: number

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl

    this.#uniformBufferMaxSize = Math.min(
      gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE),
      0x10000
    )

    console.log("# uniformBufferMaxSize: ", this.#uniformBufferMaxSize)
  }

  createProgram(descriptor: ProgramDescriptor): GLProgram {
    return new GLProgram(this.#gl, descriptor)
  }

  createBuffer(descriptor: BufferDescriptor): GLBuffer {
    return new GLBuffer({
      device: this, 
      descriptor
    })
  }

  dispose() {
  }

  getGL(): WebGL2RenderingContext {
    return this.#gl
  }

  getUniformBufferMaxSize(): number {
    return this.#uniformBufferMaxSize
  }
}
