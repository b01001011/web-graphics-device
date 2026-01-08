import type { 
  Buffer,
  BufferDescriptor,
  Device, 
  InputLayout,
  InputLayoutDescriptor,
  Program,
  ProgramDescriptor,
  RenderPipeline,
  RenderPipelineDescriptor,
  Texture,
  TextureDescriptor
} from '../../core'

import { 
  BufferUsage
} from '../../core'

import { GLBuffer } from './GLBuffer'
import { GLInputLayout } from './GLInputLayout'
import { GLProgram } from './GLProgram'
import { GLRenderPipeline } from './GLRenderPipeline'
import { GLTexture } from './GLTexture'

export class GLDevice implements Device {
  #dummyVertexBuffer: Buffer
  #gl: WebGL2RenderingContext
  #uniformBufferMaxSize: number

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl

    this.#uniformBufferMaxSize = Math.min(
      gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE),
      0x10000
    )

    this.#dummyVertexBuffer = this.createBuffer({
      view: new Float32Array([0]),
      usage: BufferUsage.VERTEX
    })
  }

  createBuffer(descriptor: BufferDescriptor): Buffer {
    return new GLBuffer(this, descriptor)
  }

  createInputLayout(descriptor: InputLayoutDescriptor): InputLayout {
    return new GLInputLayout(this, descriptor)
  }

  createProgram(descriptor: ProgramDescriptor): Program {
    return new GLProgram(this, descriptor)
  }

  createRenderPipeline(descriptor: RenderPipelineDescriptor): RenderPipeline {
    return new GLRenderPipeline(descriptor)
  }
  
  createTexture(descriptor: TextureDescriptor): Texture {
    return new GLTexture(descriptor)
  }

  dispose() {
  }

  getDummyVertexBuffer(): Buffer {
    return this.#dummyVertexBuffer
  }

  getGL(): WebGL2RenderingContext {
    return this.#gl
  }

  getUniformBufferMaxSize(): number {
    return this.#uniformBufferMaxSize
  }
}
