import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      //是否开启 $ref,vue3.2的语法糖
      refTransform: true,
      reactivityTransform: true

    })
  ],

  base: './'  //打包相对路径
})
