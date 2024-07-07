document.addEventListener('DOMContentLoaded', () => {
	let getUsername = document.getElementById('username');
	let getPassword = document.getElementById('password');
	let submitBtn = document.querySelector('button');
	submitBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log('Username:', getUsername.value); // Debugging line
		console.log('Password:', getPassword.value); // Debugging line
		let response = await fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				username: getUsername.value,
				password: getPassword.value
			})
		});
		let json = await response.json();
	});
});
