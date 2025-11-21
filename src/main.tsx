import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { appStore } from './stores/index'

import './i18n'
import 'quill/dist/quill.snow.css'
import 'assets/styles/editorText.scss'
import 'assets/styles/index.css'
import 'assets/styles/app.scss'

import App from './App'

const fallbackChillDaily = () => {
	const loader = document.getElementById('global-loader')
	if (loader) {
		loader.remove()
	}
}

const rootElement = document.getElementById('root')

if (rootElement) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<Provider store={appStore}>
				<App />
			</Provider>
		</StrictMode>,
	)
	fallbackChillDaily()
}
