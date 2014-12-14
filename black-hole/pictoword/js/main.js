var controller;
var canvas;
function init() {
	ptwUI.init();
	canvas = $("#container");
	controller = new Controller(canvas);
	ptwUI.controller = controller;
	controller.startGame();
	SM.RegisterState("preload", PreloadState);
	SM.RegisterState("menu", MenuState);
	SM.RegisterState("inGame", InGameState);
	SM.RegisterState("finish", FinishState);
	SM.SetStateByName("menu");
}