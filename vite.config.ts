import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// The components are plain function components on useState/useEffect, so
// preact/compat runs them unchanged — the preset aliases react and react-dom
// onto it. See README for why.
export default defineConfig({
  plugins: [preact()],
  base: '/',
})
