const trailsCard = document.getElementById("trail-card");

async function loadTrails() {
    try {
        const response = await fetch('./data/trails.json');
        if (!response.ok) {
            throw new Error(`Data fetch error, status: ${response.status}`);
        }
        const data = await response.json();
        displayTrails(data);
    } catch (error) {
        console.error("unable to load JSON trails data:", error);
    }
}

function displayTrails(trails) {
    trailsCard.innerHTML = trails.map(trail => {
        const { image, name, description, location, distance, difficulty } = trail;
        return `
            <img src="${image}" alt="${name}">
            <h2>${name}</h2>
            <p>${description}</p>
            <section id="details">
              <ul>
                <li>${location}</li>
                <li>${distance} Miles</li>
                <li>${difficulty}</li>
              </ul>
            </section>
        `;
    }).join('');
}

loadTrails();