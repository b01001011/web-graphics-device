import type { Format } from './Format'
import type { Program } from './Program'

export interface InputLayout {
}

export interface InputLayoutDescriptor {
  program: Program,
  indexBufferFormat: Format,
  vertexBufferAttributes: VertexBufferAttribute[]
}

export interface VertexBufferAttribute {
  format: Format
  location: number
}
