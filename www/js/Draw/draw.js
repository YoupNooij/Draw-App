/**
 * 
 * @param {object} cvs 
 * @param {*} t 
 * @param {*} d 
 */
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