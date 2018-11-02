(function(d) {
	"use strict";

	let fieldMatrix 	 = [],
			fieldSize 		 = 3,
			currentPlayer  = null,
			gameElem 			 = d.querySelector(".tic-tac-toe"),
			gameStatusElem = d.querySelector(".game-status"),
			fieldClass     = "game-field",
			rowClass 			 = "game-field__row",
			cellClass 		 = "game-field__cell",
			gameStarted 	 = false;	

	function createField(fm, container = d.body, size = 3, fieldClass = "field", rowClass = "row", cellClass = "cell") {
		try {
			if (size > 5 || size < 2) {
				throw new Error("The size of the field is incorrect");
			}

			let fieldElem = createDOMElem("div", fieldClass);

			for (let row = 0; row < size; row++) {
				let rowElem = createDOMElem("div", rowClass);
				fm.push([]);

				for (let cell = 0; cell < size; cell++) {
					let cellElem = createDOMElem("div", cellClass, "free_cell");
					rowElem.appendChild(cellElem);
					fm[row].push("");
				}

				fieldElem.appendChild(rowElem);
			}

			container.appendChild(fieldElem);
		} catch(err) {
			console.error(err.message);
		}
	}
	createField(fieldMatrix, gameElem, fieldSize, fieldClass, rowClass, cellClass);
	let fieldElem = d.querySelector(`.${fieldClass}`);

	function updateFieldMatrix(fm) {
		let rowElems  = fieldElem.querySelectorAll(`.${rowClass}`);

		for (let row = 0; row < rowElems.length; row++) {
			let cellElems = rowElems[row].querySelectorAll(`.${cellClass}`),
					cellsType = Array.prototype.map.call(cellElems, cell => cell.classList[1]);

			for (let col = 0; col < cellElems.length; col++) {
				if (cellsType[col] == "free_cell") {
					fieldMatrix[row][col] = "";
				} else if (cellsType[col] == "x_cell") {
					fieldMatrix[row][col] = "X";
				} else if (cellsType[col] == "o_cell") {
					fieldMatrix[row][col] = "O";
				}
			}
		}
	}

})(document);