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
							id: 'main-content',
							children: [ props.page! ],
							onScroll(e){
								if(e.original.target.scrollTop > 200) document.body.classList.add('scrolled-page');
								else document.body.classList.remove('scrolled-page');

								if(e.original.target.scrollMaps){
									const scrollMaps = e.original.target.scrollMaps;
									scrollMaps.forEach((map, index) => {
										if(e.original.target.scrollTop > map.top && 
											e.original.target.scrollTop < map.top+map.height){
												if(scrollMaps[index-1]?.active == true) {
													scrollMaps[index-1].active = false;
													scrollMaps[index-1].el.classList.remove('active');
												}
												scrollMaps[index].active = true;
												map.el.classList.add('active');
											} else {
												scrollMaps[index].active = false
												map.el.classList.remove('active');
											}
									});
								}
							}
						})
					]
				})
			],
		});
	}
}