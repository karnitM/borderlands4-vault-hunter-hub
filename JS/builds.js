/* BORDERLANDS 4 - COMMUNITY BUILDS */

// Images for each Vault Hunter
const hunterImages = {
    Vex: "Images/hunters/vex.png",
    Rafa: "Images/hunters/rafa.png",
    Amon: "Images/hunters/amon.png",
    Harlowe: "Images/hunters/harlowe.png",
    C4SH: "Images/hunters/c4sh.png",
    Loveless: "Images/hunters/loveless.png"
};

// Retrieve saved builds from MySQL
async function loadBuilds() {
    const buildsContainer = document.getElementById("saved-builds-list");

    try {
        const response = await fetch("/api/builds");

        if (!response.ok) {
            throw new Error("Could not retrieve saved builds");
        }

        const builds = await response.json();

        buildsContainer.replaceChildren();

        if (builds.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No community builds have been created yet.";
            buildsContainer.appendChild(message);
            return;
        }

        // Create a card for every saved build
        builds.forEach(function(build) {
            const card = document.createElement("article");
            card.className = "build-card";

            // Vault Hunter image
            const image = document.createElement("img");
            image.src = hunterImages[build.vault_hunter] || "";
            image.alt = build.vault_hunter + " character artwork";

            // Build name
            const name = document.createElement("h3");
            name.textContent = build.build_name;

            // Vault Hunter
            const hunter = document.createElement("p");
            hunter.className = "build-type";
            hunter.textContent = "Vault Hunter: " + build.vault_hunter;

            // Main weapon
            const weapon = document.createElement("p");
            weapon.textContent = "Main Weapon: " + build.main_weapon;

            // Build description
            const description = document.createElement("p");
            description.textContent = build.description;

            // Buttons container
            const actions = document.createElement("div");
            actions.className = "build-actions";

            // EDIT BUILD BUTTON
            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "edit-build-button";
            editButton.textContent = "Edit Build";

            editButton.addEventListener("click", function() {
                window.location.href = "edit-build.html?id=" + build.id;
            });

            // DELETE BUILD BUTTON
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-build-button";
            deleteButton.textContent = "Delete Build";

            deleteButton.addEventListener("click", async function() {
                const confirmed = confirm(
                    "Are you sure you want to delete '" +
                    build.build_name + "'?"
                );

                if (!confirmed) {
                    return;
                }

                try {
                    deleteButton.disabled = true;

                    const response = await fetch(
                        "/api/builds/" + build.id,
                        {
                            method: "DELETE"
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to delete build");
                    }

                    alert("Build deleted successfully!");

                    // Refresh builds from MySQL
                    await loadBuilds();

                } catch (error) {
                    console.error("Error deleting build:", error);

                    alert(
                        "Could not delete build. Please try again."
                    );

                    deleteButton.disabled = false;
                }
            });

            // Add buttons to container
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            // Add content to build card
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(hunter);
            card.appendChild(weapon);
            card.appendChild(description);
            card.appendChild(actions);

            // Display build card
            buildsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading builds:", error);

        buildsContainer.replaceChildren();

        const message = document.createElement("p");
        message.textContent = "Unable to load community builds.";
        buildsContainer.appendChild(message);
    }
}

// Load builds when the page opens
loadBuilds();
