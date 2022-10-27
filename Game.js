class balloon {
    constructor() {
        this.x = random(width)
        this.y = random(height)
        this.r = 20
        this.vx = 0
        this.vy = 0
        this.color = color(random(255), random(255), random(255))
        this.popped = false
    }

    blowAway() {
        if (!this.popped) {
            let d = dist(this.x, this.y, mouseX, mouseY)
            let force = -10 / (d * d)
            this.vx += force * (mouseX - this.x)
            this.vy += force * (mouseY - this.y)
            this.vx *= 0.95
            this.vy *= 0.95
            if (this.x < width - 10 && this.x > 10) {
                this.x += this.vx
            }
            if (this.y < height - 10 && this.y > 10) {
                this.y += this.vy
            }
        }        
    }

    checkToPop() {
        if (!this.popped && dist(this.x, this.y, mouseX, mouseY) < this.r) {
            this.popped = true
            let currScore = Number(document.getElementById("score").innerHTML)
            currScore++
            document.getElementById("score").innerHTML = currScore
            this.col = color(156)
        }
    }
}

let balloons = []
let numballoons = 10

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent("Balloons")
    for (i = 0; i < numballoons; i++) {
        balloons[i] = new balloon()
    }
}

function draw(){
    background(135, 206, 235)
    for (i = 0; i < numballoons; i++) {
        fill(balloons[i].color)
        circle(balloons[i].x, balloons[i].y, balloons[i].r)
        balloons[i].blowAway()
        balloons[i].checkToPop()
    }
}
