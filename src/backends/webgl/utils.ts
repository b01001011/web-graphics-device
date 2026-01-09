import { 
  Format
} from '../../core'

export function translateFormatToGL(
    gl: WebGL2RenderingContext, 
    format: Format
): { type: GLenum; size: number }  {
  switch (format) {
    case Format.U8:
      return { type: gl.UNSIGNED_BYTE, size: 1 }
    case Format.U16:
      return { type: gl.UNSIGNED_SHORT, size: 2 }
    case Format.U32:
      return { type: gl.UNSIGNED_INT, size: 4 }
    case Format.F32:
      return { type: gl.FLOAT, size: 4 }
    default:
      throw new Error('Error: Unknown format.')
  }
}
