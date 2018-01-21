const DataBinding = (function () {
	console.log('THIS IS DATA BINDING');

	const simpleFactoty = (function () {

		const init = function () {
			console.log('This is simple factoty')
			let person = Person("John", "Smithhhh");
				
			setTimeout(function() {
				person.name("Mario");
				person.surname("Rossi");
			}, 5000);
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
				get: function() { return _name; },
				set: function(value) {
					_name = value;
					txtName.value = _name;
				}
			});

			Object.defineProperty(this, "surname",
			{
				get: function() { return _surname; },
				set: function(value) {
					_surname = value;
					txtSurname.value = _surname;
				}
			});
		};

		return {
			init: init
		}
	}());
	// hackingProperties.init();

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
	definingBinder.init();

})();