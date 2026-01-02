import '../style.css'
import { WebGLContext } from '../../src/backends/webgl'

function render(
  $canvas: HTMLCanvasElement
) {
  const context = new WebGLContext($canvas);
  const device = context.getDevice();
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
