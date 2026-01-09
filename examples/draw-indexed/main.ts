import '../style.css'
import { 
  BufferUsage,
  Format,
  GLContext, 
  GLDevice
} from '../../src'

function render(
  $canvas: HTMLCanvasElement
) {
  const context = new GLContext($canvas)
  const device = context.getDevice()
  const program = device.createProgram({
    vertex: `
layout(location = 0) in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
} 
    `,
    fragment: `
out vec4 outputColor;

void main() {
  outputColor = vec4(1.0, 0.0, 0.0, 1.0);
}
    `
  })

  const vertexBuffer = device.createBuffer({
    view: new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5, 1, 0.5]),
    usage: BufferUsage.VERTEX
  })

  const indexBuffer = device.createBuffer({
    view: new Uint32Array([0, 1, 2, 0, 2, 3]),
    usage: BufferUsage.INDEX
  })

  const inputLayout = device.createInputLayout({
    program,
    indexBufferFormat: Format.U32,
    vertexBufferAttributes: [{
      format: Format.F32,
      location: 0
    }]
  })

  return () => {
    program.dispose()
  }
}

function main() {
  const $app = document.querySelector<HTMLDivElement>('#app')
  const $container = document.createElement('div')
  const $canvas = document.createElement('canvas')

  $container.innerHTML = ''

  $canvas.width = 720 * window.devicePixelRatio
  $canvas.height = 480 * window.devicePixelRatio
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`

  $container.appendChild($canvas)
  $app?.appendChild($container)

  render($canvas)
}

main()
