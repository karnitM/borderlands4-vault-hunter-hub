const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginButton = document.getElementById("login-button");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    loginMessage.textContent = "";

    try {
        loginButton.disabled = true;
        loginMessage.textContent = "Logging in...";

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Login failed.");
        }

        alert("Welcome back, " + result.user.name + "!");

        window.location.href = "index.html";

    } catch (error) {
        console.error("Login error:", error);
        loginMessage.textContent = error.message;
        loginButton.disabled = false;
    }
});
