var NUM_COLS = 32,
	NUM_ROWS = 32,
	TILE_SIZE = 16;

window.onload = function () {
	var heatField = new HeatField(NUM_COLS, NUM_ROWS);

	var heatFieldCanvas = document.getElementById('heatField'),
		heatFieldCtx = heatFieldCanvas.getContext('2d');

	heatFieldCanvas.width = NUM_COLS * TILE_SIZE;
	heatFieldCanvas.height = NUM_ROWS * TILE_SIZE;

	heatFieldCtx.scale(TILE_SIZE, TILE_SIZE);

	var stageCanvas = document.getElementById('stage'),
		stageCtx = stageCanvas.getContext('2d');

	stageCanvas.width = NUM_COLS * TILE_SIZE;
	stageCanvas.height = NUM_ROWS * TILE_SIZE;

	stageCtx.scale(TILE_SIZE, TILE_SIZE);

	function compToHex(c) {
		return Math.floor(c * 255 + 256).toString(16).substr(-2);
	}
	function rgbToHex(r, g, b) {
		return '#' + compToHex(r) + compToHex(g) + compToHex(b);
	}

	function renderHeatField() {
		heatField.getRows().forEach(function (row, rowIdx) {
			row.forEach(function (heat, colIdx) {
				heatFieldCtx.fillStyle = heat < 0.5
					? rgbToHex(0, 0, (0.5 - heat) * 2)
					: rgbToHex((heat - 0.5) * 2, 0, 0);

				heatFieldCtx.fillRect(colIdx, rowIdx, 1, 1);
			});
		});
	}

	function render(currentTime) {
		heatField.applyTime(currentTime);

		renderHeatField();

		requestAnimationFrame(render);
	}

	window.requestAnimationFrame(render);
};