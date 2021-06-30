export function encode(obj) {
	return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}

export function decode(base64Str) {
	return JSON.parse(decodeURIComponent(escape(window.atob(base64Str))));
}
