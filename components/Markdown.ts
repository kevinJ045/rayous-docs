import { Widget } from "rayous";
import { options } from "rayous/extra";
import { marked } from "marked";

import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup-templating';

export class MarkdownWidget extends Widget {
	constructor(markdown: string = "", options: options = {}){
		super({
			class: 'markdown-widget',
			...options
		});

		this.setMarkdown(markdown);
	}

	setMarkdown(markdown: string){
		if(typeof markdown !== "string") return this; 
		let html = marked(markdown);

		this.html(html);

		this.updateCodeblocks();

		return this;
	}

	updateCodeblocks(){
		this.raw().find('code').forEach(element => {
			(window as any).Prism.highlightElement(element);
		});
	}
}