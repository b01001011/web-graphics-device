import type { 
  InputLayout, 
  InputLayoutDescriptor 
} from '../../core'

import { 
  Format
} from '../../core'

import {
  translateFormatToGL
} from './utils'

import { GLBuffer } from './GLBuffer'
import { GLDevice } from './GLDevice'

export class GLInputLayout implements InputLayout {
  #device: GLDevice

  constructor(device: GLDevice, descriptor: InputLayoutDescriptor) {
    this.#device = device
    const { indexBufferFormat, program } = descriptor
    const gl = this.#device.getGL()
    
    const indexBufferType = translateFormatToGL(gl, indexBufferFormat)

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const dummyVertexBuffer = this.#device.getDummyVertexBuffer() as GLBuffer
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      dummyVertexBuffer.getGLBuffer(0)
    )
  }
}
