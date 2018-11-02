/* My function to quickly create DOM elements */

function createDOMElem(tag, ...classes) {
	let elem = document.createElement(tag);
	classes.forEach( classN => elem.classList.add(classN) );

	return elem;
}