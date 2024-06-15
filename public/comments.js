// Kör scriptet när filen är laddad
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsSection = document.getElementById('comments');

    // Fetch-funktion för att hämta posts från backend /posts
    // Sätter innerHTML direkt för att göra sidan sårbar
    const fetchComments = () => {
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                commentsSection.innerHTML = '';
                data.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
            
                    commentDiv.innerHTML = comment.content;
                    commentsSection.appendChild(commentDiv);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Skapar en ny post med fetch som skickas till endpointen /posts med metoden POST
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('content').value;

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
            .then(response => response.json())
            .then(data => {
                fetchComments(); // Hämta posts igen för att uppdatera sidan
                commentForm.reset(); // Rensa formuläret
            })
            .catch(error => console.error('Error:', error));
    });

    fetchComments(); // Kör fetchComments när sidan laddas
});
