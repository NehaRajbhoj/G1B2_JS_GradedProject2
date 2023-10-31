document.addEventListener("DOMContentLoaded", function () {
   
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
        window.location.href = "resume.html";  
    }

    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "owner" && password === "1234") {
           
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = "resume.html"; 
        } else {
            alert("Invalid username / password");
        }
    });
});
