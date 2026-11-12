/* BORDERLANDS 4 VAULT HUNTER DETAILS */

// Information for all six Vault Hunters
const vaultHunters = {

    vex: {
        name: "Vex",
        class: "The Siren",
        image: "images/hunters/vex.png",

        background:
            "Vex is a mysterious Siren who uses supernatural powers " +
            "and summoned allies to defeat her enemies.",

        combat:
            "Vex focuses on supernatural damage, summoned companions " +
            "and abilities that help her control the battlefield.",

        skills: [
            {
                name: "Dead Ringer",
                description:
                    "Summons copies of Vex that fight alongside her."
            },
            {
                name: "Incarnate",
                description:
                    "Empowers Vex with supernatural energy."
            },
            {
                name: "Phase Phamiliar",
                description:
                    "Summons a powerful companion to attack enemies."
            }
        ]
    },

    rafa: {
        name: "Rafa",
        class: "The Exo-Soldier",
        image: "images/hunters/rafa.png",

        background:
            "Rafa is a former soldier who relies on advanced military " +
            "technology and a powerful exosuit in combat.",

        combat:
            "Rafa specialises in aggressive gunplay, advanced weapons " +
            "and technology-based combat abilities.",

        skills: [
            {
                name: "Apophis Lance",
                description:
                    "Deploys a powerful energy weapon for direct attacks."
            },
            {
                name: "Peacebreaker Cannons",
                description:
                    "Uses shoulder-mounted cannons to attack enemies."
            },
            {
                name: "Arc-Knives",
                description:
                    "Equips powerful energy blades for close combat."
            }
        ]
    },

    amon: {
        name: "Amon",
        class: "The Forgeknight",
        image: "images/hunters/amon.png",

        background:
            "Amon is a powerful warrior who combines advanced weaponry " +
            "with elemental technology and defensive abilities.",

        combat:
            "Amon specialises in elemental attacks, heavy damage " +
            "and surviving dangerous encounters.",

        skills: [
            {
                name: "Onslaughter",
                description:
                    "Uses powerful elemental weapons to attack enemies."
            },
            {
                name: "Scourge",
                description:
                    "Deploys defensive technology to protect against attacks."
            },
            {
                name: "Crucible",
                description:
                    "Unleashes powerful elemental attacks against enemies."
            }
        ]
    },

    harlowe: {
        name: "Harlowe",
        class: "The Gravitar",
        image: "images/hunters/harlowe.png",

        background:
            "Harlowe is a brilliant scientist who uses experimental " +
            "technology to manipulate gravity and energy.",

        combat:
            "Harlowe focuses on controlling groups of enemies, " +
            "dealing elemental damage and supporting her team.",

        skills: [
            {
                name: "CHROMA Accelerator",
                description:
                    "Launches an unstable energy attack at enemies."
            },
            {
                name: "Zero-Point",
                description:
                    "Uses gravity technology to control enemies."
            },
            {
                name: "Flux Generator",
                description:
                    "Deploys a device that affects enemies and allies."
            }
        ]
    },

    c4sh: {
        name: "C4SH",
        class: "The Rogue",
        image: "images/hunters/c4sh.png",

        background:
            "C4SH is a former CasinoBot who embraces risk, chance " +
            "and unpredictable combat situations.",

        combat:
            "C4SH relies on luck-based abilities and unpredictable " +
            "attacks to gain an advantage in battle.",

        skills: [
            {
                name: "Luck-Based Combat",
                description:
                    "Uses unpredictable effects to influence combat."
            },
            {
                name: "Risk and Reward",
                description:
                    "Takes advantage of high-risk combat situations."
            },
            {
                name: "Unpredictable Attacks",
                description:
                    "Uses chance-based effects against enemies."
            }
        ]
    },

    loveless: {
        name: "Loveless",
        class: "The Hacker",
        image: "images/hunters/loveless.png",

        background:
            "Loveless is a technologically enhanced fighter who " +
            "uses hacking abilities and digital technology.",

        combat:
            "Loveless specialises in disrupting enemies, " +
            "using technology and controlling the battlefield.",

        skills: [
            {
                name: "Hacking",
                description:
                    "Uses technology to interfere with enemy systems."
            },
            {
                name: "Digital Companion",
                description:
                    "Uses technological support during combat."
            },
            {
                name: "Cybernetic Combat",
                description:
                    "Combines advanced technology with combat abilities."
            }
        ]
    }
};

// Read the selected Vault Hunter from the URL
const params = new URLSearchParams(window.location.search);
const hunterId = params.get("hunter") || "vex";

const hunter = vaultHunters[hunterId];

// Get the HTML elements
const hunterName = document.getElementById("hunter-name");
const hunterClass = document.getElementById("hunter-class");
const hunterImage = document.getElementById("hunter-image");
const hunterBackground = document.getElementById("hunter-background");
const hunterCombat = document.getElementById("hunter-combat");
const skillsContainer = document.getElementById("hunter-skills");

// Display the selected character
if (hunter) {

    document.title = hunter.name + " | Borderlands 4 Vault Hunter Hub";

    hunterName.textContent = hunter.name;
    hunterClass.textContent = hunter.class;

    hunterImage.src = hunter.image;
    hunterImage.alt = hunter.name + " character artwork";

    hunterBackground.textContent = hunter.background;
    hunterCombat.textContent = hunter.combat;

    // Create the action skill cards
    hunter.skills.forEach(function (skill) {

        const skillCard = document.createElement("article");
        skillCard.className = "skill-card";

        const skillName = document.createElement("h3");
        skillName.textContent = skill.name;

        const skillDescription = document.createElement("p");
        skillDescription.textContent = skill.description;

        skillCard.appendChild(skillName);
        skillCard.appendChild(skillDescription);

        skillsContainer.appendChild(skillCard);
    });

} else {

    hunterName.textContent = "Vault Hunter Not Found";

    hunterBackground.textContent =
        "The selected Vault Hunter could not be found.";

    hunterImage.style.display = "none";
}
