document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const userId = button.getAttribute('data-user-id');
            try {
                const response = await fetch(`http://localhost:4000/auth/delete-user/${userId}`, {
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
