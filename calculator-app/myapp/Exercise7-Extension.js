class Shape {
    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }

    calcPerimeter() {
        const perimeter = this.sides * this.sideLength;
        console.log(perimeter);
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super("square", 4);
        this.sideLength = sideLength;
    }

    calcArea() {
        const area = this.sideLength ** 2;
        console.log(area);
    }
}
const square = new Square(5);
square.calcPerimeter();
square.calcArea();
