document.addEventListener('DOMContentLoaded', (event) => {
    emailjs.init('AOisRiq_Wl-q0si93'); // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const from_name = document.querySelector('input[name="from_name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;

        // Send the form data using EmailJS
        emailjs.send("service_5pr6vkl", "template_gce56fh", {
            from_name: from_name,
            message: message,
            email: email
        })
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showModal('Your message has been sent successfully!');
                document.getElementById('contact-form').reset(); // Reset the form fields
            }, function (error) {
                console.log('FAILED...', error);
                showModal('Failed to send your message. Please try again.');
            });
    });

    function showModal(message) {
        var modal = document.getElementById("modal");
        var modalMessage = document.getElementById("modal-message");

        modalMessage.textContent = message;
        modal.style.display = "block";

        setTimeout(function () {
            modal.style.display = "none";
        }, 1000); // Hide the modal after 1 second
    }
});