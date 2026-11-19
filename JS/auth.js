/* BORDERLANDS 4 - USER AUTHENTICATION */

async function updateNavigation() {
    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }

    try {
        const response = await fetch("/api/session", {
            credentials: "same-origin"
        });

        if (!response.ok) {
            throw new Error("Could not check login session");
        }

        const session = await response.json();

        if (!session.loggedIn) {
            return;
        }

        // Find the existing Login link
        const loginLink = Array.from(navLinks.querySelectorAll("a")).find(function (link) {
            return link.getAttribute("href") === "login.html";
        });

        if (loginLink) {
            loginLink.remove();
        }

        // Display the logged-in username
        const welcomeMessage = document.createElement("span");
        welcomeMessage.className = "nav-username";
        welcomeMessage.textContent = "Welcome, " + session.user.name;

        // Create Logout button
        const logoutButton = document.createElement("button");
        logoutButton.type = "button";
        logoutButton.className = "logout-button";
        logoutButton.textContent = "Logout";

        logoutButton.addEventListener("click", async function () {
            try {
                logoutButton.disabled = true;

                const response = await fetch("/api/logout", {
                    method: "POST",
                    credentials: "same-origin"
                });

                if (!response.ok) {
                    throw new Error("Logout failed");
                }

                alert("Logged out successfully!");

                window.location.href = "login.html";

            } catch (error) {
                console.error("Logout error:", error);
                alert("Could not log out. Please try again.");
                logoutButton.disabled = false;
            }
        });

        // Add username and Logout button to navigation
        navLinks.appendChild(welcomeMessage);
        navLinks.appendChild(logoutButton);

    } catch (error) {
        console.error("Authentication error:", error);
    }
}

// Check login session when page loads
updateNavigation();
