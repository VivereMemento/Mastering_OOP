const DataBinding = (function () {
	console.log('THIS IS DATA BINDING');

	const menualDataBinding = (function () {

		const init = function () {
			console.log('This is menual data binding')
			person = new Person("John", "Smithsssss");
			txtName.value = person.name;
			txtSurname.value = person.surname;

			btnSave.onclick = function() {
				person.name = txtName.value;
				person.surname = txtSurname.value;
				console.log(person);
			};
		}

		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");
		let btnSave = document.getElementById("btnSave");

		function Person(name, surname) {
			this.name = name;
			this.surname = surname;
		}
		

		return {
			init: init
		}
	}());
	// menualDataBinding.init();

	
	const monitoringChanges = (function () {

		const init = function () {
			console.log('This is monitoring changes')
			person = new Person("John", "Smithsssss");
			txtName.value = person.name;
			txtSurname.value = person.surname;

			txtName.oninput = function() {
				person.name = txtName.value;
				console.log(person.name);
			};
			txtSurname.oninput = function() {
				person.surname = txtSurname.value;
				console.log(person.surname);
			};
		}

		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");

		function Person(name, surname) {
			this.name = name;
			this.surname = surname;
		}
		

		return {
			init: init
		}
	}());
	// monitoringChanges.init();

	// However, this approach can be applied if the data target object supports events, as for DOM
	// elements. How can we implement a real-time property update without events?
	const simpleFactoty = (function () {

		const init = function () {
			console.log('This is simple factoty')
			let person = Person("John", "Smithhhh");
			console.log(person);
				
			setTimeout(function() {
				person.name("Mario");
				person.surname("Rossi");
			}, 5000);

			txtName.oninput = function() {
				person.name(txtName.value)
				console.log(person.name());
			};
			txtSurname.oninput = function() {
				person.surname(txtSurname.value);
				console.log(person.surname());
			};
		}

		function Person(name, surname) {
			let _name = name;
			let _surname = surname;
			let txtName = document.getElementById("txtName");
			let txtSurname = document.getElementById("txtSurname");
			txtName.value = _name;
			txtSurname.value = _surname;

			return {
				name: function(value) {
					if (value) {
						_name = value;
						txtName.value = _name;
					}
					return _name;
				},
				surname: function(value) {
					if (value) {
						_surname = value;
						txtSurname.value = _surname;
					}
					return _surname;
				}
			};	
		}

		return {
			init: init
		}
	}());
	// simpleFactoty.init();

	// The previous proposed approach to monitoring changes of the data source properties is
	// based on the definition of specialized getters and setters. That solution works properly also
	// for old versions of JavaScript engines, but if we have no limitation on using more recent
	// features, we can use the standard getters and setters 
	const hackingProperties = (function () {

		const init = function () {
			console.log('This is hacking properties');
			let person = new Person("John", "Smithhhh");

			setTimeout(function() {
				person.name = "Mario";
				person.surname = "Rossi";
			}, 5000);


			txtName.addEventListener('input', () => {
				person.name = txtName.value;
				console.log(person.name);
			});
			txtSurname.addEventListener('input', () => {
				person.surname = txtSurname.value;
				console.log(person.surname);
			});

			btnSave.addEventListener('click', () => {
				let obj = new Object;
				obj.name = person.name;
				obj.surname = person.surname;
				persons.push(obj);
				console.log(persons);
			});
		}
		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");
		let btnSave = document.getElementById("btnSave");
		let btnReset = document.getElementById("btnReset");
		let persons = [];


		function Person(name, surname) {
			let _name = name;
			let _surname = surname;
			txtName.value = _name;
			txtSurname.value = _surname;

			Object.defineProperty(this, "name",
			{
				// get: function() { return _name; },
				get: function() { return txtName.value; },
				set: function(value) {
					// _name = value;
					// txtName.value = _name;
					txtName.value = value;
				}
			});

			Object.defineProperty(this, "surname",
			{
				// get: function() { return _surname; },
				get: function() { return txtSurname.value; },
				set: function(value) {
					// _surname = value;
					// txtSurname.value = _surname;
					txtSurname.value = value;
				}
			});
		};

		return {
			init: init
		}
	}());
	// hackingProperties.init();

	// The data binding implementations we analyzed are based on a tight coupling between the
	// data source object and the data target object. Whether we define specialized methods or we
	// use the standard getter and setter, we include in the data source object definition an explicit
	// reference to the data target object. Usually, this is not desirable, because a change to one
	// object may require a change to the other object. Moreover, what happens if we want to
	// create a new data binding relationship with another object? We need to add a reference to
	// the new object by adding a new dependency and this slowly leads to a *** MESSY CODE ***.
	
	// What we need is an external mechanism that sets up a data binding relationship. Let's
	// implement this mechanism as an object like the following:
	
	const definingBinder = (function () {

		const init = function () {
			console.log('This is defining binder');
			let person = new Person("John", "Smith");
			let binder = new Binder()
			binder.bindTo(person, "name", txtName, "value");
			binder.bindTo(person, "surname", txtSurname, "value");

			setTimeout(function() {
				person.name = "Mario";
				person.surname = "Rossi";
			}, 5000);

			txtName.addEventListener('input', () => {
				console.log(person.name);
			});
			txtSurname.addEventListener('input', () => {
				console.log(person.surname);
			});

			btnSave.addEventListener('click', () => {
				let obj = new Object;
				obj.name = person.name;
				obj.surname = person.surname;
				persons.push(obj);
				console.log(persons);
			});
		}

		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");
		let btnSave = document.getElementById("btnSave");
		let persons = [];
		

		function Person(name, surname) {
			let _name = name;
			let _surname = surname;
			txtName.value = _name;
			txtSurname.value = _surname;
		};

		function Binder() {};

		Binder.prototype.bindTo = function(dataSourceObj, dataSourceProperty, dataTargetObj,dataTargetProperty) {
			Object.defineProperty(dataSourceObj, dataSourceProperty, {
				get: function() {
					return dataTargetObj[dataTargetProperty];
				},

				set: function(newValue) {
					dataTargetObj[dataTargetProperty] = newValue;
				}
			});
		}

		return {
			init: init
		}

	}());
	// definingBinder.init();

	// 	Even if this solution is very effective, it has some issues. Since it redefines a possible existing
	// property, we risk losing the original definition which may have a customized behavior.
	// Moreover, the properties involved in the data binding relationship may be sealed so that we
	// cannot change its definition. This happens, for example, with the DOM elements. We can't
	// change the DOM's elements definition, so if we plan to use the bindTwoWay() method on a
	// DOM element we will fail.

	// The publish/subscribe pattern
	// Subject: This is the object that may change its state; it knows its observer and
	// sends them a notification when its state changes.
	// Observers: These are the objects that are interested in the subject's state change.
	// For example, when we used
	// the onchange event to be notified if the value of the textbox changed, we were applying the
	// observer pattern. In fact, the textbox was the subject and the person object was the
	// observer.
	
	// While in the observer pattern, the subject itself manages the communication with its
	// observers, in the publisher/subscriber pattern this task is assigned to the observable object.
	// Our intermediary object will be the observable object implemented by the following factory function:
	const publishSubscribe = (function () {

		const init = function () {
			console.log('This is publish/subscribe pattern');
			let john = observable("John");
			let smith = observable("Smith");
			let person = new Person(john, smith);

			txtName.value = person.name();
			txtSurname.value = person.surname()
			person.name.subscribe( function(value) { 
				txtName.value = value;
				addMessage.init(`Привет ${value}`); 
			});
			person.surname.subscribe( function(value) { txtSurname.value = value; });

			setTimeout(function() {
				person.name("Mario");
				person.surname("Rossi");
			}, 2000)
		}

		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");
		

		function Person(name, surname) {
			this.name = name;
			this.surname = surname;
		};

		function observable(value) {
			let subscribers = [];
			function notify(newValue) {
				for (let i = 0; i < subscribers.length; i++) {
					subscribers[i](newValue);
				}
			}
			function accessor(newValue) {
				if (arguments.length && newValue !== value) {
					value = newValue;
					notify(newValue);
				}
				return value;
			}

			accessor.subscribe = function(subscriber) {
				subscribers.push(subscriber);
			};
			return accessor;
		}

		return {
			init: init
		}

	}());
	// publishSubscribe.init();
	
	//The data binding implementing through the observables makes the data source object
	// independent from the data target object. It is applicable to any type of object, including the
	// DOM elements and is quite generic. In fact, we can execute an arbitrary code when the
	// change occurs by subscribing any function, not just a simple assignment
	
	// Using proxies
	// The proxy class allows us to create special objects that can change the default behavior
	// when an object is accessed. When creating a proxy for an object, we can define a handler
	// and configure traps in order to intercept accesses to its property and possibly change the
	// standard behavior.

	const proxyES6 = (function () {

		const init = function () {
			console.log('This is proxy');
			let person = new Person("John", "Smith");
			let proxiedPerson = new Proxy(person, handler);

			let name = proxiedPerson.name;
			//console: Getting property name
			proxiedPerson.name = "Mario";
			//console: Assigning value Mario to property name
			console.log(person.name);
			//console: Mario
		}

		function Person(name, surname) {
			this.name = name;
			this.surname = surname;
		};

		let handler = {
			get (target, propertyName) {
				console.log(`Getting property ${propertyName} whos value is ${target[propertyName]}`);
				return target[propertyName];
			},
			set(target, propertyName, value) {
				console.log(`Assigning value ${value} to property ${propertyName}`);
				target[propertyName] = value;
			}
		};

		return {
			init: init
		}

	}());
	// proxyES6.init();

	// Of course this is a simple example to introduce the basic concepts of proxies. We can use
	// other traps in order to define advanced manipulations of the target object. For example, we
	// can trap definitions of properties using the defineProperty()trap or deletion of
	// properties using the trap deleteProperty() function and so on.
	
	const dataBindingWithProxy = (function () {

		const init = function () {
			console.log('This is data binding with proxy');
			var person = new Person("John", "Smith");
			var binder = new Binder();
			var proxiedPerson = binder.bindTo(person,
												["name", "surname"],
												[	{obj: txtName, prop: "value"},
													{obj: txtSurname, prop: "value"}
												]);
			setTimeout(function() {
			  proxiedPerson.name = "Mario";
			  proxiedPerson.surname = "Rossi";
			}, 1000);
		}

		let txtName = document.getElementById("txtName");
		let txtSurname = document.getElementById("txtSurname");

		function Person(name, surname) {
			this.name = name;
			this.surname = surname;
		};

		class Binder {
			bindTo(dataSourceObj, dataSourceProperties, dataTargetList) {
				var bindHandler = {
					set: function(target, property, newValue) {
						var i = dataSourceProperties.indexOf(property);
							if (i >= 0) {
							target[dataSourceProperties[i]] = newValue;
							dataTargetList[i].obj[dataTargetList[i].prop] =
							newValue;
						}
					}
				};
			return new Proxy(dataSourceObj, bindHandler);
			}
		}
		return {
			init: init
		}

	}());
	dataBindingWithProxy.init();

})();