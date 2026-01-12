import { PixelFormat } from './Format'
import { type Texture } from './Texture'

export interface RenderTarget{
  dispose: () => void
}

export interface RenderTargetDescriptor {
  width: number
  height: number
  pixelFormat: PixelFormat
  texture?: Texture 
}
