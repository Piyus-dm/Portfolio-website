// JavaScript to cycle through job titles
document.addEventListener("DOMContentLoaded", function () {
    const jobTitles = ["DIGITALIST", "DEVELOPER", "VISUALIZER", "FREELANCER"];
    let index = 0;
    const jobElement = document.getElementById('job-title');

    function changeJob() {
        jobElement.textContent = jobTitles[index];
        index = (index + 1) % jobTitles.length; // Cycle through the job titles
        setTimeout(changeJob, 2000); // Change job every 2 seconds
    }

    changeJob(); // Start changing jobs

    // Play/pause video on hover for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        const video = card.querySelector('video');
        
        card.addEventListener('mouseover', () => {
            video.play();
        });

        card.addEventListener('mouseout', () => {
            video.pause();
        });
    });

    // JavaScript for Form Submission Feedback
    const form = document.querySelector('#contact form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert("Thank you for your message! I’ll get back to you soon.");
            form.reset(); // Clear the form
        } else {
            alert("Oops! There was a problem. Please try again.");
        }
    });

    // JavaScript for scroll-triggered bounce effect on social icons
    const socialIcons = document.querySelectorAll('.social-icon');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bounce');
            } else {
                entry.target.classList.remove('bounce');
            }
        });
    });

    socialIcons.forEach(icon => {
        observer.observe(icon);
    });

    
    });


document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    // Toggle menu when hamburger icon is clicked
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu and add active class to selected link
    function closeMenu() {
        navMenu.classList.remove('active');
    }

    // Attach closeMenu function to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
            activateSection(link);
        });
    });

    // Activate the section and highlight the current link
    function activateSection(link) {
        // Remove active class from all links
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');

        // Activate the corresponding section
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
    }

    // Scroll and activate section based on scroll position
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 50) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});