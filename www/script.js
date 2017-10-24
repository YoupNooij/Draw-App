var Browser = {
    Update: function() {
        this.width = window.innerWidth ||
            root.clientWidth ||
            body.clientWidth;
        this.height = window.innerHeight ||
            root.clientHeight ||
            body.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.fraction = 1;
        this.bFraction = this.fraction * 100;
        this.tFraction = this.fraction * .01;
    }
}

function newButton(x, y, r, f, c) {
    var object = {};
    object.x = x; //x-as
    object.y = y; //y-as
    object.r = r; //width
    object.r2 = r * r;
    object.f = f; //fraction
    object.clicked = false;
    object.clicking = false;
    if (typeof c === "string")
        object.c = c; //als c string c=Color, anders c=#00FF00(blouw)
    else object.c = "#00FF00";
    object.click = function() {
        draw.r + 5;
        if (toolbar.p == "vertical") {
            if ((touch.x - (this.x + toolbar.x + buttons.x)) * (touch.x - (this.x + toolbar.x + buttons.x)) + (touch.y - (this.y + toolbar.y + buttons.y)) * (touch.y - (this.y + toolbar.y + buttons.y)) < this.r2) {
                this.clicked = true;
                this.f();
            }
        }
        if (toolbar.p == "horizontal") {
            if ((touch.x - (this.y + toolbar.x + buttons.x)) * (touch.x - (this.y + toolbar.x + buttons.x)) + (touch.y - (this.x + toolbar.y + buttons.y)) * (touch.y - (this.x + toolbar.y + buttons.y)) < this.r2) {
                this.clicked = true;
                this.f();
            }
        }
    }
    object.Draw = function() {
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
    toolbar.buttons.push(object);
    return object;
}

var requestAnimation = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

function GetId(id) { return document.getElementById(id) }

function SetCanvas(cvs, fullscreen, dimension) {
    if (fullscreen === undefined) fullscreen = true;
    if (dimension === undefined) dimension = "2d";
    var ctx = cvs.getContext(dimension);
    if (fullscreen) {
        cvs.style.position = "absolute";
        cvs.style.left = 0;
        cvs.style.top = 0;
    }
    cvs.ctx = ctx;
    cvs.fullscreen = fullscreen;
    return cvs;
}

/*set up stuff*/
function SetUp() {
    Browser.Update();
    Start();
    AnimationFrame();
}

/**loops to the background*/
function AnimationFrame() {
    Browser.Update();
    Update();
    requestAnimationFrame(AnimationFrame);
}

// popup openen \/
//                                                  #######TWEAK######
function drawBucket(cvs) {
    cvs.ctx.fillStyle = "#444444";
    cvs.ctx.fillRect(80, 40, 1 * Browser.bFraction, 1 * Browser.bFraction);
}
//                                                  #######TWEAK######

function CanvasSize(cvs, clear) {
    if (clear === undefined) clear = false;
    if (cvs.fullscreen) {
        if (Browser.width != cvs.width)
            cvs.width = Browser.width;
        if (Browser.height != cvs.height)
            cvs.height = Browser.height;
    }
    if (clear)
        cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    return cvs;
}
/*The function where it al starts*/
function Start() {
    canvas = SetCanvas(GetId("canvas"));
    toolbar = SetCanvas(GetId("toolbar"));
    canvas = CanvasSize(canvas);
    SetToolbar();

    DragToolbar = newButton(
        50, //x
        50, //y
        40, //radius
        function() {
            drag = true;
            if (toolbar.p == "vertical") {
                toolbar.x = touch.x - this.x;
                buttons.y = touch.y - this.y;
                toolbar.y = 0;
                buttons.x = 0;
            } else if (toolbar.p == "horizontal") {
                toolbar.y = touch.y - this.y;
                buttons.x = touch.x - this.x;
                toolbar.x = 0;
                buttons.y = 0;
            }
            if (touch.x < Browser.width / 4 &&
                touch.y > Browser.height / 4 &&
                touch.y < Browser.height / 4 * 3) {
                toolbar.p = "vertical";
            } else if (touch.x > Browser.width / 4 * 3 &&
                touch.y > Browser.height / 4 &&
                touch.y < Browser.height / 4 * 3) {
                toolbar.p = "vertical";
            } else if (touch.x > Browser.width / 4 &&
                touch.x < Browser.width / 4 * 3 &&
                touch.y < Browser.height / 4) {
                toolbar.p = "horizontal"
            } else if (touch.x > Browser.width / 4 &&
                touch.x < Browser.width / 4 * 3 &&
                touch.y > Browser.height / 4 * 3) {
                toolbar.p = "horizontal"
            }
        }
    );
    ClearButton = newButton(50, 150, 40,
        function() {
            canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        "pink");
    RadiusButton = newButton(50, 250, 40, function() {
            draw.r += 5; //in draw staat r gelijk aan huidige waarde +5 (+=)
        },
        "#F00");
    ColorButton = newButton(50, 350, 40, function() {
            draw.c = 'red';
        },
        "black");
    CameraButton = newButton(50, 450, 40, function() {
            Bucket = !Bucket
        },
        "#00F");
    toolbar.addEventListener('touchstart', Touching, false);
    toolbar.addEventListener('touchmove', Touching, false);
    toolbar.addEventListener("touchend", TouchEnd, false);
    toolbar.addEventListener("mousemove", Mousing, false);
    toolbar.addEventListener("mousedown", Click, false);
    toolbar.addEventListener("mouseup", TouchEnd, false);
}
/*The function where updates happen*/
function Update() {
    canvas = CanvasSize(canvas);
    toolbar = CanvasSize(toolbar, true)
    toolbar.Draw(toolbar);
    /*// Done in toolbar.Draw
    DragToolbar.Draw();
    ClearButton.Draw();
    RadiusButton.Draw();
    ColorButton.Draw();
    CameraButton.Draw();
    */
    if (Bucket) { drawBucket(toolbar) }
} // hier ook nieuwe buttons in zetten, deze loopt om klikken mogelijk te maken.

function Draw(cvs, t, d) {
    if (!drag) {
        cvs.ctx.lineWidth = d.r * 2;
        cvs.ctx.fillStyle = d.c;
        cvs.ctx.beginPath();
        cvs.ctx.arc(t.lx, t.ly, d.r, 0, Math.PI * 2, true);
        cvs.ctx.arc(t.x, t.y, d.r, 0, Math.PI * 2, true);
        cvs.ctx.fill();
        cvs.ctx.closePath();
        cvs.ctx.beginPath();
        cvs.ctx.moveTo(t.lx, t.ly);
        cvs.ctx.lineTo(t.x, t.y);
        cvs.ctx.strokeStyle = d.c;
        cvs.ctx.stroke();
        cvs.ctx.closePath();
    }
}

function Touching(e) {
    if (!(!click && drag)) {
        click = true;
        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var t = e.touches[0];
                if (touch.x !== undefined && touch.lx !== undefined && touch.y !== undefined && touch.ly !== undefined) {
                    touch.lx = touch.x;
                    touch.ly = touch.y;
                } else {
                    touch.lx = t.pageX - t.target.offsetLeft;
                    touch.ly = t.pageY - t.target.offsetTop;
                }
                touch.x = t.pageX - t.target.offsetLeft;
                touch.y = t.pageY - t.target.offsetTop;
            }
        }
        if (touch.x > toolbar.x && touch.x < toolbar.x + toolbar.w && touch.y > toolbar.y && touch.y < toolbar.y + toolbar.h) {
            var m = toolbar.buttons.length;
            for (var i = 0; i < m; i++) {
                toolbar.buttons[i].click();
            }
        } else {
            Draw(canvas, touch, draw);
        }
    }
    // Prevent a scrolling action as a result of this touchmove triggering.
    e.preventDefault();
}

