/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}

// This FPS code needs cleaning.
var dateThen = new Date();
var tick = dateThen.getTime();
var fps;
var frames = 0;
var thenInterval = tick;
var recentFrames = [];
var averageFps = 0;
var fpsInterval = 100;

function calculateFPS() {
    frames += 1;
    var dateNow = new Date();
    var now = dateNow.getTime();
    var nowInterval = now;
    fps = frames/(now - tick)*1000;
    recentFrames.push(fps);
    frames = 0;
    tick = now;

    if (nowInterval - thenInterval >= fpsInterval) {
        thenInterval = nowInterval;
        var sum = 0;
        var recentLength = recentFrames.length; 
        for (var i = 0; i < recentLength; i++)
            sum += recentFrames[i];

        averageFps = parseInt(sum / recentLength);
        recentFrames = [];
    }

    context.fillStyle = "#fff";
    context.globalAlpha = 1;
    context.font = 'bold 20px Arial';
    context.fillText(averageFps, 0, 16);
}