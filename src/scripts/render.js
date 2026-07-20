import { isFavorite, toggleFavorite } from './storage.js';

let currentTrail = null;

export function populateDropdown(trails, trailSelect) {
    trails.forEach((trail, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = trail.name;
        trailSelect.appendChild(option);
    });
}

export function displayTrail(trail, trailsCard, onPlanTrip) {
    currentTrail = trail;
    const { image, name, location, description, distance, difficulty } = trail;
    trailsCard.innerHTML = `
        <img src="${image}" alt="${name}" id="card-img">
        <div id="trail-info">
            <div id="trail-title-row">
                <h2>${name}</h2>
                <button id="favorite-btn" class="favorite-btn" type="button" aria-label="Add to favorites" title="Add to favorites">
                    <span class="favorite-star">☆</span>
                </button>
            </div>
            <h3>${location}</h3>
            <p>${description}</p>
            <section id="details">
                <ul>
                    <li>${location}</li>
                    <li>${distance} Miles</li>
                    <li>${difficulty}</li>
                </ul>
            </section>
            <button id="plan-trip-btn" class="plan-trip-btn" type="button">Plan Trip</button>
        </div>
    `;

    const favoriteButton = document.getElementById('favorite-btn');
    favoriteButton.addEventListener('click', () => {
        toggleFavorite(trail);
        updateFavoriteButtonState();
    });
    updateFavoriteButtonState();

    const planTripButton = document.getElementById('plan-trip-btn');
    planTripButton.addEventListener('click', onPlanTrip);
}

function updateFavoriteButtonState() {
    const favoriteButton = document.getElementById('favorite-btn');
    const favoriteStar = document.querySelector('.favorite-star');
    if (!favoriteButton || !favoriteStar || !currentTrail) return;

    const isCurrentFavorite = isFavorite(currentTrail.id);
    favoriteButton.classList.toggle('is-favorite', isCurrentFavorite);
    favoriteButton.setAttribute('aria-pressed', String(isCurrentFavorite));
    favoriteButton.setAttribute('aria-label', isCurrentFavorite ? 'Remove from favorites' : 'Add to favorites');
    favoriteButton.setAttribute('title', isCurrentFavorite ? 'Remove from favorites' : 'Add to favorites');
    favoriteStar.textContent = isCurrentFavorite ? '★' : '☆';
}

export function renderFavorites(favorites, container, onRemove) {
    if (favorites.length === 0) {
        container.innerHTML = `<p id="no-favorites">You don't have any favorites saved.</p>`;
        return;
    }

    container.innerHTML = favorites.map(trail => {
        const { id, image, name, location, description, distance, difficulty } = trail;
        return `
            <article class="favorite-card" data-id="${id}">
                <img src="${image}" alt="${name}">
                <div class="favorite-info">
                    <h2>${name}</h2>
                    <h3>${location}</h3>
                    <p>${description}</p>
                    <section class="details">
                        <ul>
                            <li>${location}</li>
                            <li>${distance} Miles</li>
                            <li>${difficulty}</li>
                        </ul>
                    </section>
                    <button class="remove-favorite-btn" type="button" data-id="${id}">Remove</button>
                </div>
            </article>
        `;
    }).join('');

    container.querySelectorAll('.remove-favorite-btn').forEach(button => {
        button.addEventListener('click', () => {
            onRemove(button.dataset.id);
        });
    });
}