function HeatField(numCols, numRows) {
	var HEAT_DIFFUSION_TIME_STEP = 10, // Milliseconds
		HEAT_DIFFUSION_COEFF = 2 / 1000 * HEAT_DIFFUSION_TIME_STEP; // Per second

	var HEAT_DIFFUSION_MATRIX = [
	    [ 1/16, 1/8, 1/16 ], 
	    [ 1/8, 1/4, 1/8 ], 
	    [ 1/16, 1/8, 1/16 ]
	];

	var rows = Array.apply(null, new Array(numRows)).map(function () {
		return Array.apply(null, new Array(numCols)).map(function () {
			return 0;
		});
	});

	for (var i = 0; i < numCols * numRows; i++) {
		rows[Math.floor(Math.random() * (numRows - 2)) + 1][Math.floor(Math.random() * (numCols - 2)) + 1] = Math.random();
	}

	var buffer = Array.apply(null, new Array(numRows)).map(function () {
		return Array.apply(null, new Array(numCols)).map(function () {
			return 0;
		});
	});

	var lastTime;

	this.applyTime = function (currentTime) {
		if (!lastTime) {
			lastTime = currentTime;
		}

		var elapsed = currentTime - lastTime;

		lastTime = currentTime;

		if (elapsed > 0) {
			do {
				for (var rowIdx = 1; rowIdx < numRows - 1; rowIdx++) {
					for (var colIdx = 1; colIdx < numCols - 1; colIdx++) {
						var cellHeat = rows[rowIdx][colIdx],
							averageHeat = 0;

						for (var matRowIdx = 0; matRowIdx < 3; matRowIdx++) {
							for (var matColIdx = 0; matColIdx < 3; matColIdx++) {
								averageHeat +=
									rows[rowIdx + matRowIdx - 1][colIdx + matColIdx - 1]
									* HEAT_DIFFUSION_MATRIX[matRowIdx][matColIdx];
							}
						}

						buffer[rowIdx][colIdx] = cellHeat + (averageHeat - cellHeat) * HEAT_DIFFUSION_COEFF;
					}
				}

				elapsed -= HEAT_DIFFUSION_TIME_STEP;
			} while (elapsed > 0);

			var swap = rows;
			rows = buffer;
			buffer = swap;
		}
	};

	this.getRows = function () {
		return rows;
	};
}