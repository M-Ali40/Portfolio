document.addEventListener('DOMContentLoaded', () => {
    const heroTextElement = document.getElementById('hero-text');
    const textToType = "TRANSMITTING REALITY_"; // Text for the hero section
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Milliseconds
    const deletingSpeed = 75;
    const delayBetweenWords = 2000;

    function type() {
        const currentText = textToType;
        if (isDeleting) {
            heroTextElement.textContent = currentText.substring(0, index - 1);
            index--;
        } else {
            heroTextElement.textContent = currentText.substring(0, index + 1);
            index++;
        }

        // Set the data-text attribute for the CSS glitch effect
        heroTextElement.setAttribute('data-text', heroTextElement.textContent);

        if (!isDeleting && index === currentText.length) {
            // Pause at end of word
            setTimeout(() => isDeleting = true, delayBetweenWords);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            // Optionally, cycle through different texts or restart
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    if (heroTextElement) {
        type();
    }

    // Section visibility and smooth scrolling
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Hide all sections first
                sections.forEach(section => {
                    section.classList.remove('active-section');
                    // We set display to none after transition for performance,
                    // but for immediate hiding before new one shows, this is okay.
                    // For a more robust solution with transitions, one might delay setting display:none
                });

                // Show the target section
                targetSection.classList.add('active-section');
                
                // Scroll to the section
                // Timeout to allow the display:block to take effect before scrolling
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Scrolls to the top of the target section
                    });
                }, 50); // Small delay for animation to start
            }
        });
    });

    // Optional: Add a subtle parallax effect to the hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
        });
    }
});
