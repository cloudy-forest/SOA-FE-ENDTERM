// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // Chỉ đường tường minh cho Vite biết 'react' nằm ở đâu
//       'react': path.resolve(__dirname, 'node_modules/react'),
//       'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
//     },
//   },
// })

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// (Xóa 'import path from "path"')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // (XÓA BỎ KHỐI "resolve: { alias: { ... } }" NẾU NÓ TỒN TẠI)
})