(function(d) {
	"use strict";
	console.log(!!d);

	let field 				 = [],
			fieldSize 		 = 3,
			currentPlayer  = null,
			gameElem 			 = d.querySelector(".tic-tac-toe"),
			gameStatusElem = d.querySelector(".game-status"),
			rowClass 			 = "game-field__row",
			cellClass 		 = "game-field__cell",
			gameStarted 	 = false;	

	function createField(container = d.body, size = 3, fieldClass = "field", rowClass = "row", cellClass = "cell") {
		try {
			if (size > 5 || size < 2) {
				throw new Error("The size of the field is incorrect");
			}

			let fieldElem = createDOMElem("div", fieldClass);

			for (let row = 0; row < size; row++) {
				let rowElem = createDOMElem("div", rowClass);
				field.push([]);

				for (let cell = 0; cell < size; cell++) {
					let cellElem = createDOMElem("div", cellClass, "free_cell");
					rowElem.appendChild(cellElem);
					field[row].push("");
				}

				fieldElem.appendChild(rowElem);
			}

			container.appendChild(fieldElem);
		} catch(err) {
			console.error(err.message);
		}
	}
})(document);