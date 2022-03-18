function mojo_ticket_link(id) {
	return `<a target="blank" class="mojo-ticket-link" href="/tickets/${id}">ticket#${id}</a>`;
}

function youtube_video(id) {
	return `<figure class="media ck-widget ck-widget_selected" contenteditable="false"><div class="ck-media__wrapper" data-oembed-url="https://www.youtube.com/watch?v=${id}"><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;"><iframe src="https://www.youtube.com/embed/ifTF3ags0XI" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe></div></div><div class="ck ck-reset_all ck-widget__type-around"><div class="ck ck-widget__type-around__button ck-widget__type-around__button_before" title="Insert paragraph before block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__button ck-widget__type-around__button_after" title="Insert paragraph after block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8"><path d="M9.055.263v3.972h-6.77M1 4.216l2-2.038m-2 2 2 2.038"></path></svg></div><div class="ck ck-widget__type-around__fake-caret"></div></div></figure>`
}

function process_custom_tags(text) {
	// mojo#123
	if (new RegExp(/(mojo\#)(\d+)/).exec(text)) {
		const id = new RegExp(/(mojo\#)(\d+)/).exec(text)[2];
		return mojo_ticket_link(id)
	} else if (new RegExp(/(ticket\#)(\d+)/).exec(text)) {
		const id = new RegExp(/(ticket\#)(\d+)/).exec(text)[2];
		return mojo_ticket_link(id);
	} else if (new RegExp(/(\[youtube-video )(.+)(\])/).exec(text)) {
		const resource_id = new RegExp(/(\[youtube-video )(.+)(\])/).exec(text)[2];
		return youtube_video(resource_id);
	} else {
		return text;
	}
}

export default {
	paragraph(text, level) {
		return process_custom_tags(text);
	},
	heading(text, level) {
		level = level + 1;
		return `<h${level}>${text}</h${level}>`;
	}
}
