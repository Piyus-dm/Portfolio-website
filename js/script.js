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

    
});
