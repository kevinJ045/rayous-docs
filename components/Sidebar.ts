import { Sequence } from "@/app/constant/sequence";
import { Image, Link, List, ListItem, Text, Widget } from "rayous";

function docItem(title: string) : Widget {
	return new ListItem({
		class: location.href.match(new RegExp(title+'$')) ? 'active' : '',
		title: new Link({
			text: title,
			url: location.href.match('page/') ? (location.href.endsWith('/') ? '.' : '')+'./'+title : 'page/'+title
		}),
		onClick(){
			location.href = location.href.match('page/') ? (location.href.endsWith('/') ? '.' : '')+'./'+title : 'page/'+title
		}
	});
}

function docSetup(titles: string[]): Widget {
	return new Widget({
		element: {name: 'details'},
		class: 'item-group',
		children: [
			new Text(titles.shift(), {element: {name: 'summary'}}),
			...titles
			.map(docItem)
		],
		attr: {
			open: titles.find(title => location.href.match(title))
		}
	});
}

export class Sidebar extends Widget {
	constructor(){
		super({
			class: 'sidebar'
		});

		this.add(new Widget({
			class: 'title-bar',
			children: [
				new Image('https://raw.githubusercontent.com/kevinJ045/guilib/main/assets/logo.png', {
					width: 30
				}),
				new Text({
					text: 'Rayous',
					class: 'title'
				})
			]
		}));

		this.add(
			new List({
				class: 'sidebar-menu',
				items: Sequence,
				template(item: string | string[]){
					return typeof item == "string" ? docItem(item) : docSetup(item)
				}
			}),
		)
	}
}