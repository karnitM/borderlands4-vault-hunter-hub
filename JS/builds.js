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

            const image = document.createElement("img");
            image.src = hunterImages[build.vault_hunter] || "";
            image.alt = build.vault_hunter + " character artwork";

            const name = document.createElement("h3");
            name.textContent = build.build_name;

            const hunter = document.createElement("p");
            hunter.className = "build-type";
            hunter.textContent = "Vault Hunter: " + build.vault_hunter;

            const weapon = document.createElement("p");
            weapon.textContent = "Main Weapon: " + build.main_weapon;

            const description = document.createElement("p");
            description.textContent = build.description;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(hunter);
            card.appendChild(weapon);
            card.appendChild(description);

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
