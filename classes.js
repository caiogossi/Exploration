"use strict";

//======================================================================================================
// Classes
//======================================================================================================

//==============================================================================
// Class Game - Main Game Class
//==============================================================================

class Game
{
    constructor()
    {
        this.entityList = [new Entity(PLAYER_VEL)];
        this.background = new Background("Blue");
        this.map = new Map();
        window.addEventListener('keydown', (event) => {this.HandleControlInputDown(event);});
        window.addEventListener('keyup', (event) => {this.HandleControlInputUp(event);});
    }

    HandleControlInputDown(event)
    {
        switch(event.key)
        {
        case "w":
            this.entityList[0].velocity.y += -PLAYER_VEL;
            break;
        case "a":
            this.entityList[0].velocity.x += -PLAYER_VEL;
            break;
        case "s":
            this.entityList[0].velocity.y += PLAYER_VEL;
            break;
        case "d":
            this.entityList[0].velocity.x += PLAYER_VEL;
            break;
        default:
        }
    }

    HandleControlInputUp(event)
    {
        switch(event.key)
        {
        case "w":
            this.entityList[0].velocity.y -= -PLAYER_VEL;
            break;
        case "a":
            this.entityList[0].velocity.x -= -PLAYER_VEL;
            break;
        case "s":
            this.entityList[0].velocity.y -= PLAYER_VEL;
            break;
        case "d":
            this.entityList[0].velocity.x -= PLAYER_VEL;
            break;
        default:
        }
    }
    
    Update()
    {
        for(let i = 0; i < this.entityList.length; i++)
        {
            this.entityList[i].Update();
        }
    }

    Draw()
    {
        cContext.clearRect(0,0,CANVAS_W,CANVAS_H);

        this.background.Draw();
        
        for(let i = 0; i < this.entityList.length; i++)
        {
            this.entityList[i].Draw();
        }
    }
}

//==============================================================================
// Class Map - Handles Map Location and Elements
//==============================================================================

class Map
{
    constructor()
    {
        this.width = MAP_W;
        this.height = MAP_H;
        this.matrix = [];
        
        this.InitMapMatrix();
    }

    InitMapMatrix()
    {
        for(let h = 0; h < MAP_H; h++)
        {
            this.matrix.push([]);
            
            for(let w = 0; w < MAP_W; w++)
            {
                this.matrix[h].push(0);
            }
        }
    }
}

//==============================================================================
// Class Value2D - Instantiates a Value in 2D Space
//==============================================================================
class Value2D
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

//==============================================================================
// Class Background - Class containing background aspects
//==============================================================================

class Background
{
    constructor(color)
    {
        this.color = color;
        this.image = new Image();
        this.image.src = "img/bg.jpg";
    }

    Draw()
    {
        cContext.drawImage(this.image,0,0,50,50,0,0,600,600);
    }
}

//==============================================================================
// Class Entity - Basic Entity Class
//==============================================================================
class Entity
{
    constructor(maxVelocity)
    {
        this.location = new Value2D(0,0);
        this.velocity = new Value2D(0,0);
        this.acceleration = new Value2D(0,0);
        this.maxVelocity = maxVelocity;
        this.color = "Red";
    }

    Update()
    {
        this.UpdatePos();

        return;
    }

    Draw()
    {
        cContext.fillStyle = this.color;
        cContext.fillRect(this.location.x,this.location.y,60,60);
    }

    UpdatePos()
    {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        
        if(this.velocity.x > this.maxVelocity)
        {
            this.velocity.x = this.maxVelocity;
        }
        else if(this.velocity.x < -this.maxVelocity)
        {
            this.velocity.x = -this.maxVelocity;
        }

        if(this.velocity.y > this.maxVelocity)
        {
            this.velocity.y = this.maxVelocity;
        }
        else if(this.velocity.y < -(this.maxVelocity))
        {
            this.velocity.y = -(this.maxVelocity);
        }

        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;

        return;
    }
    
    DBG_PrintInfo()
    {
        console.log(`Entity maxVel = ${this.maxVelocity}`);
        console.log(`Entity accel = (${this.acceleration.x},${this.acceleration.y})`);
        console.log(`Entity vel = (${this.velocity.x},${this.velocity.y})`);
        console.log(`Entity pos = (${this.location.x},${this.location.y})`);
    }
}