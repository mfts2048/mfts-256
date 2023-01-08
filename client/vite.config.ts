import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    __VUE_OPTIONS_API__: false // 关闭 Vue2 中的 options选项API
  }
})
