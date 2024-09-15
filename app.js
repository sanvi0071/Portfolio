document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form); 

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

        const result = await response.text(); 

      
        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.innerHTML = `<p class="success-message">${result}</p>`;
            form.reset(); 
        } else {
            responseMessage.innerHTML = `<p class="error-message">${result}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
    }
});
