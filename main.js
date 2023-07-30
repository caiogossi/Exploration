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
        this.entityList = [new Entity()];
        this.background = new Background("Blue");
        window.addEventListener('keydown', (event) => {this.HandleControlInput(event);});
    }

    HandleControlInput(event)
    {
        switch(event.key)
        {
        case "w":
            this.entityList[0].SetLocationY(this.entityList[0].GetLocationY()-3);
            break;
        case "a":
            this.entityList[0].SetLocationX(this.entityList[0].GetLocationX()-3);
            break;
        case "s":
            this.entityList[0].SetLocationY(this.entityList[0].GetLocationY()+3);
            break;
        case "d":
            this.entityList[0].SetLocationX(this.entityList[0].GetLocationX()+3);
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
// Class Point2D - Instantiates a Point in 2D Space
//==============================================================================
class Point2D
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    SetX(x)
    {
        this.x = x;
    }

    SetY(y)
    {
        this.y = y;
    }

    GetX()
    {
        return this.x;
    }

    GetY()
    {
        return this.y;
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
    }

    Draw()
    {
        cContext.fillStyle = this.color;
        cContext.fillRect(0,0,CANVAS_W,CANVAS_H);
    }
}

//==============================================================================
// Class Entity - Basic Entity Class
//==============================================================================
class Entity
{
    constructor()
    {
        this.location = new Point2D(0,0);
        this.color = "Red";
    }

    SetLocation(x,y)
    {
        this.location.SetX(x);
        this.location.SetY(y);
    }

    SetLocationX(x)
    {
        this.location.SetX(x);
    }

    SetLocationY(y)
    {
        this.location.SetY(y);
    }

    GetLocationX()
    {
        return this.location.GetX();
    }

    GetLocationY()
    {
        return this.location.GetY();
    }

    Update()
    {
        return;
    }

    Draw()
    {
        cContext.fillStyle = this.color;
        cContext.fillRect(this.location.GetX(),this.location.GetY(),50,50);
    }
}

//======================================================================================================
// Constants
//======================================================================================================
const CANVAS_W = 600;
const CANVAS_H = 600;

//======================================================================================================
// Element Initialization
//======================================================================================================

// Canvas Element Setup
const canvasElement = document.getElementById("CanvasElement");
const cContext = canvasElement.getContext("2d");
canvasElement.width = CANVAS_W;
canvasElement.height = CANVAS_H;

let game = new Game();
let isGameRunning = true;

//======================================================================================================
// MainLoop - Main Game Loop
//======================================================================================================

function MainLoop()
{
    game.Update();
    game.Draw();
    if(isGameRunning) window.requestAnimationFrame(MainLoop);
}

MainLoop();