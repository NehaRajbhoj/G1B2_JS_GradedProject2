document.addEventListener("DOMContentLoaded", function () {
    const applicantDetails = document.getElementById("applicantDetails");
    const jobFilter = document.getElementById("jobFilter");
    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");
    const errorMessage = document.getElementById("errorMessage");

    let applicants = [];
    let filteredApplicants = [];
    let currentIndex = 0;

    function fetchApplicantData() {
        fetch("applicants.json")
            .then(response => response.json())
            .then(data => {
                applicants = data.resume;
                displayApplicantDetails(applicants);
            })
            .catch(error => {
                console.error("Error fetching JSON data: ", error);
            });
    }

    fetchApplicantData();

    function displayApplicantDetails(applicants) {
        if (applicants.length === 0) {
            errorMessage.textContent = "No applications available.";
            applicantDetails.innerHTML = "";
            previousButton.style.display = "none";
            nextButton.style.display = "none";
            return;
        }

        errorMessage.textContent = "";
        filteredApplicants = applicants.filter(applicant =>
            applicant.basics.AppliedFor.toLowerCase().includes(jobFilter.value.trim().toLowerCase())
        );

        if (filteredApplicants.length === 0) {
            errorMessage.textContent = "No applications for this job.";
            applicantDetails.innerHTML = "";
            previousButton.style.display = "none";
            nextButton.style.display = "none";
            return;
        }

        const applicant = filteredApplicants[currentIndex];
        applicantDetails.innerHTML = `
        
        <div class="title">
        <div class="text">
            <h1>${applicant.basics.name}</h1>
            <p><b>Applied For: ${applicant.basics.AppliedFor}</b></p>
        </div>
        <div class="icon">
            <i class="fa fa-user-alt" style="font-size: 100px"></i>
        </div>
        </div> 
        <div class="container">
            <div class="personal-info">
                <p><h3>Personal Information</h3></p>
                <ul>
                    <p>${applicant.basics.phone}</p>
                    <p>${applicant.basics.email}</p>
                    <p><a href="${applicant.basics.profiles.url}" target="_blank">LinkedIn</a></p>
                    <p>${applicant.basics.location.city}, ${applicant.basics.location.state}</p>
                </ul>
                <div class="skills">
                    <h3>Technical Skills</h3>
                    <p><b>Name:</b></p>
                    <p>${applicant.skills.name}</p>
                    <p><b>Level:</b></p>
                    <p>${applicant.skills.level}</p>
                    <p><b>Keywords:</b></p>
                    <ul id="skills-list">
                    </ul>
                </div>
                <div class="hobbies">
                    <h3>Hobbies</h3>
                    <ul id="hobbies-list"> 
                    </ul>
                </div>
            </div>
                <div class="work-container">
                    
                    <p><h2> Work Experience in previous company</h2></p>
                    <ul>
                    <p><b> Company Name: </b>${applicant.work.CompanyName}</p>
                    <p><b> Position: </b>${applicant.work.Position}</p>
                    <p><b> Start Date:</b> ${applicant.work.StartDate}</p>
                    <p><b> End Date:</b> ${applicant.work.EndDate}</p>
                    <p><b> Summary: </b>${applicant.work.Summary}</p>
                    </ul>
                    <p><h2>Projects</h2></p>
                    <ul>
                    <p><b>${applicant.projects.name} :</b> ${applicant.projects.description}</p>
                    </ul>
                    <p><h2>Education</h2></p>
                    <p>
                        <ul>
                            <li><b>UG:</b> ${applicant.education.UG.institute}, ${applicant.education.UG.course}, ${applicant.education.UG.StartDate}, ${applicant.education.UG.EndDate}, ${applicant.education.UG.cgpa}</li>
                            <li><b>PU:</b> ${applicant.education.SeniorSecondary.institute}, ${applicant.education.SeniorSecondary.cgpa}</li>
                            <li><b>High School:</b> ${applicant.education.HighSchool.institute}, ${applicant.education.HighSchool.cgpa}</li>                            
                        </ul>
                    </p>
                    <p><h2>Internship</h2></p>
                    <p>
                        <ul>
                            <li><b>Company Name:</b> ${applicant.Internship.CompanyName}</li>
                            <li><b>Position:</b> ${applicant.Internship.Position} </li>
                            <li><b>Start Date:</b> ${applicant.Internship.StartDate}</li>    
                            <li><b>End Date:</b> ${applicant.Internship.EndDate}</li>
                            <li><b>Summary:</b> ${applicant.Internship.Summary}</li>                        
                        </ul>
                    </p>
                    <p><h2>Achievements</h2></p>
                    <p><ul><li> ${applicant.achievements.Summary}</li></ul></p>
                </div>
                
            </div>
            
        `;

        const skillsList = document.getElementById("skills-list");
        const skills = applicant.skills.keywords;

        skills.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
        });

        const hobbiesList = document.getElementById("hobbies-list");
        const hobbies = applicant.interests.hobbies;

        hobbies.forEach(hobby => {
            const listItem = document.createElement("li");
            listItem.textContent = hobby;
            hobbiesList.appendChild(listItem);
        });


        if (filteredApplicants.length > 1) {
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            previousButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === filteredApplicants.length - 1;
        } else {
            previousButton.style.display = "none";
            nextButton.style.display = "none";
        }
    }

    previousButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            displayApplicantDetails(filteredApplicants);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < filteredApplicants.length - 1) {
            currentIndex++;
            displayApplicantDetails(filteredApplicants);
        }
    });

    jobFilter.addEventListener("input", function () {
        currentIndex = 0;
        displayApplicantDetails(applicants);
    });

});

