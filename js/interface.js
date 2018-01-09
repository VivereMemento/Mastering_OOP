(function () {
	console.log('THIS IS INTERFACE')
	class Interface {
		constructor(name, method=[], properties=[]) {
			this.name = name;
			this.method = [];
			this.properties = [];

			for (let i = 0, len = method.length; i < len; i++) {
				if (typeof method[i] !== 'string') {
					throw new Error('Interface constructor expects method names to be passed in as a string.');
				}
				this.method.push(method[i]);
			}

			for (let i = 0, len = properties.length; i < len; i++) {
				if (typeof method[i] !== 'string') {
					throw new Error('Interface constructor expects property names to be passed in as a string.');
				}
				this.properties.push(properties[i]);
			}
		}

		isImplementedBy(obj) {
			let methodLen = this.method.length;
			let propertiesLen = this.properties.length;
			let currentMember;

			if (obj) {
				// check method
				for (let i = 0; i < methodLen; i++) {
					currentMember = this.method[i];
					if (!obj[currentMember] || typeof obj[currentMember] !== 'function') {
						throw new Error(`The object does not implement the interface
						${this.name}. Method ${currentMember} not found`);
					}
				}

				// check properties
				for (let i = 0; i < propertiesLen; i++) {
					currentMember = this.properties[i];
					if (!obj[currentMember] || typeof obj[currentMember] === 'function') {
						throw new Error(`The object does not implement the interface
						${this.name}. Property ${currentMember} not found`);
					}
				}
			} else {
				throw new Error('No object to check');
			}
		}
	};


	const IHireable = new Interface("IHireable", ["writeCode"],  ["name"]);
	const ITeamLeadership = new Interface('ITeamLeadership', ['delegateTo', 'motivate'], ['team']);
	const IFullName = new Interface('IFullName', ['getFullName']);

	class SoftwareHouse {
		constructor() {
			this.employees = [];
		}
		hire(employee) {

			if(employee instanceof Developer) {
				IHireable.isImplementedBy(employee);
			};

			ITeamLeadership.isImplementedBy(employee);
			this.employees.push(employee);
		}

		listEmployees() {
			let employeesLen = this.employees.length;
			let currentEmployee;

			for (let i = 0; i < employeesLen; i++) {
				currentEmployee = this.employees[i];

				IFullName.isImplementedBy(currentEmployee);
				console.log(currentEmployee.getFullName());
			}
		}
	};


	class Developer {
		constructor(name, surname) {
			this.name = name;
			this.surname = surname;
			this.team = [];
		}

		getFullName() {
			return `${this.name} ${this.surname}`;
		}

		writeCode() {console.log(`${this.name} ${this.surname} can write code`)};
		delegateTo() {console.log(`${this.name} ${this.surname} can delegate to`)};
		motivate() {console.log(`${this.name} ${this.surname} can motivate`)};
	};

	const johnSmith = new Developer('John', 'Smith');

	class Salesman {
		constructor(name, surname) {
			this.firstName = name;
			this.secondName = surname;
			this.team = [];
		}

		getFullName() {
			return `${this.firstName} ${this.secondName}`;
		}

		delegateTo() {console.log(`${this.name} ${this.surname} can delegate to`)};
		motivate() {console.log(`${this.name} ${this.surname} can motivate`)};
	};

	const marioRossi = new Salesman('Mario', 'Rossi');

	class BusinessAnalyst {
		constructor(fullName) {
			this.fullName = fullName;
			this.team = [];
		}

		getFullName() {
			return `${this.fullName}`;
		}
		delegateTo() {console.log(`${this.name} ${this.surname} can delegate to`)};
		motivate() {console.log(`${this.name} ${this.surname} can motivate`)};
	};

	const bobFucker = new BusinessAnalyst('Bob Fucker');

	const VIP = new SoftwareHouse();
	VIP.hire(johnSmith);
	VIP.hire(marioRossi);
	VIP.hire(bobFucker);
	console.log(VIP);
	console.log(VIP.listEmployees());
})();