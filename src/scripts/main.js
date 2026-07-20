import { loadTrailsData } from './data.js';
import { populateDropdown, displayTrail } from './render.js';
import { getFavorites, toggleFavoriteById } from './storage.js';
import { renderFavorites } from './render.js';

const trailsCard = document.getElementById("trail-card");
const trailSelect = document.getElementById("trail-select");
const hamburgerBtn = document.getElementById("hamburger-btn");
const navigation = document.getElementById("navigation");
const planTripModal = document.getElementById("plan-trip-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const tripForm = document.getElementById("trip-form");
const favoritesList = document.getElementById("favorites-list");

let trailsData = [];

function openModal() {
    planTripModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeModal() {
    planTripModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

function updateURL(trailId) {
    const params = new URLSearchParams(window.location.search);
    params.set('trail', trailId);
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newURL);
}

async function initTrails() {
    if (!trailsCard || !trailSelect) return;

    trailsData = await loadTrailsData();
    getFavorites();
    populateDropdown(trailsData, trailSelect);

    const params = new URLSearchParams(window.location.search);
    const urlTrailId = params.get('trail');
    const targetId = urlTrailId || "trail01";
    const targetIndex = trailsData.findIndex(trail => trail.id === targetId);

    if (targetIndex !== -1) {
        trailSelect.value = targetIndex;
        displayTrail(trailsData[targetIndex], trailsCard, openModal);
    }

    trailSelect.addEventListener('change', (event) => {
        const index = event.target.value;
        if (index === "") return;
        const selectedTrail = trailsData[index];
        displayTrail(selectedTrail, trailsCard, openModal);
        updateURL(selectedTrail.id);
    });
}

if (hamburgerBtn && navigation) {
    hamburgerBtn.addEventListener('click', () => {
        navigation.classList.toggle('hidden');
        const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
    });
}

if (closeModalBtn && planTripModal) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (planTripModal) {
    planTripModal.addEventListener('click', (event) => {
        if (event.target === planTripModal) {
            closeModal();
        }
    });
}

if (tripForm) {
    tripForm.addEventListener('submit', (event) => {
        event.preventDefault();
        closeModal();
        tripForm.reset();
    });
}

document.addEventListener('keydown', (event) => {
    if (planTripModal && event.key === 'Escape' && !planTripModal.classList.contains('hidden')) {
        closeModal();
    }
});

function initFavoritesPage() {
    if (!favoritesList) return; // not on the favorites page — skip

    const currentFavorites = getFavorites();
    renderFavorites(currentFavorites, favoritesList, handleRemoveFavorite);
}

function handleRemoveFavorite(trailId) {
    toggleFavoriteById(trailId);
    const updatedFavorites = getFavorites();
    renderFavorites(updatedFavorites, favoritesList, handleRemoveFavorite);
}

initFavoritesPage();

initTrails();