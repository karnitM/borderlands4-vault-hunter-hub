const searchInput = document.getElementById("weapon-search");
const typeFilter = document.getElementById("weapon-type-filter");
const rarityFilter = document.getElementById("weapon-rarity-filter");
const resetButton = document.getElementById("reset-filters");
const noResults = document.getElementById("no-results");

const tableBody = document.querySelector(".weapons-table tbody");

let weaponRows = [];

// Load weapons from the MySQL database through the API
async function loadWeapons() {
    try {
        const response = await fetch("/api/weapons");

        if (!response.ok) {
            throw new Error("Failed to load weapons");
        }

        const weapons = await response.json();

        // Remove the old HTML weapon rows
        tableBody.innerHTML = "";

        // Create a table row for each weapon from MySQL
        weapons.forEach(function(weapon) {
            const row = document.createElement("tr");

            const imageCell = document.createElement("td");
            const image = document.createElement("img");
            image.src = weapon.image;
            image.alt = weapon.name;
            imageCell.appendChild(image);

            const nameCell = document.createElement("td");
            const link = document.createElement("a");
            link.href = "weapon-details.html?id=" + weapon.id;
            link.textContent = weapon.name;
            nameCell.appendChild(link);

            const typeCell = document.createElement("td");
            typeCell.textContent = weapon.weapon_type;

            const manufacturerCell = document.createElement("td");
            manufacturerCell.textContent = weapon.manufacturer;

            const rarityCell = document.createElement("td");
            rarityCell.textContent = weapon.rarity;

            const elementCell = document.createElement("td");
            elementCell.textContent = weapon.element;

            const sourceCell = document.createElement("td");
            sourceCell.textContent = weapon.source;

            row.appendChild(imageCell);
            row.appendChild(nameCell);
            row.appendChild(typeCell);
            row.appendChild(manufacturerCell);
            row.appendChild(rarityCell);
            row.appendChild(elementCell);
            row.appendChild(sourceCell);

            tableBody.appendChild(row);
        });

        weaponRows = Array.from(tableBody.querySelectorAll("tr"));

        filterWeapons();

    } catch (error) {
        console.error("Error loading weapons:", error);

        tableBody.innerHTML = "";
        weaponRows = [];

        noResults.textContent = "Could not load weapons from the database.";
        noResults.hidden = false;
    }
}

// Search and filter weapons
function filterWeapons() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value.toLowerCase();
    const selectedRarity = rarityFilter.value.toLowerCase();

    let visibleCount = 0;

    weaponRows.forEach(function(row) {
        const weaponName = row.cells[1].textContent.toLowerCase().trim();
        const weaponType = row.cells[2].textContent.toLowerCase().trim();
        const weaponRarity = row.cells[4].textContent.toLowerCase().trim();

        const matchesSearch = weaponName.includes(searchText);
        const matchesType =
            selectedType === "all" || weaponType === selectedType;
        const matchesRarity =
            selectedRarity === "all" || weaponRarity === selectedRarity;

        const isVisible = matchesSearch && matchesType && matchesRarity;

        row.style.display = isVisible ? "" : "none";

        if (isVisible) {
            visibleCount++;
        }
    });

    noResults.hidden = visibleCount !== 0;
}

// Event listeners
searchInput.addEventListener("input", filterWeapons);
typeFilter.addEventListener("change", filterWeapons);
rarityFilter.addEventListener("change", filterWeapons);

resetButton.addEventListener("click", function() {
    searchInput.value = "";
    typeFilter.value = "all";
    rarityFilter.value = "all";

    filterWeapons();
});

// Load weapons when the page opens
loadWeapons();
