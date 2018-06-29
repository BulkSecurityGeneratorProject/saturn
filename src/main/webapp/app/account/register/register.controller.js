var Mailgun = require('mailgun-js');
(function () {
	'use strict';

	angular
		.module('saturnApp')
		.controller('RegisterController', RegisterController);


	RegisterController.$inject = ['$timeout', 'Auth', 'LoginService'];

	function RegisterController($timeout, Auth, LoginService) {
		var vm = this;

		vm.doNotMatch = null;
		vm.error = null;
		vm.errorUserExists = null;
		vm.login = LoginService.open;
		vm.register = register;
		vm.registerAccount = {};
		vm.success = null;
		vm.RegisterEmail = RegisterEmail

		//api key, from Mailgun’s Control Panel
		var api_key = '185a9ec42394418026dc0e7743516e2c-e44cc7c1-d40bc8dc';
		//Your domain, from the Mailgun Control Panel
		var domain = 'sandbox8709642eb8bc4561b5b38fa969f589c6.mailgun.org';
		//Your sending email address
		var from_who = 'Excited User <excited@samples.mailgun.org';

		$timeout(function () {
			angular.element('#email').focus();
		});

		function register() {
			RegisterEmail();
			if (vm.registerAccount.password !== vm.confirmPassword) {
				vm.doNotMatch = 'ERROR';
			} else {
				vm.registerAccount.langKey = 'en';
				vm.registerAccount.login = vm.registerAccount.email;
				vm.doNotMatch = null;
				vm.error = null;
				vm.errorUserExists = null;
				vm.errorEmailExists = null;

				Auth.createAccount(vm.registerAccount).then(function () {
					vm.success = 'OK';
				}).catch(function (response) {
					vm.success = null;
					if (response.status === 400 && response.data === 'login already in use') {
						vm.errorUserExists = 'ERROR';
					} else if (response.status === 400 && response.data === 'e-mail address already in use') {
						vm.errorEmailExists = 'ERROR';
					} else {
						vm.error = 'ERROR';
					}
				});
			}
		}



		// Send a message to the specified email address
		function RegisterEmail() {

		    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
				// email data
		    var data = {

		      from: from_who,
		    //The email to contact
		      to:  vm.registerAccount.email,
		    //Subject and text data
		      subject: 'Hello from Mailgun',
		      html: 'Hello, This is not a plain-text email, I wanted to test some'
		    	}
		    };
		}
	})();
