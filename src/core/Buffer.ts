export interface Buffer {
}

export interface BufferDescriptor {
  view: ArrayBufferView,
  usage: BufferUsage
}

export const BufferUsage = {
  VERTEX:       0x0001,
  INDEX:        0x0002,
  UNIFORM:      0x0004,
} as const

export type BufferUsage = typeof BufferUsage[keyof typeof BufferUsage]
