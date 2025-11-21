export const getLocalStorage = <T>(key: string, initialValue: T): T => {
	try {
		const storedData = localStorage.getItem(key)
		return storedData ? (JSON.parse(storedData) as T) : initialValue
	} catch (error) {
		console.error(`Error loading data from localStorage with key=${key}:`, error)
		return initialValue
	}
}

export const setLocalStorage = <T>(key: string, value: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.error(`Error set data to localStorage with key=${key}:`, error)
	}
}

export const removeLocalStorage = (key: string): void => {
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error(`Error remove data from localStorage by key=${key}:`, error)
	}
}
