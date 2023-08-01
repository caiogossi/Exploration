"use strict";

//======================================================================================================
// Constants
//======================================================================================================
const CANVAS_W = 624;
const CANVAS_H = 624;
const PLAYER_VEL = 2;
const MAP_W = 256;
const MAP_H = 256;
const TILE_H = 16;
const TILE_W = 16;

//======================================================================================================
// Element Initialization
//======================================================================================================

window.onkeydown = (key) => { if(key.ctrlKey == true) {key.preventDefault()}};

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