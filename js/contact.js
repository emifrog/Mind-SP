// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            consent: document.getElementById('consent').checked
        };

        // Validate consent
        if (!formData.consent) {
            showMessage('Veuillez accepter la politique de confidentialité', 'error');
            return;
        }

        // Disable submit button during processing
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = 'Envoi en cours...';

        // Simulate form submission (replace with actual API call)
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Here you would normally send the data to your backend
            // Example:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // });

            // For demo purposes, we'll just show success
            console.log('Form Data:', formData);

            showMessage('Votre message a été envoyé avec succès ! Nous vous contacterons bientôt.', 'success');

            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Error:', error);
            showMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

// Show message function
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hide message after 5 seconds for success
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Form field validation and styling
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    // Add validation on blur
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#de382c';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    // Remove error styling on focus
    input.addEventListener('focus', () => {
        input.style.borderColor = '#0b57d0';
    });
});

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailPattern.test(emailInput.value)) {
            emailInput.style.borderColor = '#de382c';
            showMessage('Veuillez entrer une adresse email valide', 'error');
        }
    });
}

// Phone number formatting (optional)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters except + and spaces
        let value = e.target.value.replace(/[^\d\s+]/g, '');
        e.target.value = value;
    });
}

// Animate form elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe contact sections
const contactSections = document.querySelectorAll('.contact-info, .contact-form-wrapper');
contactSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    formObserver.observe(section);
});

// Animate info items
const infoItems = document.querySelectorAll('.info-item');
infoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    itemObserver.observe(item);
});

// Add loading animation for map
const mapIframe = document.querySelector('.map-container iframe');
if (mapIframe) {
    mapIframe.addEventListener('load', () => {
        mapIframe.style.opacity = '1';
    });
    mapIframe.style.opacity = '0';
    mapIframe.style.transition = 'opacity 0.5s ease';
}

console.log('%c Contact Page Loaded! ', 'background: linear-gradient(135deg, #0b57d0 0%, #00385F 100%); color: white; font-size: 14px; padding: 8px; border-radius: 5px;');
