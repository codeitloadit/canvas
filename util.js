function degToRad(deg) {
	return deg * Math.PI / 180; 
}

function radToDeg(rad) {
	return rad * 180 / Math.PI;
}

function distanceBetweenPoints(a, b) {
	return Math.sqrt((a.x - b.x ) * ( a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

function areCirclesColliding(a, b) {
	return distanceBetweenPoints(a, b) <= a.radius + b.radius;
}

function areRectsColliding(a, b) {
	return a.x + a.width > b.x && a.y + a.height > b.y && a.x < b.x + b.width && a.y < b.y + b.height;
}

function getAngleBetweenPoints(a, b) {
	return radToDeg(Math.atan2(a.y - b.y, a.x - b.x));
}
