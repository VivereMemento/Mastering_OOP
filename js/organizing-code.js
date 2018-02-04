(function () {
	console.log('THIS IS ORGANIZING CODE');

	// NAMESPACE AS OBJECT LETERAL
	let myApplication = {
		version: "1.0",
		name: "My Application",
		config: {

			ui: {
				backgroundColor: "green",
				fontSize: 12
			},
			localization: {
				language: "english",
				dateFormat: "MM-dd-yyyy"
			}
		},
		init: function() {
			console.log('This is Namespace as object literal');
			console.log(`application: name - ${this.name} version - ${this.version}`);
		}
	};
		
	// myApplication.init();

	// NAMESPACE AS IIFE
	
	myApplication = {};

	(function(nameSpace) {
		nameSpace.version = "1.0",
		nameSpace.name = "My Application",
		nameSpace.config = {/*...*/},
		nameSpace.init = function() {/*...*/}
	})(myApplication);

	// A letiant of the previous approach uses the this keyword instead to rely on the
	// nameSpace parameter:
	myApplication = {};

	(function() {
		this.version = "1.0",
		this.name ="My Application",
		this.config = {},
		this.init = function() {}
	}).apply(myApplication);

	// MODULE PATTERN
	
	let geoModule = (function() {
		console.log('This is module pattern');

		let pi = 3.14;
			function circumference(radius) {
			return 2*pi*radius;
		}
		function circleArea(radius) {
			return pi*radius*radius;
		}
		return {
			calculateCircumference:  circumference,
			calculateCircleArea:   circleArea
		};
	})();

	console.log(geoModule.calculateCircumference (5));
	console.log(geoModule.calculateCircleArea(5));

	// *** Importing modules
	// A module can use the exported member of another module in order to implement its own
	// functionalities.
	
	let moduleMath = (function(module) {

		let math = Math;

		return {
			objMath: math
		}
		
	}());
	
	geoModule = (function(mathModule) {

		console.log('This is importing modules');

		let pi = mathModule.PI;

		function circumference(radius) {
			return 2*pi*radius;
		}

		function circleArea(radius) {
			return pi*mathModule.pow(radius, 2);
		}
		return {
			calculateCircumference:  circumference,
			calculateCircleArea:   circleArea
		};
	})(moduleMath.objMath);

	console.log(geoModule.calculateCircumference(5));
	console.log(geoModule.calculateCircleArea(5));

	// *** Augmenting module for geoModule
	// 
	let geoModuleAugmenting = (function(mathModule, me) {

		console.log('This is augmentin modules');

		me.calculateSphereVolume = function(radius) {
			return 4*mathModule.PI*mathModule.pow(radius, 2);
		};

		return me;

	})(Math, geoModule || {});

	console.log(geoModule.calculateCircumference(5));
	//result: 31.41592653589793
	console.log(geoModule.calculateCircleArea(5));
	//result: 78.53981633974483
	console.log(geoModule.calculateSphereVolume(5));
	//result: 314.1592653589793
	
	// *** Overriding a module's methods
	// 
	
	geoModule = (function(me) {

		console.log(`This is overriding a module's method`);

		var oldCalculateCircleArea = me.calculateCircleArea;

		me.calculateCircleArea = function(radius) {
		return oldCalculateCircleArea(radius).toFixed(2);
	};
		return me;
	})(geoModule);

	console.log(geoModule.calculateCircleArea(5));
	//result: 78.54


	// *** Composing modules
	// 
	
	let circleModule = (function () {
		console.log('This is circleModule');
	});

	let polygonModule = (function () {
		console.log('This is polygonModule');
	});

	geoModule = (function(module1, module2) {

		var me =  module1;

		for (var memberName in module2) {
			if (module2.hasOwnProperty(memberName)) {
				me[memberName] = module2[memberName];
			}
		}

		return me;
	})(circleModule, polygonModule);

	// ECMAScript 6 introduced the Object.assign() method so that we can combine modules
	// by simply writing:
	
	
	geoModule = (function(module1, module2) {
		console.log('This is composing module');
		return Object.assign(module1, module2);
	})(circleModule, polygonModule);

	// *** Submodules
	// 
	
	geoModule.triangleModule = (function() {

		console.log('This is submodules');

		function perimeter(side1, side2, side3) {
			return side1+side2+side3;
		}

		function area(basis, height) {
			console.log(basis*height/2);
			return basis*height/2;
		}

		return {
			calculateTrianglePerimeter:  perimeter,
			calculateTriangleArea:   area
		};
	})();

	geoModule.triangleModule.calculateTriangleArea(3,4);
	//result:  6
	//
	
	
}());
