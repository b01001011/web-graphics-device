import '../style.css'
import { GLContext, GLDevice } from '../../src/backends/webgl'

function render(
  $canvas: HTMLCanvasElement
) {
  const context = new GLContext($canvas);
  const device = context.getDevice();
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
  });
}

function main() {
  const $app = document.querySelector<HTMLDivElement>('#app')
  const $container = document.createElement('div')
  const $canvas = document.createElement('canvas')

  $container.innerHTML = '';

  $canvas.width = 720 * window.devicePixelRatio
  $canvas.height = 480 * window.devicePixelRatio
  $canvas.style.width = `${$canvas.width / window.devicePixelRatio}px`
  $canvas.style.height = `${$canvas.height / window.devicePixelRatio}px`

  $container.appendChild($canvas)
  $app?.appendChild($container)

  render($canvas)
}

main()
