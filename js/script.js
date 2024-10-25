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

    // Sticky navigation logic
    const navbar = document.querySelector('.sticky-nav'); // Ensure this matches your HTML
    const stickyOffset = navbar.offsetTop;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > stickyOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
});