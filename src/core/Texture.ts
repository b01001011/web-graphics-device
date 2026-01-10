import { PixelFormat } from './Format'
export interface Texture {
}

export interface TextureDescriptor {
  width: number
  height: number
  pixelFormat: PixelFormat
  dimension: TextureDimension
  mipmapLevelCount: number
  usage: TextureUsage
}

export const TextureDimension = {
  TEXTURE_2D: "TRIANGLE"
} as const
export type TextureDimension = typeof TextureDimension[keyof typeof TextureDimension]

export const TextureUsage = {
  RENDER_TARGET: 0x01
} as const
export type TextureUsage = typeof TextureUsage[keyof typeof TextureUsage]
