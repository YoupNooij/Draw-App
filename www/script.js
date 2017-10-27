// The variables i need globaly
var canvas, toolbar,
    click, drag = false,
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

function GetId(id) { return document.getElementById(id) }

// popup openen \/
//                                                  #######TWEAK######
function drawBucket(cvs) {
    cvs.ctx.fillStyle = "#444444";
    cvs.ctx.fillRect(80, 40, 1 * Browser.bFraction, 1 * Browser.bFraction);
}
//                                                  #######TWEAK######

/*The function where it al starts*/
function Start() {
    canvas = NewCanvas(GetId("canvas"), true);
    toolbar = NewCanvas(GetId("toolbar"), true);
    UpdateCvs(canvas);
    SetToolbar();

    DragToolbar = new Button(
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
    ClearButton = new Button(50, 150, 40,
        function() {
            canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        "pink");
    RadiusButton = new Button(50, 250, 40, function() {
            draw.r += 5; //in draw staat r gelijk aan huidige waarde +5 (+=)
        },
        "#F00");
    ColorButton = new Button(50, 350, 40, function() {
            draw.c = 'red';
        },
        "black");
    CameraButton = new Button(50, 450, 40, function() {
            Bucket = !Bucket
        },
        "#00F");
}

/*The function where updates happen*/
function Update() {
    UpdateCvs(canvas);
    UpdateCvs(toolbar, true)
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

function SetToolbar() {
    UpdateCvs(toolbar, true);
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

SetUp();