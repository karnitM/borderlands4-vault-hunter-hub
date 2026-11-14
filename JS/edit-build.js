const editForm = document.getElementById("edit-build-form");
const editMessage = document.getElementById("edit-message");
const saveButton = document.getElementById("save-build");

const params = new URLSearchParams(window.location.search);
const buildId = Number(params.get("id"));

// Load the selected build's existing information
async function loadBuildForEditing() {
    if (!Number.isSafeInteger(buildId) || buildId <= 0) {
        editMessage.textContent = "Invalid build ID.";
        saveButton.disabled = true;
        return;
    }

    try {
        const response = await fetch("/api/builds");

        if (!response.ok) {
            throw new Error("Failed to load builds");
        }

        const builds = await response.json();
        const build = builds.find(function(item) {
            return item.id === buildId;
        });

        if (!build) {
            editMessage.textContent = "Build not found.";
            saveButton.disabled = true;
            return;
        }

        document.getElementById("build-name").value = build.build_name;
        document.getElementById("vault-hunter").value = build.vault_hunter;
        document.getElementById("build-weapon").value = build.main_weapon;
        document.getElementById("build-description").value = build.description;

    } catch (error) {
        console.error("Error loading build:", error);
        editMessage.textContent = "Could not load build information.";
        saveButton.disabled = true;
    }
}

// Save changes to MySQL
editForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const updatedBuild = {
        build_name: document.getElementById("build-name").value.trim(),
        vault_hunter: document.getElementById("vault-hunter").value,
        main_weapon: document.getElementById("build-weapon").value.trim(),
        description: document.getElementById("build-description").value.trim()
    };

    try {
        saveButton.disabled = true;
        editMessage.textContent = "Saving changes...";

        const response = await fetch("/api/builds/" + buildId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBuild)
        });

        if (!response.ok) {
            throw new Error("Failed to update build");
        }

        alert("Build updated successfully!");

        window.location.href = "builds.html";

    } catch (error) {
        console.error("Error updating build:", error);
        editMessage.textContent = "Could not update build. Please try again.";
        saveButton.disabled = false;
    }
});

// Load build information when the page opens
loadBuildForEditing();
