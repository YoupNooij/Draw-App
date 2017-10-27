window.addEventListener('touchstart', Touching, false);
window.addEventListener('touchmove', Touching, false);
window.addEventListener("touchend", TouchEnd, false);
window.addEventListener("mousemove", Mousing, false);
window.addEventListener("mousedown", Click, false);
window.addEventListener("mouseup", TouchEnd, false);

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