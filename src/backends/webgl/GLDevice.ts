import type { Device, ProgramDescriptor } from '../../core'
import { GLProgram } from './GLProgram'

export class GLDevice implements Device {
  #gl: WebGL2RenderingContext

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl
  }

  createProgram(descriptor: ProgramDescriptor): GLProgram {
    const program = new GLProgram(this.#gl, descriptor)
    return program
  }

  dispose() {
  }
}
