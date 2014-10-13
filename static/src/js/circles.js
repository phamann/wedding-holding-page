(function() {
    'use strict';

    var COLOURS = ['#FAF197', '#6DC2C2', '#F1BEBB', '#D83381', '#D83381'];
    var NS = 'http://www.w3.org/2000/svg';
    var CIRCLES = window.innerWidth < 600 ? 5 : 10;
    var W = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var H = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomColour() {
        return COLOURS[getRandomInt(1, COLOURS.length) - 1];
    }

    function Circle() {
        this.x = getRandomInt(0, W);
        this.y = getRandomInt(0, H);
        this.fill = getRandomColour()
        this.el = document.createElementNS(NS, 'circle');
    }

    Circle.prototype.updateAttr = function(key, val) {
        this.el.setAttributeNS(null, key, val);
    }

    Circle.prototype.getEl = function() {
        this.updateAttr('cx', this.x);
        this.updateAttr('cy', this.y);
        this.updateAttr('r', 20);
        this.updateAttr('style', 'fill:' + this.fill);
        return this.el;
    }

    function createSVG(w, h) {
        var svg = document.createElementNS(NS, "svg");
        svg.setAttributeNS(null, 'id', 'circles');
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, 'height', '100%');
        svg.setAttributeNS(null, 'style', 'position:absolute; top: 0; left: 0;');
        return svg;
    }


    function drawCircles() {
        var svg = createSVG(W, H);
        var circles = document.getElementById('circles');

        if(circles) {
            circles.remove();
        }

        for(var i =0; i < CIRCLES; i++) {
            var c = new Circle();
            svg.appendChild(c.getEl());
        }

        document.body.appendChild(svg);
    }

    setInterval(drawCircles, 1000);

    window.addEventListener("resize", function(e) {
        drawCircles();
    }, false);

})();
