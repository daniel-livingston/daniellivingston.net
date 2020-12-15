(() => {
	const canvasElement = document.getElementById("canvas");
	const ctx = canvasElement.getContext("2d");

	function generateCoordinates({
		density = 0.4,
		sx = 0,
		sy = 0,
		ex = window.innerWidth,
		ey = window.innerHeight,
	} = {}) {
		const coordinates = [];
		const numStars = density * (ex + ey - sx - sy);
		for (let i = 0; i < numStars; i++) {
			const x = Math.floor(Math.random() * ex - sx);
			const y = Math.floor(Math.random() * ey - sy);
			coordinates.push([x, y]);
		}
		return coordinates;
	}

	function drawStar(x, y) {
		const size = Math.floor(Math.random() * 2) + 1;
		const brightness = 255 * (size * 0.2 + 0.2);
		ctx.fillStyle = `rgba(${Math.floor(brightness / 3)}, ${Math.floor(
			brightness / 3
		)}, ${Math.floor(brightness / 3)}, 0.01)`;
		ctx.ellipse(x, y, size * 8, size * 8, 0, 0, 2 * Math.PI);
		ctx.fill();
		ctx.strokeStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
		ctx.beginPath();
		ctx.moveTo(x, y - size);
		ctx.lineTo(x, y + size);
		ctx.moveTo(x - size, y);
		ctx.lineTo(x + size, y);
		ctx.closePath();
		ctx.stroke();
	}

	function calcCanvasSize() {
		const width = window.innerWidth;
		const height = window.innerHeight;
		return [width, height];
	}

	function adjustCanvasSize(width, height) {
		canvasElement.setAttribute("width", width);
		canvasElement.setAttribute("height", height);
	}

	function handleCanvasSizing() {
		const dim = calcCanvasSize();
		adjustCanvasSize(dim[0], dim[1]);
	}

	function generateStarMap(sx, sy, ex, ey) {
		const coordinates = generateCoordinates({ density: 0.2, sx, sy, ex, ey });
		coordinates.forEach(([x, y]) => drawStar(x, y));
	}

	let width;
	window.onload = (e) => {
		width = window.innerWidth;
		handleCanvasSizing();
		generateStarMap();
	};

	window.onresize = (e) => {
		if (width === window.innerWidth) {
			return;
		}

		handleCanvasSizing();
		generateStarMap();
		width = window.innerWidth;
	};
})();
