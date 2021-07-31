// 防抖
export const debounce = (func, wait = 60) => {
	let timer = null
	return function(...args) {
		clearTimeout(timer)
		timer = setTimeout(() => func.apply(this, args), wait)
	}
}

// 节流函数
export const throttle = (func, delay = 60) => {
	let timer = null
	let start = 0
	return function(...args) {
		const current = +new Date()
		clearTimeout(timer)
		if (current - start > delay) {
			func.apply(this, args)
			start = current
		} else {
			timer = setTimeout(() => func.apply(this, args), delay)
		}
	}
}

// localStorage
export const Storage = {
	get: (name) => {
		let data = null
		try {
			data = JSON.parse(localStorage.getItem(name))
		} catch (err) {
			data = localStorage.getItem(name)
		}
		return data
	},
	set: (name, data) => {
		if (typeof data === 'object') {
			data = JSON.stringify(data)
		}
		localStorage.setItem(name, data)
	},
	rm: (name) => {
		localStorage.removeItem(name)
	},
	clear: () => {
		localStorage.clear()
	}
}

// sessionStorage
export const Session = {
	get: (name) => {
		let data = null
		try {
			data = JSON.parse(sessionStorage.getItem(name))
		} catch (err) {
			data = sessionStorage.getItem(name)
		}
		return data
	},
	set: (name, data) => {
		if (typeof data === 'object') {
			data = JSON.stringify(data)
		}
		sessionStorage.setItem(name, data)
	},
	rm: (name) => {
		sessionStorage.removeItem(name)
	},
	clear: () => {
		sessionStorage.clear()
	}
}

// 函数柯里化
export const curry = (fn, arity = fn.length) => {
	const curried = (...args) =>
		args.length >= arity
			? fn(...args)
			: (...restArgs) => curried(...args, ...restArgs)
	return curried
}

// compose
export const compose = (...fns) => (...args) => {
	const [...tmpFns] = fns
	const composed = (...restArgs) => {
		if (tmpFns.length === 0) {
			return restArgs[0]
		}
		return composed(tmpFns.pop()(...restArgs))
	}
	return composed(...args)
}
