
// Shared JS for index and contact pages.
document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.getElementById("typing");
    if (typingElement) {
        const text = "Welcome to my CS50! \\o/";
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            }
        }

        typeWriter();
    }

    const copyButton = document.getElementById("copy-email-btn");
    const emailText = document.getElementById("email-text");
    const copyFeedback = document.getElementById("copy-feedback");

    if (copyButton && emailText) {
        copyButton.addEventListener("click", async () => {
            const email = emailText.dataset.email || "";

            try {
                await navigator.clipboard.writeText(email);
                if (copyFeedback) {
                    copyFeedback.textContent = "Email copied successfully.";
                    copyFeedback.className = "mt-2 mb-0 small text-success";
                }
            } catch (error) {
                if (copyFeedback) {
                    copyFeedback.textContent = "Could not copy automatically. Please copy it manually.";
                    copyFeedback.className = "mt-2 mb-0 small text-danger";
                }
            }
        });
    }

    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const formFeedback = document.getElementById("form-feedback");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    if (contactForm && nameInput && emailInput) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const isNameValid = nameInput.value.trim().length > 3;
            const isEmailValid = emailInput.checkValidity();

            nameInput.classList.toggle("is-invalid", !isNameValid);
            emailInput.classList.toggle("is-invalid", !isEmailValid);

            if (nameError) {
                nameError.textContent = isNameValid ? "" : "Name must have at least 4 characters.";
            }

            if (emailError) {
                emailError.textContent = isEmailValid ? "" : "Please enter a valid email address.";
            }

            if (!isNameValid || !isEmailValid) {
                if (formFeedback) {
                    formFeedback.textContent = "Please correct the fields highlighted in red.";
                    formFeedback.className = "mt-2 mb-0 small text-danger";
                }
                return;
            }

            if (formFeedback) {
                formFeedback.textContent = "Message validated and ready to send.";
                formFeedback.className = "mt-2 mb-0 small text-success";
            }

            contactForm.reset();
            if (nameError) nameError.textContent = "";
            if (emailError) emailError.textContent = "";
        });
    }
});
