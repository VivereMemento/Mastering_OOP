//The user interface problems
// The main reason for this complexity lies in the management of three aspects
// of the interaction between the user and the application: the state, the logic,
// and the synchronization.


// The state is the set of information that represents the current picture of the
// user interface. It determines what the user sees at a given time and how it can
// interact with the application.

// The logic is the set of operations that can be done on the elements of an
// interface in order to show or hide data or to make validation. It may be very
// complex depending on the type of processing to be performed on the data
// presented to the user.

//The synchronization concerns those activities that map data shown to the user
//with data represented by the business objects managed by the application.
(function () {
	console.log('THIS IS PRESENTATION');
	// var txtName;
	// var txtSurname;
	// var btnSave;
	// var divMessage;
	// var arr = [];

	// function Person(name, surname) {
	// 	this.name = name;
	// 	this.surname = surname;
	// }
	// function savePerson(person) {
	// 	//Persist data or send it to a server
	// 	console.log("Saved!");
	// 	arr.push(person);
	// 	console.log(arr);
	// }
	// window.onload = function() {
	// 	txtName = document.getElementById("txtName");
	// 	txtSurname = document.getElementById("txtSurname");
	// 	btnSave = document.getElementById("btnSave");
	// 	btnReset = document.getElementById("btnReset");
	// 	divMessage = document.getElementById("divMessage");
  
  
	// 	btnSave.onclick = function() {
	// 		var person = new Person(txtName.value, txtSurname.value);
	// 		txtName.value = person.name;
	// 		txtSurname.value = person.surname;
	// 		if (txtName.value && txtSurname.value) {
	// 			person.name = txtName.value;
	// 			person.surname = txtSurname.value;
	// 			savePerson(person);
	// 			divMessage.innerHTML = "Saved!";
	// 		} else {
	// 			divMessage.innerHTML = "Please, enter name and surname!";
	// 		}
	// 	};
	// 	btnReset.onclick = function() {
	// 		txtName.value = "";
	// 		txtSurname.value = "";
	// 		console.log(arr);
	// 	};
	// };

	// MVC
	const MVC = (function () {
		
		const init = function () {
			console.log('This is MVC');
			let model = new Model("John", "Smith");
			let controller = new Controller();
			let view = new View(model, controller);
			controller.initialize(model, view);
		}

		const Model = (function () {
			class Model {
					constructor(name, surname) {
						this.name = name;
						this.surname = surname;
					}
				}

			return Model;
		}());

		const View = (function () {
			class View {
				constructor(model, controller) {
					let self = this;
					let txtName = document.getElementById("txtName");
					let txtSurname = document.getElementById("txtSurname");
					let btnSave = document.getElementById("btnSave");
					let btnReset = document.getElementById("btnReset");
					self.controller = controller;

					txtName.value = model.name;
					txtSurname.value = model.surname;

					btnSave.onclick = function () {
						self.changeDataOfModel();
						
					};
					btnReset.onclick = function () {
						self.clear();
					};
				}

				clear() {
					let txtName = document.getElementById("txtName");
					let txtSurname = document.getElementById("txtSurname");
					let divMessage = document.getElementById("divMessage");
					txtName.value = "";
					txtSurname.value = "";
					divMessage.innerHTML = "";
				};

				message(message) {
					let divMessage = document.getElementById("divMessage");
					divMessage.innerHTML = message;
				};

				changeDataOfModel() {
					let txtName = document.getElementById("txtName");
					let txtSurname = document.getElementById("txtSurname");
					let data = {
							name: txtName.value,
							surname: txtSurname.value
						};
					this.controller.processDataOfModel(data);
					
				};
			}

			return View;
		}());

		const Controller = (function () {
			class Controller {
				initialize(model, view) {
					this.model = model;
					this.view = view;
				}
				processDataOfModel(data) {
					if (data.name && data.surname) {
						this.model.name = data.name;
						this.model.surname = data.surname;
						this.view.message(`You saved ${this.model.name} ${this.model.surname}`);
					} else {
						this.view.message("Please, enter name and surname!");
					}
				}
			}
			return Controller;
		}());

		return {
			init: init
		}

	}());
	// MVC.init();
	

	// MVP
	const MVP = (function () {

		const init = function () {
			console.log('This is MVP');
			var model = new Model("John", "Smith");
			var presenter = new Presenter();
			var view = new View(presenter);
			presenter.initialize(model, view);
		}

		const Model = (function () {
			class Model {
					constructor(name, surname) {
						this.name = name;
						this.surname = surname;
					}
				}

			return Model;
		}());

		class View {
			constructor(presenter) {
				var self = this;
				var btnSave = document.getElementById("btnSave");
				var btnReset = document.getElementById("btnReset");

				self.presenter = presenter;
				btnSave.onclick = function() {
					self.save();
				};
				btnReset.onclick =  function() {
					self.clear();
				};
			}
			clear() {
				var txtName = document.getElementById("txtName");
				var txtSurname = document.getElementById("txtSurname");
				var divMessage = document.getElementById("divMessage");
				txtName.value = "";
				txtSurname.value = "";
				divMessage.innerHTML = "";
			}
			set message(message) {
				var divMessage = document.getElementById("divMessage");
				divMessage.innerHTML = message;
			}
			set name(value) {
				var txtName = document.getElementById("txtName");
				txtName.value = value;
			}
			set surname(value) {
				var txtSurname = document.getElementById("txtSurname");
				txtSurname.value = value;
			}
			save() {
				var txtName = document.getElementById("txtName");
				var txtSurname = document.getElementById("txtSurname");
				var data = {
						name: txtName.value,
						surname: txtSurname.value
					};
				this.presenter.save(data);
			}
		}

		class Presenter {
			initialize(model,view) {
				this.model = model;
				this.view = view;
				this.view.name = this.model.name;
				this.view.surname = this.model.surname;
			}
			save(data) {
				if (data.name && data.surname) {
				this.model.name = data.name;
				this.model.surname = data.surname;
				this.view.message = `You saved ${this.model.name} ${this.model.surname}`;
				} else {
					this.view.message = "Please, enter name and surname!";
				}
			}
		}

		return {
			init: init
		}
	}());
	MVP.init();
	
	const MVVM = (function () {

		const init = function() {
			console.log('This is MVVM');
			var model = new Model("John", "Smith");
			var viewModel = new ViewModel(model);
			var view = new View(viewModel);
		}

		const Model = (function () {
			class Model {
					constructor(name, surname) {
						this.name = name;
						this.surname = surname;
					}
				}

			return Model;
		}());

		class View {
			constructor(modelView) {
				var self = this;
				var txtName = document.getElementById("txtName");
				var txtSurname = document.getElementById("txtSurname");
				var btnSave = document.getElementById("btnSave");
				var btnReset = document.getElementById("btnReset");
				self.modelView = modelView;
				txtName.value = modelView.name;
				txtSurname.value = modelView.surname;
				btnSave.onclick = function() {
					self.save();
				};
				btnReset.onclick =  function() {
					self.clear();
				};
			}

			clear() {
				var txtName = document.getElementById("txtName");
				var txtSurname = document.getElementById("txtSurname");
				var divMessage = document.getElementById("divMessage");
				txtName.value = "";
				txtSurname.value = "";
				divMessage.innerHTML = "";
			}
			setMessage(message) {
				var divMessage = document.getElementById("divMessage");
				divMessage.innerHTML = message;
			}
			save() {
				var txtName = document.getElementById("txtName");
				var txtSurname = document.getElementById("txtSurname");
				var data = {
					name: txtName.value,
					surname: txtSurname.value
				};
				this.modelView.save(data, this.setMessage);
			}
		}

		class ViewModel {
			constructor(model) {
				this.model = model;
			}
			get name() {
				return this.model.name;
			}
			get surname() {
				return this.model.surname;
			}
			save(data, callback) {
				if (data.name && data.surname) {
					this.model.name = data.name;
					this.model.surname = data.surname;

					if (callback) {
						callback("Saved!");
					}
				} else {
					if (callback) {
						callback("Please, enter name and surname!");
					}
				}
			}
		}

		return {
			init: init
		}
	}());
	// MVVM.init();
	
})();
const addMessage = (function () {
	const init = function (msg) {
		let model = new Model(msg);
		let controller = new Controller();
		let view = new View(model, controller);
		controller.initialize(model, view);
		controller.action();
	};

	const Model = (function () {

		class Model {
			constructor(message) {
				this.message = message;
			}
		}
		return Model;
	})();

	const View = (function () {
		class View {
			constructor(model, controller) {
				let self = this;
				self.controller = controller;
				self.message = model.message;
				let btnSave = document.getElementById("btnSave");
				var btnReset = document.getElementById("btnReset");

				// btnSave.onclick = function() {
				// 	self.changeMessage();
				// };

				// btnReset.onclick =  function() {
				// 	self.controller.action();
				// 	self.changeMessage();
				// };

			}

			createElement(message) {
				let elem = `<div class="message-about">
								<div class="message-about__content">${message}</div>
							</div>`;
				return elem;
			};

			addElement() {
				document.body.insertAdjacentHTML('afterBegin', this.createElement(this.message));

				let timerVisible = setTimeout(() => {
					this.doVisible();
					clearTimeout(timerVisible);
				},0);

				let timerDelete = setTimeout(() => {
					this.deleteElement()
					clearTimeout(timerDelete);
				},5000);
			};

			doVisible() {
				const content = document.querySelector('.message-about__content');
				content.style.opacity = 1;
			};

			deleteElement() {
				const elem = document.querySelector('.message-about');
				const content = document.querySelector('.message-about__content');
				content.style.opacity = 0;
				content.addEventListener('transitionend', () => {
					document.body.removeChild(elem);
				});
				
			};

			changeMessage() {
				var txtName = document.getElementById("txtName");
				var data = {
						message: txtName.value,
					};
				this.controller.saveMessage(data);
			}

			setMessage(message) {
				const content = document.querySelector('.message-about__content');
				const divMessage = document.getElementById("divMessage");
				divMessage.innerHTML = message;
				content.innerHTML = this.controller.model.message;
			};
		}
		return View;
	})();

	const Controller = (function () {
		class Controller {
			initialize(model, view) {
				this.model = model;
				this.view = view;
			}
			action() {
				this.view.addElement();
			}

			saveMessage(data) {
				if (data.message) {
					this.model.message = data.message;
				} else {
					this.view.setMessage("Please, enter name and surname!");
				}
			}
		}
		return Controller;
	}());

	return {
		init: init
	}
})();
addMessage.init("Привет Саша");