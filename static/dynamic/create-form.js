document.addEventListener('DOMContentLoaded', () => {
	let getTitle = document.getElementById('title');
	let getContent = document.getElementById('content');

	let submitBtn = document.querySelector('.submit-button'); // Corrected selector
	submitBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log(getTitle.value, getContent.value);
		let response = await fetch('http://localhost:5000/pug/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({
				title: getTitle.value,
				content: getContent.value
			})
		})
		let json = await response.json()
	});
});
