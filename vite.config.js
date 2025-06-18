import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import copy from 'vite-plugin-copy'

// export default defineConfig({
//   plugins: [
//     react(),
//     copy({
//       targets: [
//         { src: 'manifest.json', dest: 'dist' },
//         { src: 'src/background.js', dest: 'dist' },
//         { src: 'src/content.js', dest: 'dist' },
//         { src: 'public/icon*.png', dest: 'dist' }
//       ],
//       hook: 'writeBundle'
//     })
//   ],
//   build: {
//     outDir: 'dist',
//     rollupOptions: {
//       input: 'src/main.jsx',
//       output: {
//         dir: 'dist',
//         format: 'es'
//       }
//     }
//   }
// })