document.addEventListener('DOMContentLoaded', () => {
    let getContent = document.getElementById('content');

    let submitBtn = document.querySelector('.submit-button');
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            let postId = window.location.pathname.split('/').pop(); // Extract postId from URL
            let response = await fetch(`http://localhost:3000/pug/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    content: getContent.value
                })
            });

            if (response.ok) {
                window.location.href = `/pug`;
            } else {
                const errorData = await response.json();
                console.error('Failed to create comment:', errorData);
                alert('Failed to create comment');
            }
        } catch (error) {
            console.error('Error creating comment:', error);
            alert('An error occurred while creating the comment');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const postId = button.getAttribute('data-post-id');
            console.log(1)
            try {
                const response = await fetch(`http://localhost:4000/pug/delete/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });

                if (response.ok) {
                    button.closest('ul.post-list').remove();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete post:', errorData);
                    alert('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('An error occurred while deleting the post');
            }
        });
    });
});
