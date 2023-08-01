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
        this.background = new Background();
        this.camera = new Camera(19);
        this.selectScreen = new SelectScreen();
        this.clientMouse = new ClientMouse();

        this.isInSelectScreen = false;

        canvasElement.addEventListener("click", (event) => {this.HandleMouseClick(event);});
        canvasElement.addEventListener("wheel", (event) => {this.HandleMouseWheel(event);});
        window.addEventListener("keydown", (event) => {this.HandleKeyInput(event);});
    }
    
    Update()
    {
        if(this.isInSelectScreen) this.selectScreen.Update();
        else this.background.Update();
        
        this.clientMouse.Update();
        this.camera.Update();
    }

    Draw()
    {
        cContext.clearRect(0,0,CANVAS_W,CANVAS_H);
        
        if(this.isInSelectScreen) this.selectScreen.Draw();
        else this.background.Draw();
    }

    HandleMouseClick(event)
    {
        if(this.isInSelectScreen)
        {
            this.clientMouse.curIDSelected = this.clientMouse.mouseTileID;
            this.isInSelectScreen = !this.isInSelectScreen;
        }
        else this.background.map.matrix[this.background.absMouseTileY][this.background.absMouseTileX] = this.clientMouse.curIDSelected;
    }

    HandleMouseWheel(event)
    {
        let deltaY = event.deltaY;
        
        if(deltaY > 0) this.clientMouse.curIDSelected -= 1;
        else this.clientMouse.curIDSelected += 1;
    }

    HandleKeyInput(event)
    {  
        console.log(event.key);
        
        switch(event.key)
        {
        case "w":
            if(!this.isInSelectScreen) this.camera.position.y -= 1;
            break;
        case "a":
            if(!this.isInSelectScreen) this.camera.position.x -= 1;
            break;
        case "s":
            if(!this.isInSelectScreen) this.camera.position.y += 1;
            break;
        case "d":
            if(!this.isInSelectScreen) this.camera.position.x += 1;
            break;
        case "Escape":
            this.isInSelectScreen = !this.isInSelectScreen;
            break;
        default:
        }
    }
}

//==============================================================================
// Class Map - Handles Map Position and Elements
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
        let tileCounter = 0;
        
        for(let h = 0; h < MAP_H; h++)
        {
            this.matrix.push([]);
            
            for(let w = 0; w < MAP_W; w++)
            {
                this.matrix[h].push(tileCounter);
                tileCounter++;
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
// Class Background - Class responsible for drawing on screen
//==============================================================================

class Background
{
    constructor()
    {
        this.map = new Map();

        this.absMouseTileX = 0;
        this.absMouseTileY = 0;

        cContext.font = "7px serif";
    }

    Update()
    {
        this.ApproxMouseToAbsTile();
    }
    
    Draw()
    {
        let noTilesH = CANVAS_H/TILE_H - 1;
        let noTilesW = CANVAS_W/TILE_W - 1;

        cContext.fillStyle = "Black";
        
        for(let h = 0; h < noTilesH; h++)
        {
            for(let w = 0; w < noTilesW; w++)
            {
                // Camera Integer Position
                let cameraXPos = game.camera.position.x;
                let cameraYPos = game.camera.position.y;
                
                // Get Data from Map
                let curBlockID = this.map.matrix[cameraYPos-19+h][cameraXPos-19+w];
                let curBlockStr = curBlockID.toString();

                // Draw to Screen
                cContext.fillText(curBlockStr,16*w,16*h+16);
            }
        }

        this.DrawSelection();
    }

    ApproxMouseToAbsTile()
    {
        this.absMouseTileX = game.clientMouse.mouseTileX + game.camera.position.x - 19;
        this.absMouseTileY = game.clientMouse.mouseTileY + game.camera.position.y - 19;

        //console.log(`Selecting absolute tile (${this.absMouseTileX},${this.absMouseTileY})`);
    }

    DrawSelection()
    {
        cContext.fillStyle = "Red";
        cContext.fillRect(16*game.clientMouse.mouseTileX,16*game.clientMouse.mouseTileY,TILE_W,TILE_H);
    }
}

//==============================================================================
// Class Camera - Controls Camera Positioning
//==============================================================================
class Camera
{
    constructor(startPos)
    {
        this.position = new Value2D(startPos,startPos);
        this.velocity = new Value2D(0,0);
        this.acceleration = new Value2D(0,0);
        this.color = "Red";
    }

    Update()
    {
        if(this.position.x < 19) this.position.x = 19;
        else if(this.position.x > 236) this.position.x = 236;
        if(this.position.y < 19) this.position.y = 19;
        else if(this.position.y > 236) this.position.y = 236;

        //this.DBGPrintInfo();
        return;
    }
    
    DBGPrintInfo()
    {
        console.log(`CameraPos = (${this.position.x},${this.position.y})`);
    }
}

//==============================================================================
// Class ClientMouse - Controls Mouse Positioning
//==============================================================================

class ClientMouse
{
    constructor()
    {
        window.addEventListener("mousemove", (event) => {this.HandleMouseMove(event);});

        this.position = new Value2D(0,0);
        this.curIDSelected = 0;

        this.mouseTileX = 0;
        this.mouseTileY = 0;

        this.mouseTileID = 0;
    }

    HandleMouseMove(event)
    {
        let rect = canvasElement.getBoundingClientRect();
        
        this.position.x = Math.floor(event.clientX - rect.left);
        this.position.y = Math.floor(event.clientY - rect.top);
    }

    Update()
    {
        this.ApproxMouseToTile();
        this.CalculateTileID();
    
        if(this.curIDSelected < 0) this.curIDSelected = 0;
        else if(this.curIDSelected > 1000) this.curIDSelected = 1000;
    
        console.log(`curIDSelected = ${this.curIDSelected}`);
        console.log(`curTileID = ${this.mouseTileID}`);
    }
    
    ApproxMouseToTile()
    {
        this.mouseTileX = Math.floor((game.clientMouse.position.x) / TILE_W);
        this.mouseTileY = Math.floor((game.clientMouse.position.y) / TILE_H);
    }

    CalculateTileID()
    {
        let noTilesW = CANVAS_W/TILE_W - 1;
        this.mouseTileID = this.mouseTileY*noTilesW + this.mouseTileX;
    }

    DBGPrintInfo()
    {
        console.log(`MousePos = (${this.position.x},${this.position.y})`);
    }
}

//==============================================================================
// Class SelectScreen - Handles the Select Screen
//==============================================================================

class SelectScreen
{
    constructor()
    {

    }

    Update()
    {

    }
    
    Draw()
    {
        this.DrawSelection();
        
        cContext.fillStyle = "Black";
        
        let noTilesH = CANVAS_H/TILE_H - 1;
        let noTilesW = CANVAS_W/TILE_W - 1;
        
        let counter = 0;
        
        for(let h = 0; h < noTilesH; h++)
        {
            for(let w = 0; w < noTilesW; w++)
            {
                // Draw to Screen
                cContext.fillText(counter,16*w,16*h+16);
                counter++;
            }
        }
    }

    DrawSelection()
    {
        cContext.fillStyle = "Red";
        cContext.fillRect(16*game.clientMouse.mouseTileX,16*game.clientMouse.mouseTileY,TILE_W,TILE_H);
    }
}