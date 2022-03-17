
function process_custom_tags(text) {
	// mojo#123
	if (new RegExp(/(mojo\#)(\d+)/).exec(text)) {
		const id = new RegExp(/(mojo\#)(\d+)/).exec(text)[2];
		return `<a target="blank" href="/tickets/${id}">ticket#${id}</a>`;
	} else {
		return text;
	}
}

export default  {
	paragraph(text, level) {
		return process_custom_tags(text);
	}
}
