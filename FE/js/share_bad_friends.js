//just test2
var Car = function(wheel,type,speed){
	this.wheel = wheel || 0;
	this.type = type || 0;
	this.speed = speed || '50km/s';
	return this;
}

Car.prototype = {
	constructor:Car,
	getSpeed : function(){
		console.log("This Car's speed is "+this.speed);
		return this;
	},
	getWheel : function(){
		console.log("This Car Has " + this.wheel + " Wheels");
		return this;
	}

}
Car.prototype.getType  = function(){
		console.log("This Car's Type is " + this.type);
		return this;
}

var car_1 = new Car();
car_1.getSpeed().getWheel();
console.log(Car.prototype.isPrototypeOf(car_1))
