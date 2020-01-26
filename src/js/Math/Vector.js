export class Vector {
    constructor(x, y) {
        if (x instanceof Vector && y instanceof Vector) {
            this.x = y.x - x.x;
            this.y = y.y - x.y;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
        this.tLength = 0;
        this.length(true);
    }

    set(x, y) {
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
        this.length(true);
        return this;
    }

    add(x, y) {
        if (x instanceof Vector) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x += x;
            this.y += y;
        }
        this.length(true);
        return this;
    }

    sub(x, y) {
        if (x instanceof Vector) {
            this.x -= x.x;
            this.y -= x.y;
        } else {
            this.x -= x;
            this.y -= y;
        }
        this.length(true);
        return this;
    }

    multiply(a) {
        if (a instanceof Vector) {
            this.x *= a.x;
            this.y *= a.y;
        } else {
            this.x *= a;
            this.y *= a;
        }
        this.length(true);
        return this;
    }

    rotate(angle) {
        this.set(
            (this.x * Math.cos(angle)) - (this.y * Math.sin(angle)),
            (this.x * Math.sin(angle)) + (this.y * Math.cos(angle))
        )
        this.length(true);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    length(force = false) {
        if (this.x === 0 && this.y === 0) {
            this.tLength = 0;
            return 0;
        }

        if (force) {
            this.tLength = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

        return this.tLength;
    }

    normalize() {
        if (this.length() === 0) return this;
        this.multiply(1 / this.length())
        this.length(true);
        return this;
    }

    toString() {
        return "Vector (" + this.x + "," + this.y + ")";
    }
}

export function pointToVector(point) {
    return new Vector(point.x, point.y);
}