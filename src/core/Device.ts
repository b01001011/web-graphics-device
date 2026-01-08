import type { Buffer, BufferDescriptor } from './Buffer'
import type { InputLayout, InputLayoutDescriptor } from './InputLayout'
import type { Program, ProgramDescriptor } from './Program'
import type { RenderPipeline, RenderPipelineDescriptor } from './RenderPipeline'
import type { Texture, TextureDescriptor } from './Texture'

export interface Device {
  createBuffer: (descriptor: BufferDescriptor) => Buffer
  createInputLayout: (descriptor: InputLayoutDescriptor) => InputLayout
  createProgram: (descriptor: ProgramDescriptor) => Program
  createRenderPipeline: (descriptor: RenderPipelineDescriptor) => RenderPipeline
  createTexture: (desriptor: TextureDescriptor) => Texture
}
