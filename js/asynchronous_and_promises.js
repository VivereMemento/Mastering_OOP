(function () {
	console.log('THIS IS ASYNCHRONOUS PROGRAMMING AND PROMISES');

	let contextOfThis = (function () {

		const init = function() {
			console.log('This is context of this');
			let myBtn = new myButton("btn", "Click me!", "Clicked!");
		}

		function myButton(id, standardText, clickedText) {
			this.id = id;
			this.standardText = standardText;
			this.clickedText = clickedText;

			let btn = document.getElementById(this.id);

			btn.innerHTML = this.standardText;
			// btn.addEventListener("click", function() {
			// 	btn.innerHTML= this.clickedText;
			// });
			
			// let clickHandler = (function(){
			// 	btn.innerHTML= this.clickedText;
			// }).bind(this);
			// btn.addEventListener("click", clickHandler);

			btn.addEventListener("click", () => {
				btn.innerHTML= this.clickedText;
			});
		}
		
		return {
			init: init
		}
	}());
	contextOfThis.init();

	let creatingPromis = (function () {

		let init = function () {
			myPromise.then(function(data) {
				console.log('this is data of promise:', data.name);
				return httpGet('https://www.json-generator.com/api/json/get/clvfzayBea?indent=2');
			}).then((data) => {
				console.log('this is data of another promise', data.various.Hubmburger);
				return httpGet('http://www.json-generator.com/api/json/get/bUKepXQcgO?indent=2');
			}).then((data) => {
				console.log('this is data of another promise', data.person);
			}).catch((error) => {
				console.log(error);
			});
		}

		// The Promise() constructor takes a function as an argument whose task is to manage the
		// fulfillment or rejection of the Promise. Typically, a Promise handler has the following
		// structure:
		
				// var promise = new Promise(function(resolve, reject) {
				// 	if (condition)  {  //some condition
				// 		resolve(value);  //successfully resolve the Promise
				// 	} else {
				// 		reject(reason);  //reject the Promise and specify the reason
				// 	}
				// });

		// In order to show how to concretely create a Promise, let's write the httpGet() function
		function httpGet(url) {
			return new Promise(function(resolve, reject) {
				var httpReq = new XMLHttpRequest();
				httpReq.onreadystatechange = function() {
					var data;
					if (httpReq.readyState == 4) {
						if (httpReq.status == 200) {
							data = JSON.parse(httpReq.responseText);
								resolve(data);
						} else {
							reject(new Error(httpReq.statusText));
						}
					}
				};
				httpReq.open("GET", url, true);
				httpReq.send();
			});
		}

		// Since a Promise is an object, it can be used as any other object; it can be stored in a variable,
		// passed as a parameter, returned by a function and so on. For example, we can store the
		// promise returned by the httpGet() function in a variable, as shown by the following code:
		var myPromise = httpGet('https://www.json-generator.com/api/json/get/clvfzayBea?indent=2');
		
		return {
			init: init
		}
	}());
	creatingPromis.init();
	
}());