import type { Buffer, BufferDescriptor } from './Buffer'
import type { Program, ProgramDescriptor } from './Program'

export interface Device {
  createProgram: (descriptor: ProgramDescriptor) => Program
  createBuffer: (descriptor: BufferDescriptor) => Buffer
}
