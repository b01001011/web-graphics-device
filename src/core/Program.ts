export interface Program {
  dispose: () => void
}

export interface ProgramDescriptor {
  vertex?: string
  fragment?: string
}
