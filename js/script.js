// Simple script to log when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("LAMA Facades site loaded successfully.");
});

// Example: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const modelViewer = document.querySelector('#house-model');

modelViewer.addEventListener('load', async () => {
    const materials = modelViewer.model.materials;
    const wall = materials.find(m => m.name === 'lambert3');

    // 1. TRY TO APPLY THE GRAIN TEXTURE
    if (wall) {
        try {
            // Check your folder: is it portfolio/textures/grain_normal.jpg?
            const texture = await modelViewer.createTexture('../portfolio/textures/grain_normal.jpg');
            
            wall.normalTexture.setTexture(texture);
            // This makes the grain look 1.5mm (small and tight)
            wall.normalTexture.setTexCoordRatio({x: 8, y: 8}); 
            console.log("Texture loaded successfully.");
        } catch (error) {
            console.error("Texture failed to load, but buttons will still work. Error:", error);
        }
    }

    // 2. COLOR BUTTONS (These stay outside the 'try' so they always work)
    document.querySelectorAll('.color-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const colorData = event.target.dataset.color;
            if (!colorData) return;

            const color = colorData.split(',').map(num => parseFloat(num.trim()));
            
            if (wall) {
                wall.pbrMetallicRoughness.setBaseColorFactor(color);
                wall.pbrMetallicRoughness.setRoughnessFactor(0.9); // Keeps it matte
                console.log("Color applied:", color);
            }
        });
    });
});

// Listen for clicks on your palette
document.querySelectorAll('.color-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const colorString = event.target.dataset.color;
        const color = colorString.split(',').map(number => parseFloat(number));
        
        // Ensure the model is ready before trying to paint
        if (modelViewer.model) {
            updateHouseColor(color);
        } else {
            console.log("Model not ready yet. Please wait a moment.");
        }
    });
});