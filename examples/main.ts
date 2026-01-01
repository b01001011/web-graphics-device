import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <nav>
    <ul>
      <li><a href="/triangle/index.html">Triangle</a></li>
      <li><a href="/draw-indexed/index.html">Draw Indexed</a></li>
      <li><a href="/rotating-cube/index.html">Rotating Cube</a></li>
      <li><a href="/scissor-rect/index.html">Scissor Rect</a></li>
    </ul>
  </nav>
`
