import type { Program, ProgramDescriptor } from '../../core'

export class GLProgram implements Program {
  #handle: WebGLProgram
  #gl: WebGL2RenderingContext

  constructor(gl: WebGL2RenderingContext, descriptor: ProgramDescriptor) {
    this.#gl = gl
    this.#handle = this.#gl.createProgram()

    const { vertex, fragment } = descriptor

    if(vertex && fragment) {
      const vertexShader = this.#gl.createShader(this.#gl.VERTEX_SHADER);
      if(!vertexShader) {
        const error = this.#gl.getError()
        throw new Error(`Error: ${error}`)
      }
      this.#gl.shaderSource(vertexShader, vertex)
      this.#gl.compileShader(vertexShader)

      const fragmentShader = this.#gl.createShader(this.#gl.FRAGMENT_SHADER)
      if(!fragmentShader) {
        const error = this.#gl.getError()
        throw new Error(`Error: ${error}`)
      }
      this.#gl.shaderSource(fragmentShader, fragment)
      this.#gl.compileShader(fragmentShader)

      this.#gl.attachShader(this.#handle, vertexShader)
      this.#gl.attachShader(this.#handle, fragmentShader)
      this.#gl.linkProgram(this.#handle)
    }
  }

  get handle() {
    return this.#handle;
  }

  dispose() {
  }
}
