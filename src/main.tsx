import { render } from 'preact'
import './index.css'
import App from './App.tsx'
import { startField } from './field.ts'

render(<App />, document.getElementById('root')!)

// The background lives outside the component tree: a plain canvas in
// index.html, driven directly. Nothing in the app depends on it.
const field = document.querySelector<HTMLCanvasElement>('canvas.field')
if (field) startField(field)
