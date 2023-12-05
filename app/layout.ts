import { Component, Widget } from "rayous";
import { buildProps } from "rayous/extra";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

import "@/styles/main.scss";

const enableActiveTitle = (map) => {
	if(map.left-map.el.clientWidth > map.el.parentNode.clientWidth) map.el.parentNode.scrollLeft = map.left-(map.el.clientWidth*2);
	else if(map.left+map.el.clientWidth < map.el.parentNode.scrollLeft) map.el.parentNode.scrollLeft = map.left-(map.el.clientWidth*2);
	
	map.active = true;
	map.el.classList.add('active');
}

const disableActiveTitle = (map) => {
	map.active = false;
	map.el.classList.remove('active');
}

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
							class: 'main-content animate-up',
							id: 'main-content',
							children: [ props.page! ],
							onScroll(){
								let main = this.raw().at(0);

								if(main.scrollTop > 200) document.body.classList.add('scrolled-page');
								else document.body.classList.remove('scrolled-page');

								if(main.scrollMaps){
									const scrollMaps = main.scrollMaps;
									const topToBottom = main.scrollTop + (scrollMaps[scrollMaps.length-1].height - scrollMaps[scrollMaps.length-1].top) + 120;
									let currentMap = scrollMaps.find(map => main.scrollTop+150 >= map.top-100 && main.scrollTop+150 <= map.height-100);
									let clean = main.scrollTop < 200;

									if(!scrollMaps.left){
										scrollMaps.left = 1;
										scrollMaps.forEach(map => map.left = map.el.getBoundingClientRect().left - 100)
									}

									if(topToBottom >= main.scrollHeight || main.scrollTop+(window.innerHeight - 70) >= main.scrollHeight){
										currentMap = scrollMaps[scrollMaps.length-1];
									} 
									if(currentMap || clean) scrollMaps.forEach(map => disableActiveTitle(map));
									if(currentMap && !currentMap.active) enableActiveTitle(currentMap);
								}
							}
						})
					]
				})
			],
		});
	}
}