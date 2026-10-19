import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cp } from 'node:fs/promises'
import { resolve } from 'node:path'

// Keep original HEVC files locally, but deploy only the browser-ready media.
function copyWebPublicAssets() {
  let config
  return {
    name: 'copy-web-public-assets',
    apply: 'build',
    configResolved(resolved) { config = resolved },
    async writeBundle() {
      await cp(config.publicDir, resolve(config.root, config.build.outDir), {
        recursive: true,
        filter: (source) => !/\.mov$/i.test(source),
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), copyWebPublicAssets()],
  build: { copyPublicDir: false },
})
