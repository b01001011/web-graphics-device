import type { 
  InputLayout, 
  InputLayoutDescriptor 
} from '../../core'

import {
  translateFormatToGL
} from './utils'

import { GLBuffer } from './GLBuffer'
import { GLDevice } from './GLDevice'

export class GLInputLayout implements InputLayout {
  #device: GLDevice
  #indexBufferType: GLenum | null
  #vertexArrayObject: WebGLVertexArrayObject

  constructor(device: GLDevice, descriptor: InputLayoutDescriptor) {
    this.#device = device
    const { indexBufferFormat, program } = descriptor
    const gl = this.#device.getGL()
    
    const { type: indexBufferType } = translateFormatToGL(gl, indexBufferFormat)

    const vertexArrayObject = gl.createVertexArray()
    gl.bindVertexArray(vertexArrayObject)

    const dummyVertexBuffer = this.#device.dummyVertexBuffer as GLBuffer
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      dummyVertexBuffer.getGLBuffer(0)
    )

    for (const attribute of descriptor.vertexBufferAttributes) {
      const { format, location } = attribute
      const { type, size } = translateFormatToGL(gl, format)

      gl.vertexAttribPointer(location, size, type, false, 0, 0);
      gl.enableVertexAttribArray(location);
    }

    gl.bindVertexArray(null)

    this.#indexBufferType = indexBufferType
    this.#vertexArrayObject = vertexArrayObject
  }

  get indexBufferType() {
    return this.#indexBufferType
  }

  get vertexArrayObject() {
    return this.#vertexArrayObject
  }

  destroy() {
    if (this.#device.currentVertexArrayObject === this.#vertexArrayObject) {
      this.#device.getGL().bindVertexArray(null)
      this.#device.getGL().deleteVertexArray(this.#vertexArrayObject)
      this.#device.currentVertexArrayObject = null
    }
  }
}
