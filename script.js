// Function to load content into the main section
async function showSection(sectionId) {
    const mainContent = document.getElementById('main-content');
    try {
        const response = await fetch(`pages/${sectionId}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        mainContent.innerHTML = html;
        
        // Scroll to top after content is loaded
        window.scrollTo(0, 0);

        // Re-attach event listeners for newly loaded content if necessary (e.g., FAQ, contact form)
        if (sectionId === 'faq') {
            document.querySelectorAll('.faq-question').forEach(question => {
                question.onclick = function() { toggleFAQ(this); };
            });
        }
        if (sectionId === 'contacto') {
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                alert('¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos dentro de 24 horas.');
                this.reset();
            });
        }

    } catch (error) {
        console.error('Error loading section:', error);
        mainContent.innerHTML = `<p>Error loading content for ${sectionId}. Please try again later.</p>`;
    } finally {
        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
    }
}

// Toggle mobile menu
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// Toggle FAQ
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    // Close all answers
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
    });
    
    // Open the selected one if it was not active
    if (!isActive) {
        answer.classList.add('active');
    }
}

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.menu-toggle');
    
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});