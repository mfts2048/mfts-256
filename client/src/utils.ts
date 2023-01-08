import MagicString from "magic-string";

export function handleUrl(content: any, s: MagicString) {
	const results: ResolveResult[] = [];
	//var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
	var reg =
		/(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
	// /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/g;
	for (const match of content.matchAll(reg)) {
		const matchedUrl = match[0];
		if (matchedUrl) {
			const start = match.index;
			const end = start + match[0].length;
			results.push({
				rawName: matchedUrl,
				replace: (resolved) => s.overwrite(start, end, resolved),
			});
		}
	}
	return results;
}

interface ResolveResult {
	rawName: string;
	replace: (resolved: string) => void;
}

export function conversion(content: string): MagicString {
	const s = new MagicString(content);
	const results = handleUrl(content, s);
	for (const { rawName, replace } of results) {
		replace(
			`<a class="ellipsis" target="_blank" href="${rawName}">${rawName}</a>`,
		);
	}
	return s
}
