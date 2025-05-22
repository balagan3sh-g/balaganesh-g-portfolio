/**
 * Balaganesh G Portfolio - Main JavaScript
 * Handles interactive elements like the tabbed interface
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for personal interests section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get the tab to activate
            const tabToActivate = button.getAttribute('data-tab');

            // Find and activate the corresponding tab pane
            document.getElementById(tabToActivate).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 70, // Offset for header height
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message

            const formData = new FormData(this);
            const formValues = {};

            formData.forEach((value, key) => {
                formValues[key] = value;
            });

            console.log('Form submitted with values:', formValues);

            // Display success message
            const formMessageDiv = document.getElementById('form-message');
            if (formMessageDiv) {
                formMessageDiv.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessageDiv.style.color = 'green';
                formMessageDiv.style.padding = '10px';
                formMessageDiv.style.border = '1px solid green';
                formMessageDiv.style.borderRadius = '4px';
                formMessageDiv.style.textAlign = 'center';
                setTimeout(() => {
                    formMessageDiv.textContent = '';
                    formMessageDiv.style.display = 'none'; // Hide after a few seconds
                }, 5000);
            }

            // Reset the form
            this.reset();
        });
    }

    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Get all sections
        const sections = document.querySelectorAll('section');

        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        let activeSectionId = null;

        // Determine which section is currently active
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Adjusted offset: header height (70) + 10px buffer
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionId = section.getAttribute('id');
            }
        });

        // Special handling for the last section when scrolled to the bottom
        if ((windowHeight + scrollPosition) >= (bodyHeight - 50)) { // 50px buffer from true bottom
            activeSectionId = 'contact'; // Force contact section to be active
        }

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Animation for project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');

    // Simple function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add animation class when scrolling
    window.addEventListener('scroll', function() {
        projectCards.forEach(card => {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize project cards with opacity 0 and transform
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Trigger scroll event once to check initial viewport
    window.dispatchEvent(new Event('scroll'));

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    function setTheme(theme) {
        if (!body || !themeToggle) {
            console.error('setTheme: Body or themeToggle not found');
            return;
        }
        console.log('Setting theme to:', theme);
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            console.log('Applied dark mode and sun icon');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            console.log('Applied light mode and moon icon');
        }
    }

    if (themeToggle && body) {
        // Event listener for theme toggle button
        themeToggle.addEventListener('click', () => {
            console.log('Theme toggle button clicked (event listener).');
            const currentTheme = body.getAttribute('data-theme');
            console.log('Current theme (event listener):', currentTheme);
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            console.log('New theme will be (event listener):', newTheme);
            setTheme(newTheme);
        });

        // Initial theme setup
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            } else {
                setTheme('light'); // Default to light if no preference
            }
        }
    } else {
        if (!themeToggle) console.error('Theme toggle button not found in DOMContentLoaded!');
        if (!body) console.error('Body element not found in DOMContentLoaded!');
    }
}); // End of DOMContentLoaded
