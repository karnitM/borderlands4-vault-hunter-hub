
const searchInput = document.getElementById("weapon-search");
const typeFilter = document.getElementById("weapon-type-filter");
const rarityFilter = document.getElementById("weapon-rarity-filter");
const resetButton = document.getElementById("reset-filters");
const noResults = document.getElementById("no-results");

const weaponRows = document.querySelectorAll(".weapons-table tbody tr");

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

searchInput.addEventListener("input", filterWeapons);
typeFilter.addEventListener("change", filterWeapons);
rarityFilter.addEventListener("change", filterWeapons);

resetButton.addEventListener("click", function() {
    searchInput.value = "";
    typeFilter.value = "all";
    rarityFilter.value = "all";

    filterWeapons();
});

filterWeapons();
