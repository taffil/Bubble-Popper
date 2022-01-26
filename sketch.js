const canvas = document.createElement('canvas')
// let width = window.innerWidth
// let height = window.innerHeight
canvas.setAttribute('width', '1350')
canvas.setAttribute('height', '660')
document.body.prepend(canvas)
const ctx = canvas.getContext('2d')
const game = { req: '' }
const bubble = { bubbleCount: 100, bubbles: [] }

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (bubble.bubbles.length < bubble.bubbleCount) {
        bubbleMaker()
    }
    bubble.bubbles.forEach((bub, index) => {
        bub.y -= bub.speed
        if (bub.y < 0) {
            bubble.bubbles.splice(index, 1)
        }
        drawBubble(bub.x, bub.y, bub.size, bub.color1, bub.color2)
    })
    game.req = requestAnimationFrame(draw)
    drawShapes()
}

function bubbleMaker() {
    //get a random number between two values
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
    }
    let bubbleSize = getRandomIntInclusive(5, 50)
    let xPos = Math.random() * (canvas.width - bubbleSize)
    let yPos = Math.random() * (canvas.height - bubbleSize) + canvas.height
    bubble.bubbles.push({
        x: xPos,
        y: yPos,
        size: bubbleSize,
        speed: getRandomIntInclusive(2, 10),
        color1: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
        color2: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
    })
}

function drawBubble(xPos, yPos, bubbleSize, cl1, cl2) {
    const gradient = ctx.createRadialGradient(xPos, yPos, bubbleSize * 1.5, xPos + 10, yPos - 10, bubbleSize / 5)
    gradient.addColorStop(0, 'rgba(' + cl1[0] + ',' + cl1[1] + ',' + cl1[2] + ',0.1)')
    gradient.addColorStop(1, 'rgba(' + cl2[0] + ',' + cl2[1] + ',' + cl2[2] + ',1)')
    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2.5
    ctx.arc(xPos, yPos, bubbleSize, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
}

function drawShapes() {
    //Text
    const js = "JS"
    ctx.beginPath()
    ctx.font = 'bold 404.7px arial'
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(js, canvas.width * 0.2, canvas.height * 0.525)
    ctx.closePath()

    //Head
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255,255,0,0.45)'
    ctx.arc(canvas.width * 0.6, canvas.height * 0.5, canvas.height * 0.3, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    //Mouth
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.arc(canvas.width * 0.6, canvas.height * 0.525, canvas.height * 0.2, 0, Math.PI)
    ctx.fill()
    ctx.closePath()

    //Eyes
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.ellipse(canvas.width * 0.55, canvas.height * 0.4, 25, 50, 0, 0, Math.PI * 2)
    ctx.ellipse(canvas.width * 0.65, canvas.height * 0.4, 25, 50, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}
game.req = requestAnimationFrame(draw)
