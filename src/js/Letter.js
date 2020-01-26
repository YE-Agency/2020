import {Text} from 'pixi.js'
import {TextStyles} from './Styles';
import {Settings} from './settings'

export class Letter {
	constructor(character, position) {
		this.active = true;
		this.animating = false;
		this.transitionMS = 750;
		this.character = character;
		this.text = new Text(this.character, TextStyles.normal);
		this.text.anchor.set(.5, .5);
		this.text.visible = false;
		this.text.alpha = 0;
		this.position = this.text.position;
		this.position.set(
			(position.x * Settings.grid.cell) + (Settings.grid.cell / 2) + Settings.gridOffset.x,
			(position.y * Settings.grid.cell) + (Settings.grid.cell / 2) + Settings.gridOffset.y
		);
	}

	update(deltaTime) {
		// Other optimization
		if (this.active) {
			// ...
		}
		// Animation
		if (this.text.visible || this.animating) {
			// Fade In
			if (this.text.alpha < 1) {
				this.text.alpha += deltaTime / this.transitionMS;
				this.text.text = Settings.sentence.charAt(
				    Math.floor(Math.random() * Settings.sentence.length)
                );
			}
			// Fade In completed, stop animation
			if (this.text.alpha >= 1) {
				this.show();
			}
		}
	}

	fadeIn(color) {
		this.text.style = TextStyles.normal.clone();
		this.text.style.fill = color;
		this.active = false;
		this.animating = true;
		this.text.visible = true;
		this.text.alpha = 0;
	}

	show() {
		this.active = false;
		this.animating = false;
		this.text.visible = true;
		this.text.alpha = 1;
		this.text.text = this.character;
	}

	addToScene(scene) {
		scene.addChild(this.text);
	}
}