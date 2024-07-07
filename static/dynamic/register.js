document.addEventListener('DOMContentLoaded', () => {
	let getUsername = document.getElementById('username');
	let getPassword = document.getElementById('password');

	let submitBtn = document.querySelector('button');
	submitBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log(getUsername.value, getPassword.value);
		let response = await fetch('http://localhost:3000/auth/register', {
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
		console.log(json); // Log the response for debugging
	});
});
