
'use strict';

var COLOURS = ['#FAF197', '#6DC2C2', '#F1BEBB', '#D83381', '#D83381'];
var NS = 'http://www.w3.org/2000/svg';
var CIRCLES = window.innerWidth > 600 ? 20 : 10;
var TIMER;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColour() {
    return COLOURS[getRandomInt(1, COLOURS.length) - 1];
}

function createBlur(i) {
    var f = document.createElementNS(NS, 'filter');
    var b = document.createElementNS(NS, 'feGaussianBlur');
    f.setAttributeNS(null, 'id', 'blur' + i);

    b.setAttributeNS(null, 'in', 'SourceGraphic');
    b.setAttributeNS(null, 'stdDeviation', getRandomInt(0, 5));

    f.appendChild(b);
    return f;
}

function createCircle(x, y, blur) {
    var c = document.createElementNS(NS, 'circle');
    c.setAttributeNS(null, 'cx', x);
    c.setAttributeNS(null, 'cy', y);
    c.setAttributeNS(null, 'r', 20);
    c.setAttributeNS(null, 'style', 'fill:' + getRandomColour());
    c.setAttributeNS(null, 'filter', 'url(#' + blur + ')');
    return c;
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
    var w = document.body.clientWidth;
    var h = document.body.clientHeight;
    var svg = createSVG(w, h);
    var circles = document.getElementById('circles');

    if(circles) {
        circles.remove();
    }

    for(var i =0; i < CIRCLES; i++) {
        var x = getRandomInt(0, w);
        var y = getRandomInt(0, h);
        var blur = createBlur(i);
        svg.appendChild(blur);
        svg.appendChild(createCircle(x, y, blur.id));
    }

    document.body.appendChild(svg);
}

TIMER = setInterval(drawCircles, 1000);

window.addEventListener("resize", function(e) {
    drawCircles();
}, false);