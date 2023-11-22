import { Component, Text, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import Page from "./page/[page]/page";


export default class HomePage extends Component {

	build(props: buildProps) {
		let p = {...props};
		p.route.params.page = 'Home';
		
		return new Widget({
			children: [
				Page.buildFor(this, p)
			]
		});
	}
}