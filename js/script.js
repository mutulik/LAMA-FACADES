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

// Function to update the color
const updateHouseColor = (colorArray) => {
    const materials = modelViewer.model.materials;
    
    // We search for 'lambert3' specifically
    const wall = materials.find(m => m.name === 'lambert3');
    
    if (wall) {
        wall.pbrMetallicRoughness.setBaseColorFactor(colorArray);
        console.log("Success! Painted lambert3:", colorArray);
    } else {
        console.error("Error: lambert3 not found in current materials list.");
    }
};

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