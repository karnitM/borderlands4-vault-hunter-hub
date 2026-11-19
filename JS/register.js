const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const registerButton = document.getElementById("register-button");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    registerMessage.textContent = "";

    if (password !== confirmPassword) {
        registerMessage.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 8) {
        registerMessage.textContent = "Password must be at least 8 characters.";
        return;
    }

    try {
        registerButton.disabled = true;
        registerMessage.textContent = "Creating your account...";

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Registration failed.");
        }

        alert("Account created successfully! You can now log in.");

        window.location.href = "login.html";

    } catch (error) {
        console.error("Registration error:", error);
        registerMessage.textContent = error.message;
        registerButton.disabled = false;
    }
});
