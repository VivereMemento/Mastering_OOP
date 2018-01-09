(function () {
	console.log('THIS IS DUCK TYPING');
	class SoftHouse {
		constuctor() {
			this.employees = [];
		}

		hire (dev) {
			if (dev && dev['writeCode'] && dev['writeCode'] instanceof Function) {
				this.employees.push(dev);
			} else {
				throw new Error('The argument do not implements writeCode method')
			}
		}
	}

	// This approach works but it tends to make he hire() method very verbose,
	// especially if more than one member has to be checked.

	// In a more readable and generic approach, we can define a private
	// function that checks if an object implements a specific method:

	let SoftwareHouse = (function () {
		function implementsMethod(obj, method) {
			return !!(obj && obj[method] && obj[method] instanceof Function);
		}
		function implementsProperty(obj, method) {
			return !!(obj && obj[property] && !obj[property] instanceof Function);
		}

		return class {
			constuctor() {
				this.employees = [];
			}

			hire (dev) {
				if (implementsMethod(dev, 'writeCode') && implementsProperty(dev, 'name')) {
					this.employees.push(dev);
				} else {
					throw new Error('The argument does not implement writeCode method');
				}
			}
		}
	})();
	console.log(SoftwareHouse);
	// Note that we used the double not operator in order to force the conversion to Boolean,
	// when the property or method is undefined.
})();