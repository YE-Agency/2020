import {AnimatedSprite} from "pixi.js";
import {Vector, pointToVector} from './Math/Vector';
import * as Utils from './Utils';
import {Globals, Settings} from './settings';

export class Mouse {
	constructor(x, y, mouseKey) {
		this.disabled = false;
		this.sprite = new AnimatedSprite(Settings.mouses.textures[mouseKey]);
		this.color = Settings.spritesheets[mouseKey].color;
		this.sprite.animationSpeed = .15;
		this.sprite.play();
		this.sprite.scale.set(
			Settings.grid.cell * Settings.grid.mouseSizeFactor / this.sprite.width,
			Settings.grid.cell * Settings.grid.mouseSizeFactor / this.sprite.height
		);
		// TODO: correct anchor for each mouse (with settings)
		this.sprite.anchor.set(.5, .6);
		this.position = this.sprite.position;
		this.position.set(x, y);
		this.width = this.sprite.width;
		this.height = this.sprite.height;
		this.hWidth = this.width / 2;
		this.hHeight = this.width / 2;
		this.exitPoint = new Vector();
		this.velocity = new Vector();
		this.speed = 1.5;
		this.target = {
			previous: new Vector(),
			current: new Vector(),
			force: new Vector(),
			createdAt: Date.now(),
			nextAt: Date.now()
		};
		this.angleCorrection = 40;

		this.generateTargetPoint();
		this.calculateVelocity();
	}

	calculateVelocity(deltaTime) {
		if (!deltaTime) return;
		let force = new Vector(pointToVector(this.position), this.target.current);
		force.normalize();
		force.multiply(deltaTime / (this.target.nextAt - this.target.createdAt));
		this.velocity.add(force);
		this.velocity.normalize();
	}

	update(deltaTime, time) {
		if (this.disabled) return;

		if (this.target.nextAt <= Date.now()) {
			this.generateTargetPoint();
		}

		this.calculateVelocity(deltaTime);

		// Rotate according to the movement direction
		if (this.velocity.y > 0) {
			this.sprite.angle = Math.acos(this.velocity.x) * (180 / Math.PI);
		} else {
			this.sprite.angle = 360 - ((Math.acos(this.velocity.x) * (180 / Math.PI)));
		}

		// Correct sprite rotation
		this.sprite.angle += this.angleCorrection;

		// Mouse walk movement
		this.sprite.angle += Math.cos((time / (1000 * (3 / this.speed))) * (180 / Math.PI)) * 1.5;

		this.position.set(
			this.position.x + (this.velocity.x * this.speed),
			this.position.y + (this.velocity.y * this.speed)
		);

		// Culling mouses outside the viewport
		if (!this.isInsideViewport()) {
			this.destroy();
		}
	}

	isInsideViewport() {
		if (this.position.x + (this.hWidth) < 0) {
			return false;
		} else if (this.position.y + (this.hHeight) < 0) {
			return false;
		} else if (this.position.x - (this.hWidth) > Globals.app.view.width) {
			return false;
		} else if (this.position.y - (this.hHeight) > Globals.app.view.height) {
			return false;
		}

		return true;
	}

	generateTargetPoint() {
		// Save the old target
		this.target.previous = this.target.current;

		// Set the new target
		this.target.current = pointToVector(this.position)
			.add(
				Utils.randomDirection().multiply(50 + (Math.random() * 50))
			);

		this.target.force = new Vector(this.target.previous, this.target.current);
		this.target.force.normalize();

		// Renew the counter
		this.renewTargetGenerationTime();
	}

	renewTargetGenerationTime() {
		this.target.nextAt = Date.now() + 500 + Math.round(Math.random() * 1000);
		this.target.createdAt = Date.now();
	}

	generateExitPoint(viewport) {
		let origin = new Vector(viewport.width / 2, viewport.height / 2), // create a local origin
			radius = origin.length() + this.width,
			angle = 2 * Math.PI * Math.random();

		this.exitPoint.set(Math.cos(angle), Math.sin(angle)); // redefine point
		this.exitPoint.multiply(radius); // scale to 1:1
		this.exitPoint.add(origin); // transform to vieport origin
	}

	destroy() {
		Globals.mouses.splice(Globals.mouses.indexOf(this), 1); // Clean memory
		this.disabled = true;
		this.sprite.visible = false;
		this.sprite.destroy();
	}

	addToScene(scene) {
		scene.addChild(this.sprite);
	}
}