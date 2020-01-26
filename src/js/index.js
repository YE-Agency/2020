import {Application, Loader, Container, Rectangle} from 'pixi.js';
import {Globals, Settings, GridPresets} from './settings';
import {Vector} from './Math/Vector';
import {LetterManager} from './LetterManager';
import {Mouse} from './Mouse';
import {TextStyles} from './Styles';
import {discoverLettersInZone, spritesheetToTextureArray} from './Utils';

// Sources
import spritesheet from '../img/mouses.png';

Globals.container = document.querySelector("#app");
//noinspection JSCheckFunctionSignatures
Globals.app = new Application({
	width: Globals.container.offsetWidth,
	height: Globals.container.offsetHeight,
	antialias: false,
	transparent: true,
	autoStart: false,
	backgroundColor: "rgba(255, 255, 255, 0)"
});
const loadingSpan = document.querySelector(".loading span");

Globals.container.appendChild(Globals.app.view);

// Loading assets
// --------------------------------
Loader.shared
	.add("mouses", spritesheet)
	.on("progress", (loader) => {
		loadingSpan.innerHTML = loader.progress.toFixed(0);
	})
	.load(() => {
		// We let the loading screen a bit
		setTimeout(() => {
			document.body.classList.remove("game-loading");
			document.body.classList.add("game-ready");
			// We wait the fadeOut
			setTimeout(setup, 1500);
		}, 1000)
	});

function setup() {
	Globals.scene = new Container();
	Globals.letterManager = new LetterManager(Globals.scene);
	// Setup grid aspect
	// --------------------------------
	if (Globals.app.view.width <= 375) {
		Settings.grid = GridPresets.small;
	} else if (Globals.app.view.width > 500) {
		Settings.grid = GridPresets.large;
	}
	TextStyles.normal.fontSize = Settings.grid.font;
	TextStyles.strong.fontSize = Settings.grid.font;
	Settings.gridOffset.set(
		(Globals.app.view.width % Settings.grid.cell) / 2,
		(Globals.app.view.height % Settings.grid.cell) / 2
	);
	// Spritesheets
	// --------------------------------
	for (let key in Settings.spritesheets) {
		if (!Settings.spritesheets.hasOwnProperty(key)) continue;
		Settings.mouses.textures[key] = spritesheetToTextureArray(
			Loader.shared.resources['mouses'].texture.baseTexture,
			Settings.spritesheets[key].frames
		);
	}
	// Init letters
	// --------------------------------
	for (let y = 0, i = 0; (y + 1) * Settings.grid.cell < Globals.app.view.height; y++) {
		for (let x = 0; (x + 1) * Settings.grid.cell < Globals.app.view.width; x++) {
			Globals.letterManager.create(Settings.sentence.charAt(i), new Vector(x, y));
			i++;
			i = i < Settings.sentence.length ? i : 0;
		}
	}
	// Init engine
	// --------------------------------
	Globals.app.stage.interactive = true;
	Globals.app.stage.hitArea = new Rectangle(0, 0, Globals.app.view.width, Globals.app.view.height);
	Globals.app.stage.addChild(Globals.scene);
	Globals.startedAt = Date.now();
	Globals.app.ticker.add(loop);
	Globals.app.stage.on("pointerdown", (event) => {
		document.body.classList.remove("game-waiting");
		document.body.classList.add("game-running");
		let mouseKeys = Object.keys(Settings.spritesheets);
		let index = Math.floor(Math.random() * mouseKeys.length);
		if (Globals.mouses.length >= Settings.mouses.maxAmount) return;
		let mouse = new Mouse(event.data.global.x, event.data.global.y, mouseKeys[index]);
		mouse.generateExitPoint(Globals.app.view);
		mouse.addToScene(Globals.scene);
		Globals.mouses.push(mouse);
	});
	// Launch game
	// --------------------------------
	Globals.app.start();
	document.body.classList.add("game-waiting");
}

function loop() {
	// Update mouses
	Globals.mouses.forEach((mouse) => {
		if (mouse.disabled) return;
		mouse.update(Globals.app.ticker.deltaMS, Date.now() - Globals.startedAt);
		// Activate letter when a mouse hover it
		discoverLettersInZone(mouse, Settings.discoveryZones[2]);
	});
	// Prevent letters over-rendering
	if(Globals.frame % Settings.letterSkippedFrames === 0) {
        // Update letters
        Globals.letterManager.all().forEach(letter => {
            letter.update(Globals.app.ticker.deltaMS * Settings.letterSkippedFrames);
        });
    }
	Globals.frame++;
}