function Mousing(e) {
    if (!(!click && drag)) {
        if (click) {
            if (touch.x !== undefined && touch.lx !== undefined && touch.y !== undefined && touch.ly !== undefined) {
                touch.lx = touch.x;
                touch.ly = touch.y;
            } else {
                touch.lx = e.clientX;
                touch.ly = e.clientY;
            }
            touch.x = e.clientX;
            touch.y = e.clientY;
        }
        if (touch.x > toolbar.x && touch.x < toolbar.x + toolbar.w && touch.y > toolbar.y && touch.y < toolbar.y + toolbar.h) {
            var m = toolbar.buttons.length;
            for (var i = 0; i < m; i++) {
                toolbar.buttons[i].click();
            }
        } else {
            Draw(canvas, touch, draw);
        }
    }
}

function Click(e) {
    if (!(!click && drag)) {
        click = true;
        if (touch.x !== undefined && touch.lx !== undefined && touch.y !== undefined && touch.ly !== undefined) {
            touch.lx = touch.x;
            touch.ly = touch.y;
        } else {
            touch.lx = e.clientX;
            touch.ly = e.clientY;
        }
        touch.x = e.clientX;
        touch.y = e.clientY;

        if (touch.x > toolbar.x && touch.x < toolbar.x + toolbar.w && touch.y > toolbar.y && touch.y < toolbar.y + toolbar.h) {
            var m = toolbar.buttons.length;
            for (var i = 0; i < m; i++) {
                toolbar.buttons[i].click();
            }
        } else {
            Draw(canvas, touch, draw);
        }
    }
}

function TouchEnd() {
    touch.x = undefined;
    touch.y = undefined;
    touch.lx = undefined;
    touch.ly = undefined;
    if (click) click = false;
}

