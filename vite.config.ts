import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: { port: 5000 },
	resolve: {
		alias: {
			components: '/src/components',
			assets: '/src/assets',
			utils: '/src/utils',
			models: '/src/models',
			stores: '/src/stores',
			helpers: '/src/helpers',
			services: '/src/services',
			layouts: '/src/layouts',
			features: '/src/features',
		},
	},
	optimizeDeps: {
		include: ['quill', 'react-quilljs'],
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
})
