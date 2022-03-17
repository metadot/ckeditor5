const YOUTUBE_PATTERNS = [
	/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
	/^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
	/^youtube\.com\/embed\/([\w-]+)/,
	/^youtu\.be\/([\w-]+)/
];

function _getUrlMatches(url, pattern) {
	// 1. Try to match without stripping the protocol and "www" subdomain.
	let match = url.match(pattern);

	if (match) {
		return match;
	}

	// 2. Try to match after stripping the protocol.
	let rawUrl = url.replace(/^https?:\/\//, "");
	match = rawUrl.match(pattern);

	if (match) {
		return match;
	}

	// 3. Try to match after stripping the "www" subdomain.
	rawUrl = rawUrl.replace(/^www\./, "");
	match = rawUrl.match(pattern);

	if (match) {
		return match;
	}

	return null;
}

function _getId(url, PATTERNS) {
	for (const subPattern of PATTERNS) {
		const match = _getUrlMatches(url, subPattern);
		if (match) {
			return match[1];
		}
	}
}

function _extractUrl(params) {
	const url = new RegExp(
		/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
	).exec(params)[0];
	// For now only supports Youtube
	const id = _getId(url, YOUTUBE_PATTERNS);
	return `[youtube-video ${id}]`;
};

/**
 * Defines our custom replacement to detect figures and
 * add our specific markdown tags
 * E.g.: <figure class="media"><oembed url="https://www.youtube.com/watch?v=0A1b3T90dsc"></oembed></figure>
 * Will become [youtube-video 0A1b3T90dsc]
 *
 */
export default function mojoTurndownBlankReplacementFn( content, node ) {
	return node.isBlock && !node.matches("figure")
		? "\n\n"
		: _extractUrl(node.outerHTML)
}