function SetToolbar() {
    toolbar = CanvasSize(toolbar, true);
    toolbar.x = 0;
    toolbar.y = 0; //start de toobar op x0, y0
    toolbar.w = Browser.bFraction;
    toolbar.h = toolbar.height;
    toolbar.p = "vertical";
    toolbar.c = "#666"; //toolbar background color
    toolbar.s = 40 //animation speed toolbar 1 is snel 1000 is langzaam
    toolbar.d = "rgba(0, 0, 0, .3)"; //background color when draging
    toolbar.buttons = [];
    toolbar.Draw = function(cvs) {
        if (drag) {
            cvs.ctx.fillStyle = toolbar.d
            cvs.ctx.fillRect(0, 0, Browser.width, Browser.height);
        }

        cvs.ctx.fillStyle = toolbar.c;
        if (toolbar.p == "vertical") {
            toolbar.w = Browser.bFraction;
            toolbar.h = Browser.height;
            cvs.ctx.fillRect(toolbar.x, toolbar.y, toolbar.w, toolbar.h); //kleurt de gevormde toobar in met #666 fillStyle
        } else if (toolbar.p == "horizontal") {
            toolbar.w = Browser.width;
            toolbar.h = Browser.bFraction;
            cvs.ctx.fillRect(toolbar.x, toolbar.y, toolbar.w, toolbar.h); //kleurt de gevormde toobar in met #666 fillStyle
        }
        var totalButtons = toolbar.buttons.length;
        for (var i = 0; i < totalButtons; i++) {
            toolbar.buttons[i].Draw();
        }

        //animation
        if (!click && drag) {
            if (toolbar.p == "vertical") {
                if (toolbar.x <= Browser.centerX - toolbar.w / 2 && toolbar.x > -.5) {
                    moveToolbar.x = -.5 - toolbar.x;
                    toolbar.x += moveToolbar.x / toolbar.s;
                } else if (toolbar.x > Browser.centerX - toolbar.w / 2 && toolbar.x < Browser.width - toolbar.w + .5) {
                    moveToolbar.x = Browser.width - toolbar.w - toolbar.x;
                    toolbar.x += moveToolbar.x / toolbar.s;
                }
                if (toolbar.x < 0)
                    toolbar.x = 0;
                if (toolbar.x > Browser.width - toolbar.w)
                    toolbar.x = Browser.width - toolbar.w;
                if (toolbar.x > -.5 &&
                    toolbar.x <= 0 ||
                    toolbar.x > Browser.width - toolbar.w - .5 &&
                    toolbar.x <= Browser.width - toolbar.w
                ) drag = false;
            } else if (toolbar.p == "horizontal") {
                if (toolbar.y <= Browser.centerY - toolbar.h / 2 && toolbar.y > -.5) {
                    moveToolbar.y = -.5 - toolbar.y;
                    toolbar.y += moveToolbar.y / toolbar.s;
                } else if (toolbar.y > Browser.centerY - toolbar.h / 2 && toolbar.y < Browser.height - toolbar.h + .5) {
                    moveToolbar.y = Browser.height - toolbar.h - toolbar.y;
                    toolbar.y += moveToolbar.y / toolbar.s;
                }
                if (toolbar.y < 0)
                    toolbar.y = 0;
                if (toolbar.y > Browser.height - toolbar.h)
                    toolbar.y = Browser.height - toolbar.h;
                if (toolbar.y > -.5 &&
                    toolbar.y <= 0 ||
                    toolbar.y > Browser.height - toolbar.h - .5 &&
                    toolbar.y <= Browser.height - toolbar.h
                ) drag = false;
            }
        } else if (!click && !drag) {
            if (toolbar.p == "vertical") {
                if (toolbar.x < 0 || toolbar.x < Browser.centerX)
                    toolbar.x = 0;
                if (toolbar.x > Browser.width - toolbar.w || toolbar.x > Browser.centerX)
                    toolbar.x = Browser.width - toolbar.w;
            } else if (toolbar.p == "horizontal") {
                if (toolbar.y < 0 || toolbar.y < Browser.centerY)
                    toolbar.y = 0;
                if (toolbar.y > Browser.height - toolbar.h || toolbar.y > Browser.centerY)
                    toolbar.y = Browser.height - toolbar.h;
            }
        }
    }
}

// The variables i need globaly
var canvas, toolbar, click, drag = false,
    Bucket = false,
    draw = {
        r: 10,
        c: 'black'
    },
    touch = {
        x: undefined,
        y: undefined,
        lx: undefined,
        ly: undefined
    },
    moveToolbar = {
        x: 0,
        y: 0
    },
    buttons = {
        x: 0,
        y: 0
    }

SetUp();