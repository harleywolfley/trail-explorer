export async function loadTrailsData() {
    try {
        const response = await fetch('./data/trails.json');
        if (!response.ok) {
            throw new Error(`Data fetch error, status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("unable to load JSON trails data:", error);
        return [];
    }
}