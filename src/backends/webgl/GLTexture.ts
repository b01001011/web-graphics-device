import { 
  type Texture, 
  type TextureDescriptor,
  TextureDimension,  
  TextureUsage
} from '../../core'

import { GLDevice } from './GLDevice'
import { translatePixelFormatToGL } from './utils'

export class GLTexture implements Texture {
  #device: GLDevice
  #glTexture: WebGLTexture

  constructor(device: GLDevice, descriptor: TextureDescriptor) {
    this.#device = device
    const gl = this.#device.getGL()

    this.#glTexture = gl.createTexture()
    const glPixelFormat = translatePixelFormatToGL(gl, descriptor.pixelFormat)
    const mipmapLevelCount = descriptor.mipmapLevelCount
    
    this.#device.currentTexture = gl.TEXTURE0

    if(descriptor.dimension === TextureDimension.TEXTURE_2D) {
      if(descriptor.usage == TextureUsage.RENDER_TARGET) {
        gl.texStorage2D(
          gl.TEXTURE_2D,
          mipmapLevelCount,
          glPixelFormat,
          descriptor.width,
          descriptor.height,
        )
      }
    }
  }
}
