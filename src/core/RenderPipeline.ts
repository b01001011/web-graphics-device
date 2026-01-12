import { type InputLayout } from './InputLayout'
import { type Primitive } from './Primitive'
import { type Program } from './Program'

export interface RenderPipeline {
}

export interface RenderPipelineDescriptor {
  inputLayout: InputLayout
  program: Program
  primitive: Primitive
}
