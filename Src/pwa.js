const PWA = {
	init(){
		let deferredPrompt;
		const addBtn = document.querySelector('.install-button');
		const iconBtn = document.querySelector('.icon-button')
		addBtn.style.display = 'none';

		var mobileType = this.getMobileOperatingSystem();
		if( mobileType == "Android" ){
			iconBtn.name = 'logo-google-playstore'
		}else if( mobileType == "iOS" ){
			iconBtn.name = 'logo-apple-appstore'
		}else{
			iconBtn.name = 'storefront-outline'
		}

		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			deferredPrompt = e;
			// Update UI to notify the user they can add to home screen
			addBtn.style.display = 'flex';

			addBtn.addEventListener('click', (e) => {
				// hide our user interface that shows our A2HS button
				addBtn.style.display = 'none';
				// Show the prompt
				deferredPrompt.prompt();
				// Wait for the user to respond to the prompt
				deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						alert('A instalação pode demorar um pouco!\n\nPor favor fique na página!')
					} else {
						addBtn.style.display = 'flex'
					}
					deferredPrompt = null;
				});
			});
		});
	}
}
PWA.init()