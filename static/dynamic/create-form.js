document.addEventListener('DOMContentLoaded', () => {
	let getTitle = document.getElementById('title');
	let getContent = document.getElementById('content');

	let submitBtn = document.querySelector('.submit-button');
	submitBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log(getTitle.value, getContent.value);
		try {
			let response = await fetch('http://localhost:3003/pug/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify({
					title: getTitle.value,
					content: getContent.value
				})
			});

			if (response.ok) {
				window.location.href = '/pug';
			} else {
				const errorData = await response.json();
				console.error('Failed to create post:', errorData);
			}

			let json = await response.json();
			console.log('Post created:', json);
		} catch (error) {
			console.error('Error creating post:', error);
		}
	});
});
