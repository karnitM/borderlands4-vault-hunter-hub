const emptyStats = {
    damage: "Not available",
    accuracy: "Not available",
    handling: "Not available",
    reload: "Not available",
    fireRate: "Not available",
    magazine: "Not available"
};

const weapons = {
    paperclip: {
        name: "Paperclip",
        rarity: "Epic",
        type: "Pistol",
        manufacturer: "Tediore",
        element: "Kinetic",
        redText: "Red flavour text to be added",
        image: "images/paperclip.avif",
        ability: "Special ability description to be added",
        source: "Quest reward",
        location: "Drop location details to be added",
        stats: { ...emptyStats },
        variants: ["Variant information to be added"],
        parts: ["Weapon part information to be added"],
        farming: "Farming instructions to be added",
        notes: ["Additional weapon information to be added"]
    },

    zipper: {
        name: "Zipper",
        rarity: "Legendary",
        type: "Pistol",
        manufacturer: "Daedalus",
        element: "Kinetic",
        redText: "Who's the shot caller now?",
        image: "images/zipper.avif",
        ability: "Prison Rules: Gain 75% bonus critical damage and damage when attacking enemies from behind.",
        source: "Leader Willem",
        location: "Dedicated drop source in the base game.",
        stats: { ...emptyStats },
        variants: ["Kinetic element"],
        parts: ["Part information to be added"],
        farming: "Farm Leader Willem for the dedicated drop.",
        notes: ["Legendary Daedalus pistol", "Base game weapon"]
    },

    "bonnie-and-clyde": {
        name: "Bonnie and Clyde",
        rarity: "Legendary",
        type: "Assault Rifle",
        manufacturer: "Jakobs",
        element: "Kinetic",
        redText: "From a schoolboy to a rattlesnake.",
        image: "images/bonnie-and-clyde.avif",
        ability: "Pair of Thieves: Killing an enemy refills the magazine and grants 150% bonus damage to the weapon's other firing mode.",
        source: "Directive-0",
        location: "Terminus District",
        stats: { ...emptyStats },
        variants: ["Kinetic element"],
        parts: ["Part information to be added"],
        farming: "Farm Directive-0 in Terminus District for the dedicated drop.",
        notes: ["Legendary Jakobs assault rifle", "Base game weapon"]
    }
};

const params = new URLSearchParams(window.location.search);
const weaponId = params.get("id");

const weapon = Object.hasOwn(weapons, weaponId)
    ? weapons[weaponId]
    : null;

function displayList(elementId, items) {
    const container = document.getElementById(elementId);
    container.replaceChildren();

    const list = document.createElement("ul");

    items.forEach(function(item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
    });

    container.appendChild(list);
}

if (weapon) {
    document.getElementById("weapon-name").textContent = weapon.name;
    document.getElementById("red-text").textContent = weapon.redText;

    const weaponSubtitle = document.getElementById("weapon-subtitle");

    weaponSubtitle.textContent =
        `${weapon.rarity} | ${weapon.type} | ${weapon.manufacturer}`;

    weaponSubtitle.className =
        `weapon-subtitle ${weapon.rarity.toLowerCase()}`;

    const weaponImage = document.getElementById("weapon-image");
    weaponImage.src = weapon.image;
    weaponImage.alt = weapon.name;

    weaponImage.onerror = function() {
        weaponImage.hidden = true;
    };

    document.getElementById("weapon-type").textContent = weapon.type;
    document.getElementById("weapon-manufacturer").textContent = weapon.manufacturer;
    document.getElementById("weapon-rarity").textContent = weapon.rarity;
    document.getElementById("weapon-element").textContent = weapon.element;

    document.getElementById("weapon-ability").textContent = weapon.ability;

    document.getElementById("weapon-damage").textContent = weapon.stats.damage;
    document.getElementById("weapon-accuracy").textContent = weapon.stats.accuracy;
    document.getElementById("weapon-handling").textContent = weapon.stats.handling;
    document.getElementById("weapon-reload").textContent = weapon.stats.reload;
    document.getElementById("weapon-fire-rate").textContent = weapon.stats.fireRate;
    document.getElementById("weapon-magazine").textContent = weapon.stats.magazine;

    displayList("weapon-variants", weapon.variants);
    displayList("weapon-parts", weapon.parts);

    document.getElementById("weapon-source").textContent = weapon.source;
    document.getElementById("weapon-location").textContent = weapon.location;
    document.getElementById("weapon-farming").textContent = weapon.farming;

    displayList("weapon-notes", weapon.notes);

    document.title = `${weapon.name} - Borderlands 4 Vault Hunter Hub`;

} else {
    document.querySelector(".weapon-details").innerHTML = `
        <a href="weapons.html" class="back-link">
            &larr; Back to Weapons
        </a>
        <h2>Weapon not found</h2>
        <p>The requested weapon could not be found.</p>
    `;
}
