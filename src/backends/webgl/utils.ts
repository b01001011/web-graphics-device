import { 
  Format
} from '../../core'

export function translateFormatToGL(gl: WebGL2RenderingContext, format: Format): GLenum {
  switch (format) {
    case Format.U8:
      return gl.UNSIGNED_BYTE;
    case Format.U16:
      return gl.UNSIGNED_SHORT;
    case Format.U32:
      return gl.UNSIGNED_INT;
    default:
      throw new Error('Error: Unknown format.');
  }
}
