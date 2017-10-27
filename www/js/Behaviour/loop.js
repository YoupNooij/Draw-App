var requestAnimation = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

/**loops to the background*/
function AnimationFrame() {
    Browser.Update();
    Update();
    requestAnimationFrame(AnimationFrame);
}