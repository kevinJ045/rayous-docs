
export const Sequence = [
	'Home',
	[
		'Get Started',
		'Get-Started',
		'Project-Structure',
	],
	[
		'Server',
		'Pages',
		'Layouts',
		'Routing',
		'Dynamic-Routes',
		'Middlewares-and-Global-Scope',
		'Building',
	],
	[
		'Client',
		'Styles',
		'Widget',
		'Component',
		'Controller',
		'Ref',
	],
	[
		'Widgets',
		"Text",
		"Button",
		"Link",
		"Span",

		"Image",

		"List",
		"ListItem",

		"Canvas",

		"InputWrapper",
		"Checkbox",
		"Radio",

		"LayoutBuilder",
		"Center",
		"Column",
		"Row",
		"Grid",

		"Container",
		
		"Selectbox",
		"SelectableOption",
		
		"Video",
		"Audio",

		"Table",
		"TableRow",
	],
	[
		"Custom Widgets",
		"Custom-Widgets",
		"Widget-Models",
	],
	"Standalone"
];

export function findNext(page: string, prev = false) : string {
	let seq: string[] = [];
	Sequence.forEach((t: string[]) => {
		if(Array.isArray(t)) {
			seq.push(...t.slice(0, t.length));
		} else {
			seq.push(t)
		}
	});
	let index = seq.indexOf(page);
	let nextIndex = prev ? index-1 : index+1;
	if(!prev && nextIndex >= seq.length) return null;
	if(prev && nextIndex < 0) return null;
	let nextItem = seq[nextIndex];
	
	return nextItem;
}
