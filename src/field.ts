/**
 * The background: iso-lines of a slowly evolving scalar field, drawn on a
 * fixed canvas behind the page.
 *
 * Each frame samples a sum of a few sines on a coarse grid and runs marching
 * squares over it. The sines' phases drift with time, so the contour map
 * flows and reshapes like isobars on a weather chart. It is faint by design
 * (the canvas carries the opacity in CSS) and nothing in it is an object, so
 * it reads as a surface breathing rather than something to look at.
 *
 * Cost is kept low on purpose: a ~16px cell grid, 30fps, device pixel ratio
 * capped, and the loop stops entirely while the tab is hidden. Under
 * prefers-reduced-motion it draws one frame and holds.
 */

const CELL = 16 // CSS px per grid cell
const LEVELS = 22
const SCALE = 1200 // CSS px per unit of field space; fixes the pattern's size
const SPEED = 0.06 // field-time per real second
const FRAME_MS = 1000 / 30
const MAX_DPR = 1.5

function field(u: number, v: number, t: number): number {
  return (
    Math.sin(5.6 * u + 0.9 * Math.sin(4.1 * v + 0.7 * t) + 0.4 * t) +
    0.8 * Math.sin(7.3 * v + 1.2 * Math.cos(4.9 * u - 0.5 * t) - 0.3 * t) +
    0.6 * Math.sin(9.1 * (u + v) + 0.5 + 0.6 * t) +
    0.4 * Math.sin(12.4 * (u - 0.6 * v) + 1.9 - 0.45 * t)
  )
}

// Marching squares: for each corner case, which pairs of cell edges a
// contour crosses. Edges are 0 top, 1 right, 2 bottom, 3 left. Cases 5 and
// 10 are saddles and are resolved at draw time from the cell's centre.
const TABLE: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [], [[3, 2]], [[2, 1]], [[3, 1]],
  [[0, 1]], [], [[0, 2]], [[0, 3]],
  [[3, 0]], [[0, 2]], [], [[0, 1]],
  [[3, 1]], [[2, 1]], [[3, 2]], [],
]
const SADDLE_5_HI: ReadonlyArray<readonly [number, number]> = [[3, 0], [1, 2]]
const SADDLE_5_LO: ReadonlyArray<readonly [number, number]> = [[3, 2], [0, 1]]
const SADDLE_10_HI: ReadonlyArray<readonly [number, number]> = [[0, 1], [2, 3]]
const SADDLE_10_LO: ReadonlyArray<readonly [number, number]> = [[0, 3], [1, 2]]

export function startField(canvas: HTMLCanvasElement): void {
  const maybeCtx = canvas.getContext('2d')
  if (!maybeCtx) return
  // Re-bound with a non-nullable type: the guard above does not narrow a
  // captured variable inside the nested functions below.
  const ctx: CanvasRenderingContext2D = maybeCtx

  const reduce = matchMedia('(prefers-reduced-motion: reduce)')
  let w = 0
  let h = 0
  let nx = 0
  let ny = 0
  let dpr = 1
  let values = new Float32Array(0)
  let raf = 0
  let lastNow = 0
  let fieldTime = 0

  function resize(): void {
    dpr = Math.min(devicePixelRatio || 1, MAX_DPR)
    w = innerWidth
    h = innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    nx = Math.ceil(w / CELL)
    ny = Math.ceil(h / CELL)
    values = new Float32Array((nx + 1) * (ny + 1))
  }

  function draw(t: number): void {
    const stride = nx + 1
    let lo = Infinity
    let hi = -Infinity
    for (let j = 0; j <= ny; j++) {
      const v = (j * CELL) / SCALE
      for (let i = 0; i <= nx; i++) {
        const f = field((i * CELL) / SCALE, v, t)
        values[j * stride + i] = f
        if (f < lo) lo = f
        if (f > hi) hi = f
      }
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    for (let k = 0; k < LEVELS; k++) {
      const level = lo + ((hi - lo) * (k + 0.5)) / LEVELS
      ctx.beginPath()
      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          const a = values[j * stride + i]
          const b = values[j * stride + i + 1]
          const c = values[(j + 1) * stride + i + 1]
          const d = values[(j + 1) * stride + i]
          const idx =
            (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
          if (idx === 0 || idx === 15) continue

          let pairs = TABLE[idx]
          if (idx === 5) pairs = (a + b + c + d) / 4 > level ? SADDLE_5_HI : SADDLE_5_LO
          else if (idx === 10) pairs = (a + b + c + d) / 4 > level ? SADDLE_10_HI : SADDLE_10_LO

          const x0 = i * CELL
          const y0 = j * CELL
          for (const [e0, e1] of pairs) {
            ctx.moveTo(...edgePoint(e0, x0, y0, a, b, c, d, level))
            ctx.lineTo(...edgePoint(e1, x0, y0, a, b, c, d, level))
          }
        }
      }
      ctx.stroke()
    }
  }

  function edgePoint(
    e: number,
    x0: number,
    y0: number,
    a: number,
    b: number,
    c: number,
    d: number,
    level: number,
  ): [number, number] {
    // Linear interpolation along the edge between its two corner values.
    switch (e) {
      case 0:
        return [x0 + CELL * frac(a, b, level), y0]
      case 1:
        return [x0 + CELL, y0 + CELL * frac(b, c, level)]
      case 2:
        return [x0 + CELL * frac(d, c, level), y0 + CELL]
      default:
        return [x0, y0 + CELL * frac(a, d, level)]
    }
  }

  function frac(p: number, q: number, level: number): number {
    return q === p ? 0.5 : (level - p) / (q - p)
  }

  function frame(now: number): void {
    raf = requestAnimationFrame(frame)
    if (now - lastNow < FRAME_MS) return
    // Advance field-time by real time elapsed while running, so pauses
    // (hidden tab) resume where they left off rather than jumping.
    if (lastNow) fieldTime += ((now - lastNow) / 1000) * SPEED
    lastNow = now
    draw(fieldTime)
  }

  function start(): void {
    if (raf || document.hidden || reduce.matches) return
    lastNow = 0
    raf = requestAnimationFrame(frame)
  }

  function stop(): void {
    cancelAnimationFrame(raf)
    raf = 0
  }

  resize()
  draw(fieldTime)

  let resizeTimer = 0
  addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      resize()
      draw(fieldTime)
    }, 120)
  })
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop()
    else start()
  })
  reduce.addEventListener('change', () => {
    if (reduce.matches) {
      stop()
      draw(fieldTime)
    } else {
      start()
    }
  })

  start()
}
