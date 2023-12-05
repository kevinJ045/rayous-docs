import { Link, Text, Widget } from "rayous";
import { Style } from "rayous/extra";
import { SVG } from "rayous/svg";



export class Navbar extends Widget {
	constructor(){
		super({
			class: 'navbar'
		});


		this.add(new Widget({
			class: 'sidebar-toggle',
			onClick(){
				document.body.classList.toggle('sidebar-open');
			}
		}));

		let title = new Text('Rayous', {
			class: 'title animate-up'
		});

		this.add(title);

		Widget.from(document.body).on('markdown_loaded', () => {
			let title1 = document.querySelector('h1');
			if(title1) {
				title1.remove();
				title.text(title1.innerText);

				const titleInnerLinks = document.createElement('div');
				titleInnerLinks.classList.add('title-links');

				const scrollMaps = [];

				const alltitles: HTMLElement[] = Array.from(document.querySelectorAll('h2,h3,h4,h5,h6'));
				alltitles.forEach((title, index) => {
					if(!title.id) title.id = title.textContent.toLocaleLowerCase().replace(/[\s\W]/g, '_');
					const titleLink = document.createElement('a');
					titleLink.classList.add('title-link', 'animate-up');
					titleLink.href = '#'+title.id;
					titleLink.innerText = title.textContent;
					const top = title.getBoundingClientRect().top;

					const lastEl = Array.from(title.parentNode.children).pop();

					scrollMaps.push({
						top,
						el: titleLink,
						height: alltitles[index+1] ? alltitles[index+1].getBoundingClientRect().top : lastEl.getBoundingClientRect().top + lastEl.clientHeight*2
					});

					title.onclick = () => history.pushState(null, '', '#'+title.id);

					titleLink.onclick = (e) => {
						e.preventDefault();
						const main = document.body.querySelector('#main-content')!;

						title.style.color = '#09D0D0';
						setTimeout(() => title.style.color = 'inherit', 1000);

						main.scrollTop = top - 100;
						title.click();
					}

					titleInnerLinks.appendChild(titleLink);

					
				});

				if(alltitles.length) {
					const main: any = document.body.querySelector('#main-content')!;
					main.scrollMaps = scrollMaps;
					title.add(titleInnerLinks);
					alltitles.forEach(title => {
						if(location.hash == '#'+title.id) document.body.querySelector('#main-content')!.scrollTop = title.getBoundingClientRect().top
					})
				}
			}
		});

		this.add(new Link({
			url: 'https://github.com/kevinj045/rayous-docs',
			style: new Style({
				position: 'absolute',
				top: '10px',
				right: '10px'
			}),
			children: [
				new SVG({
					path: '#ffffff|M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.20-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.20-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.20-.82 2.20-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.20 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8a8 8 0 0 0-8-8',
					width: 30,
					height: 30,
					attr: {
						viewBox: '0 0 16 16'
					}
				})
			]
		}));
	}
}