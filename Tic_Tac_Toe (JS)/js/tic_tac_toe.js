(function(d) {
	"use strict";

	let fieldMatrix 	 = [],
			fieldSize 		 = 3,
			currentPlayer  = null,
			gameElem 			 = d.querySelector(".tic-tac-toe"),
			gameStatusElem = d.querySelector(".game-status"),
			gameStarted 	 = false,
			fieldClass     = "game-field",
			rowClass 			 = "game-field__row",
			cellClass 		 = "game-field__cell";

	function createField(fm, container = d.body, size = 3, fieldClass = "field", rowClass = "row", cellClass = "cell") {
		try {
			if (size > 5 || size < 2) {
				throw new Error("The size of the field is less than 2 or bigger than 5");
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
					cellsType = Array.prototype.map.call(cellElems, cell => cell.classList[1].toLowerCase());

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

	function winCheck() {
		let checkLine = function(fm, player, sRow, sCol, eRow, eCol) {
			let inLine = 0;

			for (let row = sRow; row < eRow; row++) {
				for (let col = sCol; col < eCol; col++) {
					if (fm[row][col] == player) {
						inLine++;
					}
				}
			}

			return inLine == fm.length;
		}

		let checkDiagonal = function(fm, player, sIndex, eIndex, reverse = false) {
			let inLine = 0,
					fmTemp = fm.slice();

			if (reverse) {
				fmTemp.reverse();
			}		

			for (let i = sIndex; i < eIndex; i++) {
				if (fmTemp[i][i] == player) {
					inLine++;
				}
			}

			return inLine == fm.length; 
		}

		return function(fm, player) { // checkForWin function
			let results = [];

			for (let i = 0; i < fm.length; i++) {
				let v = checkLine(fm, player, 0, i, fm.length, i + 1),
						h = checkLine(fm, player, i, 0, i + 1, fm.length);

				results.push(v, h);		
			}

			let d1 = checkDiagonal(fm, player, 0, fm.length),
					d2 = checkDiagonal(fm, player, 0, fm.length, true);

			results.push(d1, d2);

			return results.some( res => !!res )		
		}
	}
	let checkWin = winCheck();

	function switchPlayer() {
		try {
			if (!gameStarted) {
				throw new Error("The game did not started!");
			}

			if (currentPlayer == "X") {
				currentPlayer = "O";
			} else {
				currentPlayer = "X";
			}
		} catch (err) {
			console.error(err.message);
		}	
	}
})(document);