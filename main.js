"use strict";

//======================================================================================================
// Constants
//======================================================================================================
const CANVAS_W = 600;
const CANVAS_H = 600;
const PLAYER_VEL = 2;
const MAP_W = 10;
const MAP_H = 10;

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
//console.log(game.map.matrix);