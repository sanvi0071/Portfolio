document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const form = event.target;
    const formData = new FormData(form); // Collect form data

    try {
        const response = await fetch('http://localhost:3000/process-form', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.text(); // Get the response from the server

        // Show the server's response message
        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.innerHTML = `<p class="success-message">${result}</p>`;
            form.reset(); // Clear the form on success
        } else {
            responseMessage.innerHTML = `<p class="error-message">${result}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
    }
});
