export const Primitive = {
  TRIANGLE:  "TRIANGLE",
  TRIANGLE_STRIP: "TRIANGLE_STRIP",
} as const

export type Primitive = typeof Primitive[keyof typeof Primitive]
