import {Vector} from './Math/Vector'
import * as PIXI from "pixi.js"
import {Globals, Settings} from './settings'

export function randomDirection() {
	let angle = Math.random() * Math.PI * 2;
	return new Vector(Math.cos(angle), Math.sin(angle)).normalize();
}

/**
 *
 * @param baseTexture PIXI.BaseTexture
 * @param data Array
 * @returns Array<PIXI.Texture>
 */
export function spritesheetToTextureArray(baseTexture, data) {
	let textures = [];
	data.forEach((frame => {
		textures.push(
			new PIXI.Texture(
				baseTexture,
				new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h),
				new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height),
				new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height)
			)
		);
	}));
	return textures;
}

/**
 *
 * @param mouse Mouse
 * @param zone Array
 */
export function discoverLettersInZone(mouse, zone) {
	let position = new Vector(
		Math.floor(mouse.position.x / Settings.grid.cell),
		Math.floor(mouse.position.y / Settings.grid.cell)
	);
	// First we check the center
	activateLetterIfExist(position.x, position.y, mouse);
	// Then we do the rest of the zone
	zone.forEach((deltaVector) => {
		activateLetterIfExist(position.x + deltaVector.x, position.y + deltaVector.y, mouse);
	});
}

/**
 *
 * @param x BigInteger
 * @param y BigInteger
 * @param mouse Mouse
 */
function activateLetterIfExist(x, y, mouse) {
	let letter = Globals.letterManager.get(x, y);
	if (letter) letter.fadeIn(mouse.color);
}