(function () {
	console.log('THIS IS PATTERNS');

	// Singleton

	let Singleton = (function () {
		let instance;
		let counter = 0;

		return class {
			constructor() {
				if (!instance) {
					instance = this;
				}

				return instance;
			}

			newId() {
				return counter++;
			}
		}
	})();

	let a = new Singleton();

	console.log(a.newId());
	console.log(a.newId());
	
	let b = new Singleton();

	console.log(b.newId());

	// Factory
	
	class Developer {
		constructor(skills, benefits) {
			this.skills = ['programming'].concat(skills);
			this.salary = 40000;
			this.benefits = ['computer'].concat(benefits);
		}
	}

	class Salesman {
		constructor(skills, benefits) {
			this.skills = ['selling'].concat(skills);
			this.salary = 50000;
			this.benefits = ['computer'].concat(benefits);
		}
	}

	class BusinessAnalyst {
		constructor(skills, benefits) {
			this.skills = ['anylyzing'].concat(skills);
			this.salary = 60000;
			this.benefits = ['computer'].concat(benefits);
		}
	}

	class SoftwareHouse {
		constructor() {
			this.employees = [];
		}

		hireDeveloper() {
			let dev = new Developer(['JavaScript'], ['smartphone']);
			this.employees.push(dev);
		}

		hireSaleman() {
			let sm = new Salesman(['communication'], ['smartphone', 'car']);
			this.employees.push(sm);
		}

		hireBusinessAnalyst() {
			let ba = new BusinessAnalyst(['communication', 'writing'], ['smartphone', 'tablet']);
			this.employees.push(ba);
		}
	}

	// if we want to hire a new role, we need to add a new method
	// to the SoftwareHouse class, getting worse even more the situation
	
	// A better approach is to delegate to a specialized object the
	// task to hire people on behalf of the SoftwareHouse-a RecruitmentAgency,
	// the factory
	class SoftwareHouseWithFactory {
		constructor() {
			this.employees = [];
		}

		hireDeveloper(role, skills, benefits) {
			let agency = new RecruitmentAgency();
			let member = agency.getStaffMember(role, skills, benefits);
			this.employees.push(member);
		}
	}

	class RecruitmentAgency {
		getStaffMember(role, skills, benefits) {
			let member;
			switch(role.toLowerCase()) {
				case "dev":
					member = new Developer(skills, benefits);
					break;
				case "sale":
					member = new Salesman(skills, benefits);
					break;
				case "ba":
					member = new BusinessAnalyst(skills, benefits);
					break;
				default:
					throw new Error("Unable to hire people for the role " + role)
			}
			return member;
		}
	}
	const agency = new SoftwareHouseWithFactory();
	agency.hireDeveloper("dev", ["C++",  "C#"], ["tablet"]);
	agency.hireDeveloper("sale", ['communication'], ['smartphone', 'car']);
	agency.hireDeveloper("ba", ['communication', 'writing'], ['smartphone', 'tablet']);
	console.log(agency);


	// The implementation of the factory we have just shown is the most simple and
	// intuitive. However, it has a main drawback: when we need to add a new role
	// we should modify the RecruitmentAgency class.
	

	// FACTORY WITH CONSTRUCTOR REGISTRATION
	class RecruitmentAgencyWithRegistration {
		constructor() {
			this.objConstructors = {};
		}

		register(role, constructor) {
			this.objConstructors[role] = constructor;
		}
		getStaffMember(role, skills, benefits) {
			let objConstructor = this.objConstructors[role];
			let member;
			if (objConstructor) {
				member = new objConstructor(skills,benefits);
			}

			return member;
		}
	}

	class SoftwareHouseWithRegistration {
		constructor() {
			this.agency = new RecruitmentAgencyWithRegistration();
			this.employees = [];
		}

		registration(role, constructor) {
			this.agency.register(role, constructor);
		}

		hireDeveloper(role, skills, benefits) {
			let member = this.agency.getStaffMember(role, skills, benefits);
			this.employees.push(member);
		}
	}

	const agencyWithRegister = new SoftwareHouseWithRegistration();
	agencyWithRegister.registration('dev', Developer);
	agencyWithRegister.registration('ba', BusinessAnalyst);
	agencyWithRegister.registration('sale', Salesman);
	agencyWithRegister.hireDeveloper("dev", ["C++",  "C#"], ["tablet"]);
	agencyWithRegister.hireDeveloper("sale", ['communication'], ['smartphone', 'car']);
	agencyWithRegister.hireDeveloper("ba", ['communication', 'writing'], ['smartphone', 'tablet']);
	console.log(agencyWithRegister);

	// ABSTRACT FACTORY
	class RecruitmentAgencyAbstractFactory {
		constructor() {
			this.agencyFactories = {};
		}
		register(area, agencyFactory) {
			this.agencyFactories[area] = agencyFactory;
		}
		getAgency (area) {
			return new this.agencyFactories[area];
		}
	}
	
	class DevAgency {
		getStaffMember(skills, benefits) {
			return new Developer(skills, benefits);
		}
	}
	class SalesAgency {
		getStaffMember(skills, benefits) {
			return new Salesman(skills, benefits);
		}
	}
	class BusinessAnalystAgency {
		getStaffMember(skills, benefits) {
			return new BusinessAnalyst(skills, benefits);
		}
	}

	const agencyFinder = new RecruitmentAgencyAbstractFactory();
	agencyFinder.register("dev", DevAgency);
	agencyFinder.register("sales", SalesAgency);
	agencyFinder.register("ba", BusinessAnalystAgency);
	
	const devAgency = agencyFinder.getAgency("dev");
	const newDevMember = devAgency.getStaffMember(["JavaScript"],  ["phone"]);
})();