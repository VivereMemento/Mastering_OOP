(function () {
	console.log('THIS IS MULTIPLE INHERITANCE');
	function Person(name, surname) {
		this.name = name;
		this.surname = surname;
	};

	function Developer(name, surname, knownLanguage) {
		Person.apply(this, arguments);

		this.knownLanguage = knownLanguage;
	}

	function Student(name, surname, subjectOfStudy) {
		Person.apply(this, arguments);

		this.subjectOfStudy = subjectOfStudy;
	}

	function DevStudent(name, surname, knownLanguage, subjectOfStudy) {
		Developer.call(this, name, surname, knownLanguage);
		Student.call(this, name, surname, subjectOfStudy);
	}

	let johnSmith = new DevStudent('Jhon', 'Smith', 'C#', 'JS');

	console.log(johnSmith.knownLanguage);
	console.log(johnSmith.subjectOfStudy);

	// ******* Creating and using mixins ******* //
	
	const myMixin = {
		getFullName: function () {
			return `${this.name} ${this.surname}`;
		}
	};

	/*
	In order to enable the mixing of the members, we need a specific function
	such as the following:
	 */
	
	function augment(destination, source, ...methodNames) {

		if (methodNames.length) {
			for (let methodName of methodNames) {
				if (source.hasOwnProperty(methodName)) {
					destination[methodName] = source[methodName];
				}
			}
		} else {
			for (let methodName in source) {
				if (source.hasOwnProperty(methodName)) {
					destination[methodName] = source[methodName];
				}
			}
		}
		
		return destination;
	};

	augment(DevStudent.prototype, myMixin, 'getFullName');
	console.log(johnSmith.getFullName());

	// ******* Multiple inheritance with Classes ******* //

	class PersonClass {
		constructor(name, surname) {
			this.name = name;
			this.surname = surname;
		}
	}

	function mixNamingWith(supercalss) {
		return class extends supercalss {
			getFullName() {
				return `${this.name} ${this.surname}`;
			}
		}
	};

	function mixMovingWith(supercalss) {
		return class extends supercalss {
			toMove() {
				return `${this.name} is moving`;
			}
		}
	};

	function mixStudingWith(supercalss) {
		return class extends supercalss {
			toStudy() {
				return `${this.name} is studing`;
			}
		}
	};
	
	// class ExtendedPerson extends mixNamingWith(PersonClass){};
	// console.log(marioRossi.getFullName());

	/*
		If we need to compose a class from many mixin, we can make nested
		calls to mixin function as shown here:
	 */
	 class ExtendedPerson extends mixNamingWith (
	 		mixMovingWith(
	 			mixStudingWith(
	 				PersonClass
 				)
	 		)
	 	) {};

 	let marioRossi = new ExtendedPerson('Mario', 'Rossi');
	console.log(marioRossi.getFullName());
	console.log(marioRossi.toMove());
	console.log(marioRossi.toStudy());
})();