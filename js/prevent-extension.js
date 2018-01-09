(function () {
	console.log('THIS IS PREVENT EXTENSIONS');
	// If we want to prevent addition of new members to an object we can
	// use the Object.preventExtensions() method.
	// 'use strict';
	let person = {
		name: 'Jhon',
		surname: 'Smith'
	};

	Object.preventExtensions(person);

	person.age = 32;
	console.log(person.age); // undefined


	/*
	Preventing extensions for constructor
	Whith this defintion, any derived constructor will not be able
	to add new properties
	 */

	// ******* Object.preventExtensions() ******* //

	function PersonExt(name, surname) {
		this.name = name;
		this.surname = surname;

		Object.preventExtensions(this);
	};

	let DeveloperExt =  function(name, surname, knownLanguage) {
		PersonExt.apply(this, arguments);

		this.knownLanguage = knownLanguage;
	};

	let dev = new DeveloperExt('Mario', 'Rossi', 'JS');
	console.log(dev.knownLanguage); // undefined

	/*
	Although Object.preventExtensions() prevent members addition, we can still
	remove them and change using Object.defineProperty(). If we also need
	to prevent these changes, we have to use the Object.seal() method
	 */

	// ******* Object.seal() ******* //

	let PersonSeal = function(name, surname) {
		this.name = name;
		this.surname = surname;

		Object.seal(this);
	}

	let personSeal = new PersonSeal('Jhon', 'Smith');
	console.log(delete personSeal.name); // false
	console.log(personSeal.name); // 'John'

	/*
	 In 'use strict' any attempt to delete or change the property will throw
	 an erorr, so we need to check if the property can delete or change
	 */

	if (!Object.isSealed(personSeal)) {
		console.log(delete personSeal.name);
	}


	// ******* Object.freeze() ******* //

	/*
	Even if we cannot add or remove members to a sealed object nor modify their
	configuration, we can still change its members value. If want to make them
	read-only we can use Object.freeze()
	 */

	let personFreez = new PersonSeal('Jhon', 'Smith');

	Object.freeze(personFreez);

	personFreez.age = 32;
	console.log(personFreez.age);

	personFreez.name = 'Mario';
	console.log(personFreez.name);

	delete personFreez.name;
	console.log('after delete', personFreez.name);

	/*
	Object.defineProperty(
		personSeal,
		'name',
		{
			get: function () {
				return name; // TypeError: Cannot redefine property: name
			}
		}
	);
	*/
})();
