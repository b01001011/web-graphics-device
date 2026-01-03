import type { Program, ProgramDescriptor } from './Program'

export interface Device {
  createProgram: (descriptor: ProgramDescriptor) => Program
}
