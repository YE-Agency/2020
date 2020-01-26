import {Letter} from './Letter';

export class LetterManager {
	constructor(scene) {
		this.scene = scene;
		this.letterArray = [];
		this.letterCoord = {};
	}

	create(character, position) {
		let letter = new Letter(character, position);
		this.letterArray.push(letter);
		this.letterCoord[this.coordToKey(position.x, position.y)] = letter;
		letter.addToScene(this.scene);
	}

	get(x, y) {
		if (!this.has(x, y)) return undefined;
		return this.letterCoord[this.coordToKey(x, y)];
	}

	has(x, y) {
		return this.letterCoord.hasOwnProperty(this.coordToKey(x, y))
	}

	coordToKey(x, y) {
		return x + ":" + y;
	}

	all() {
		return this.letterArray;
	}
}