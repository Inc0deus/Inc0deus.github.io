function buttonTest() {
    alert("Hello, World!")
}

let w = 400;
let h = 400;

let r = 20;
let x = w/2, y = h/2;
let vx, vy;
let vmag = 5;

function setup() {
    createCanvas(w, h);

    vx = random(-1, 1);
    vy = random(-1, 1);
    let inv_mag = 1/sqrt(vx*vx + vy*vy);
    vx *= vmag*inv_mag;
    vy *= vmag*inv_mag;
}

function draw() {
    background(200);
    
    fill(200, 0, 0);
    noStroke();
    circle(x, y, r*2);

    if (x-r < 0 || x+r > w) {
        vx *= -1;
    }
    if (y-r < 0 || y+r > h) {
        vy *= -1;
    }

    x += vx;
    y += vy;
}
