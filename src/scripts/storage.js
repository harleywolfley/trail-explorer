let favorites = [];

export function getFavorites() {
    try {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
        favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
    } catch (error) {
        console.error('Unable to read favorites from local storage:', error);
        favorites = [];
    }
    return favorites;
}

export function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(trailId) {
    return favorites.some(favorite => favorite.id === trailId);
}

export function toggleFavorite(trail) {
    if (isFavorite(trail.id)) {
        favorites = favorites.filter(favorite => favorite.id !== trail.id);
    } else {
        favorites.push(trail);
    }
    saveFavorites();
}

export function toggleFavoriteById(trailId) {
    if (isFavorite(trailId)) {
        favorites = favorites.filter(favorite => favorite.id !== trailId);
        saveFavorites();
    }
}