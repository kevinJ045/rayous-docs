import { Component, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

import "@/styles/main.scss";



export default class extends Component {
	build(props: buildProps): Widget {
		return new Widget({
			class: 'main',
			children: [
				new Sidebar,
				new Widget({
					class: 'main-view',
					children: [
						new Navbar,
						new Widget({
							class: 'main-content',
							children: [ props.page! ]
						})
					]
				})
			]
		});
	}
}