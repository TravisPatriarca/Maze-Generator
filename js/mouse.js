class MouseController {
    constructor() {
        this.mousePressed = false;
        //this.mouseReleased = true;
    }

    pressed() {
        if (mouseIsPressed && !this.mousePressed) {
            this.mousePressed = true;
            //mouseReleased = true;
            return true
        }

        return false;
    }

    released() {
        if (!mouseIsPressed && this.mousePressed) {
            this.mousePressed = false;
            return true;
        }

        return false;
    }
}