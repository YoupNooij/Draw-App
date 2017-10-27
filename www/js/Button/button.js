function Button(x, y, r, f, c) {
    this.x = x; //x-as
    this.y = y; //y-as
    this.r = r; //width
    this.rr = r * r;
    this.f = f; //fraction
    this.clicked = false;
    this.clicking = false;
    if (typeof c === "string")
        this.c = c; //als c string c=Color, anders c=#00FF00(blouw)
    else this.c = "#00FF00";
    this.click = function() {
        draw.r + 5;
        if (toolbar.p == "vertical") {
            if ((touch.x - (this.x + toolbar.x + buttons.x)) * (touch.x - (this.x + toolbar.x + buttons.x)) + (touch.y - (this.y + toolbar.y + buttons.y)) * (touch.y - (this.y + toolbar.y + buttons.y)) < this.rr) {
                this.clicked = true;
                this.f();
            }
        }
        if (toolbar.p == "horizontal") {
            if ((touch.x - (this.y + toolbar.x + buttons.x)) * (touch.x - (this.y + toolbar.x + buttons.x)) + (touch.y - (this.x + toolbar.y + buttons.y)) * (touch.y - (this.x + toolbar.y + buttons.y)) < this.rr) {
                this.clicked = true;
                this.f();
            }
        }
    }
    this.Draw = function() {
        if (!click) this.clicked = false;
        if (toolbar.p == "vertical") {
            toolbar.ctx.beginPath();
            toolbar.ctx.arc(
                this.x + toolbar.x + buttons.x,
                this.y + toolbar.y + buttons.y,
                this.r,
                0,
                2 * Math.PI,
                false);
            var grd = toolbar.ctx.createRadialGradient(
                this.x + toolbar.x + buttons.x,
                this.y + toolbar.y + buttons.y,
                this.r * .3,
                this.x + toolbar.x + buttons.x,
                this.y + toolbar.y + buttons.y,
                this.r);
            if (this.clicked) {
                grd.addColorStop(0, this.c);
                grd.addColorStop(.75, this.c);
                grd.addColorStop(.8, "white");
                grd.addColorStop(1, this.c);
            } else {
                grd.addColorStop(0, this.c);
                grd.addColorStop(.75, this.c);
                grd.addColorStop(.8, toolbar.c);
                grd.addColorStop(1, this.c);
            }
            toolbar.ctx.fillStyle = grd;
            toolbar.ctx.fill();
            toolbar.ctx.closePath();
        } else if (toolbar.p == "horizontal") {
            toolbar.ctx.beginPath();
            toolbar.ctx.arc(
                this.y + toolbar.x + buttons.x,
                this.x + toolbar.y + buttons.y,
                this.r,
                0,
                2 * Math.PI,
                false);
            var grd = toolbar.ctx.createRadialGradient(
                this.y + toolbar.x + buttons.x,
                this.x + toolbar.y + buttons.y,
                this.r * .3,
                this.y + toolbar.x + buttons.x,
                this.x + toolbar.y + buttons.y,
                this.r);
            if (this.clicked) {
                grd.addColorStop(0, this.c);
                grd.addColorStop(.75, this.c);
                grd.addColorStop(.8, "white");
                grd.addColorStop(1, this.c);
            } else {
                grd.addColorStop(0, this.c);
                grd.addColorStop(.75, this.c);
                grd.addColorStop(.8, toolbar.c);
                grd.addColorStop(1, this.c);
            }
            toolbar.ctx.fillStyle = grd;
            toolbar.ctx.fill();
            toolbar.ctx.closePath();
        }
    }
    toolbar.buttons.push(this);
}