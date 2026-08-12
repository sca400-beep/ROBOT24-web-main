import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function customAssetResolver() {
  return {
    name: 'custom-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/') || id.startsWith('asset/')) {
        const filename = id.replace(/^(figma:)?asset\//, '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    customAssetResolver(),
    // React and Tailwind plugins
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
