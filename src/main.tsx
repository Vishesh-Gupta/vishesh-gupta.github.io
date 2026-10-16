import { hydrate, render } from 'preact'
import './index.css'
import App from './App.tsx'
import { startField } from './field.ts'

// In a production build #root already holds the prerendered page (see the
// prerender plugin in vite.config.ts), so hydrate attaches to that markup
// instead of rebuilding it. The dev server serves an empty #root.
const root = document.getElementById('root')!
if (root.firstElementChild) hydrate(<App />, root)
else render(<App />, root)

// The background lives outside the component tree: a plain canvas in
// index.html, driven directly. Nothing in the app depends on it.
const field = document.querySelector<HTMLCanvasElement>('canvas.field')
if (field) startField(field)
