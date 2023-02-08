class Enemy {
    constructor(){
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTImer = 0
        this.markedForDeletion = false
    }

    update(deltaTime){
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY

        if(this.frameTImer > this.frameInterval){
            this.frameTImer = 0
            if(this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
        } else{
            this.frameTImer += deltaTime
        }

        if(this.x + this.width < 0) this.markedForDeletion = true
    }

    draw(context){
        if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super()
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = Math.random() * 5
        this.speedY = 0
        this.maxFrame = 5
        this.image = enemy_fly

        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1

    }

    update(deltaTime){
        super.update(deltaTime)
         //we use this method, when we want to add properties in addition to the properties of parent class' update

        this.angle += this.va
        this.y += Math.sin(this.angle) * 2
    }

}



export class GroundEnemy extends Enemy {
    constructor(game){
        super()
        this.game = game
        this.width = 60
        this.height = 87
        this.x  = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = enemy_plant
        this.speedX = 0
        this.speedY = 0
        this.maxFrame = 1
    }

    //if we dont create the update or draw method, it will inheerit the update and draw ,ethod of the parent class
}


export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super()
        this.game = game
        this.width = 120
        this.height = 144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.image = enemy_spider_big
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
    }

    update(deltaTime){
        super.update(deltaTime) 
         //we use this method, when we want to add properties in addition to the properties of parent class' update


        if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1
        if(this.y < -this.height) this.markedForDeletion = true
    }

    draw(context){
        super.draw(context)
         //we use this method, when we want to add properties in addition to the properties of parent class' update
        context.beginPath()
        context.moveTo(this.x + this.width/2, 0)
        context.lineTo(this.x + this.width/2, this.y + 50)
        context.stroke()
    }

}