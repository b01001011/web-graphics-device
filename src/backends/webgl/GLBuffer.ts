import type { Buffer, BufferDescriptor } from '../../core'
import type { GLDevice } from './GLDevice'

import { BufferUsage } from '../../core'

export class GLBuffer implements Buffer {
  #glBufferType: GLenum
  #glBuffers: WebGLBuffer[]

  #glBufferMaxSize: number

  constructor(
    device: GLDevice,
    descriptor: BufferDescriptor
  ) {
    const { view, usage } = descriptor
    const gl = device.getGL()

    this.#glBuffers = [];
    this.#glBufferMaxSize = device.getUniformBufferMaxSize()

    switch(usage) {
      case BufferUsage.INDEX:
        gl.bindVertexArray(null)
        this.#glBufferType = gl.ELEMENT_ARRAY_BUFFER
        this.#glBuffers.push(this.createGLBuffer(gl, view.byteLength, this.#glBufferType))
        break
      case BufferUsage.VERTEX:
        gl.bindVertexArray(null)
        this.#glBufferType = gl.ARRAY_BUFFER
        this.#glBuffers.push(this.createGLBuffer(gl, view.byteLength, this.#glBufferType))
        break
      case BufferUsage.UNIFORM:
        this.#glBufferType = gl.UNIFORM_BUFFER
        let remaining = view.byteLength;
        while(remaining > 0) {
          this.#glBuffers.push(
            this.createGLBuffer(
              gl,
              Math.min(remaining, this.#glBufferMaxSize),
              this.#glBufferType
            ),
          )
          remaining -= this.#glBufferMaxSize;
        }
        break
    }

    const byteView = new Uint8Array(
      view.buffer,
      view.byteOffset,
      view.byteLength
    )

    const dstByteOffset = 0;
    const maxBufferChunkSize = device.getUniformBufferMaxSize()
    const virtualByteOffsetEnd = dstByteOffset + byteView.byteLength;
    
    let srcByteOffset = 0;
    let virtualByteOffset = dstByteOffset;
    let physicalByteOffset = dstByteOffset % maxBufferChunkSize

    while(virtualByteOffset < virtualByteOffsetEnd) {
      const buffer = this.#glBuffers[(virtualByteOffset / maxBufferChunkSize)]
      gl.bindBuffer(gl.COPY_WRITE_BUFFER, buffer)
      gl.bufferSubData(
        gl.COPY_WRITE_BUFFER,
        physicalByteOffset,
        byteView,
        srcByteOffset,
        Math.min(
          virtualByteOffsetEnd - virtualByteOffset,
          maxBufferChunkSize,
        ),
      )

      virtualByteOffset += maxBufferChunkSize
      physicalByteOffset = 0
      srcByteOffset += maxBufferChunkSize
    }
  }

  private createGLBuffer(
    gl: WebGL2RenderingContext, 
    byteLength: number, 
    bufferType: GLenum
  ): WebGLBuffer {
      const buffer = gl.createBuffer()
      gl.bindBuffer(bufferType, buffer)
      gl.bufferData(bufferType, byteLength, gl.STATIC_DRAW)
      return buffer
  }

  getGLBuffer(offset: number) {
    return this.#glBuffers[(offset / this.#glBufferMaxSize) | 0];
  }
}
