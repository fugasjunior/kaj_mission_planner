export default class NatoMarker {

    constructor() {
        this.element = document.createElement("div");
        this.svg = `<svg xmlns="http://www.w3.org/2000/svg"`;
    }

    withSize(size) {
        this.svg += `style="width: ${size}px"`;
        return this;
    }

    withSide(side) {
        this.side = side;

        if (side === "friendly") {
            this.svg += `
                viewBox="0 0 600 400">
                <path class="frame frame--friendly" d="M 5,5 H 595 V 395 H 5 Z" />
                <path class="fill fill--friendly" d="M 5,5 H 595 V 395 H 5 Z"/>    
            `
        } else if (side === "hostile") {
            this.svg += `
                viewBox="0 0 600 600">
                <path class="frame frame--hostile" d="M 7,300 300,7 593,300 300,593 Z"/>
                <path class="fill fill--hostile" d="M 6.999995,300 300,7 593,300 300,593 Z"/>
            `
        }
        return this;
    }

    withType(type) {
        if (type === "armor") {
            this.svg += `<path class="shape shape--armor"
                    d="m 210.81531,298.2765 c -54.27662,0 -98.2765,-43.99988 -98.2765,-98.2765 0,-54.27661 43.99988,
                    -98.2765 98.2765,-98.2765 h 178.36938 c 54.27662,0 98.2765,43.99989 98.2765,98.2765 0,54.27662 
                    -43.99988,98.2765 -98.2765,98.2765 z" 
                    ${this.side === "hostile" ? "transform='translate(0 100)'" : ""}
                    />`

        } else if (type === "infantry") {
            if (this.side === "friendly") {
                this.svg += `
                    <path class="shape shape--infantry" d="M 595,395 5,5"/>
                    <path class="shape shape--infantry" d="M 595,5 5,395"/>`;
            } else if (this.side === "hostile") {
                this.svg += ` 
                    <path class="shape shape--infantry" d="m 446.5,446.5 -293,-293"/>
                    <path class="shape shape--infantry" d="m 446.5,153.5 -293,293"/>`;
            }

        } else if (type === "fixedwing") {
            this.svg += `<path class="shape shape-fixedwing"
                    d="m 394.47775,143.54479 c 33.96844,-20.29784 81.02658,25.27586 81.02658,56.45521 0,31.17935 
                    -47.05814,76.75305 -81.02658,56.45521 L 205.52226,143.54479 c -33.96842,-20.29784 -81.0266,25.27586 
                    -81.0266,56.45521 0,31.17935 47.05818,76.75305 81.0266,56.45521 z"
                    ${this.side === "hostile" ? "transform='translate(0 100)'" : ""}
                    />`
        }
        return this;
    }

    build() {
        this.svg += `</svg>`;
        this.element.innerHTML = this.svg;
        return this.element;
    }
}