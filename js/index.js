window.onload = () => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = 400;
	canvas.height = window.innerHeight;

	let backgroundImage;
	let lifeImage;
	let life = 3;
	let lifeX = 0;
	let player;
	let playerX = 190;
	let playerY = 690;
	
	let bulletCheck = false;

	const keyArray = [];

	const keyCheck = () => {
		if(keyArray["ArrowRight"]) {
			if(playerX >= canvas.width - 38) return;

			return playerX += 3;
		};

		if(keyArray["ArrowLeft"]) {
			if(playerX <= 0) return;

			return playerX -= 3;
		};
	};

	const imageInitialize = () => {
		backgroundImage = new Image();
		backgroundImage.src = "image/main.png";

		player = new Image();
		player.src = "image/rocket.png";

		lifeImage = new Image();
		lifeImage.src = "image/rocket.png";
	};

	imageInitialize();

	const drawBackground = () => ctx.drawImage(backgroundImage, 0, 0);
	const drawPlayer = () => ctx.drawImage(player, playerX, playerY);

	const drawLife = function() {
		for(let i = 0; i < life; i++) {
			ctx.drawImage(lifeImage, lifeX, 840);

			lifeX += 40;
		}

		return lifeX = 0;
	};

	const draw = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		keyCheck();
		drawBackground();
		drawPlayer();
		drawLife();
	};

	let attackCooltime = 0;

	setInterval(() => {
		if(attackCooltime <= 0) return;

		attackCooltime -= 1;
	}, 1000);

	function drawBullet() {
		if(attackCooltime === 0) {
			attackCooltime = 3;

			const bulletImage = new Image(0, 25);
			bulletImage.src = "image/bullet.png";

			let bulletX = playerX + 17;
			let bulletY = playerY;

			const bulletMove = setInterval(() => {
				bulletY -= 3;

				const bulletCanvas = document.createElement("canvas");
				const bulletCtx = bulletCanvas.getContext("2d");

				bulletCtx.drawImage(bulletImage, 0, 0);

				ctx.drawImage(bulletCanvas, bulletX, bulletY);
			}, 0);

			if(bulletY <= 0) {
				clearInterval(bulletMove);
				document.removeChild(bulletCanvas);

				bulletY = playerY;
			};
		};
	};

	window.addEventListener("keydown", ({ key }) => {
		if(key === " ") drawBullet();

		keyArray[key] = true;
	});
	window.addEventListener("keyup", ({ key }) => {
		keyArray[key] = false;
	});

	setInterval(draw, 10);
};