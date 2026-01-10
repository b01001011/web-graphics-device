export const Format = {
  U8:  "U8",
  U16: "U16",
  U32: "U32",
  S8:  "S8",
  S16: "S16",
  S32: "S32",
  F32: "F32"
} as const
export type Format = typeof Format[keyof typeof Format]

export const PixelFormat = {
  RGBA8:  "RGBA8"
} as const
export type PixelFormat = typeof PixelFormat[keyof typeof PixelFormat]
