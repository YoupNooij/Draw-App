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