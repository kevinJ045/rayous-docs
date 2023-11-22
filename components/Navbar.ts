import { Text, Widget } from "rayous";



export class Navbar extends Widget {
	constructor(){
		super({
			class: 'navbar'
		});

		let title = new Text('Rayous', {
			class: 'title'
		});

		this.add(title);

		Widget.from(document.body).on('markdown_loaded', () => {
			let title1 = document.querySelector('h1');
			if(title1) {
				title1.remove();
				title.text(title1.innerText);
			}
		});
	}
}