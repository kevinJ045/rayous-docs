import { findNext } from "@/app/constant/sequence";
import { MarkdownWidget } from "@/components/Markdown";
import { Button, Component, Link, Row, Text, Widget } from "rayous";
import { Ref, buildProps } from "rayous/extra";


export default class Page extends Component {
	pageMarkdown = "";

	static updateMode: "reinit" | "refresh" = "refresh";

	initState(props: any): void {
		this.ref('pageMarkdown', '');
	}

	build(props: buildProps) {
		let page = props.route.params.page;
		return new Widget({
			children: [
				new Widget({
					class: 'container',
					padding: '10px 20px',
					children: [
						new MarkdownWidget(this.pageMarkdown),
						new Row({
							margin: '50px 20px',
							mainAxisAlignment: 'space-between',
							children: [
								findNext(page, true) ? new Link({
									class: 'btn',
									text: findNext(page, true),
									url: location.href.match('page/') ? (location.href.endsWith('/') ? '.' : '')+'./'+findNext(page, true) : 'page/'+findNext(page, true)
								}) : null, 
								findNext(page) ? new Link({
									class: 'btn next',
									text: findNext(page),
									url: location.href.match('page/') ? (location.href.endsWith('/') ? '.' : '')+'./'+findNext(page) : 'page/'+findNext(page)
								}) : null, 
							]
						})
					]
				})
			]
		});
	}

	afterBuild(props: buildProps) {
		let page = props.route.params.page;
		fetch((location.href.match('page') ? (location.href.endsWith('/') ? '../../' : '../') : '')+'views/'+page+'.md')
		.then(r => r.text())
		.then(text => {
			this.pageMarkdown = text;
			Widget.from(document.body).emit('markdown_loaded', {});
		});
	}

	
}