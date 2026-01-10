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
  #gl: WebGL2RenderingContext

  #dummyVertexBuffer: Buffer
  #currentTexture: GLenum | null
  #currentVertexArrayObject: WebGLVertexArrayObject | null
  #uniformBufferMaxSize: number

  constructor(gl: WebGL2RenderingContext) {
    this.#gl = gl

    this.#currentTexture = null
    this.#currentVertexArrayObject = null
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
    return new GLRenderPipeline(this, descriptor)
  }
  
  createTexture(descriptor: TextureDescriptor): Texture {
    return new GLTexture(this, descriptor)
  }

  dispose() {
  }

  getGL(): WebGL2RenderingContext {
    return this.#gl
  }
  get currentVertexArrayObject(): WebGLVertexArrayObject | null {
    return this.#currentVertexArrayObject;
  }

  set currentTexture(texture: GLenum) {
      this.#gl.activeTexture(texture);
      this.#currentTexture = texture;
  }

  set currentVertexArrayObject(object: WebGLVertexArrayObject | null) {
    this.#currentVertexArrayObject = object;
  }

  get dummyVertexBuffer(): Buffer {
    return this.#dummyVertexBuffer
  }

  get uniformBufferMaxSize(): number {
    return this.#uniformBufferMaxSize
  }
}
