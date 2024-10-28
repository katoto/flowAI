import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  resolve
} from 'path'

export default defineConfig(async ({
  mode
}) => {
  let proxy = undefined
  if (mode === 'development') {
    proxy = {
      '/api': {
        target: 'https://aurora-api-stg.github.cn/',
        changeOrigin: true, // 是否跨域
        rewrite: (path) => {
          console.log(path)
          return path.replace(/^\/api/, '');
        }
      },
      '/socket.io': {
        // target: `http://${serverHost}:${serverPort}`,
        // changeOrigin: true
      }
    }
  }
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    root: resolve(__dirname),
    build: {
      outDir: './dist'
    },
    server: {
      open: true,
      proxy,
      port: process.env.VITE_PORT ?? 8080,
      host: process.env.VITE_HOST
    }
  }
})
