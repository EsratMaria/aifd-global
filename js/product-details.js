// Toggle collapsible sections
function toggleSection(header) {
    const section = header.parentElement;
    section.classList.toggle('active');
}

// Size guide modal
function openSizeGuide(e) {
    e.preventDefault();
    document.getElementById('sizeGuideModal').style.display = 'block';
}

function closeSizeGuide() {
    document.getElementById('sizeGuideModal').style.display = 'none';
}

// Size guide unit conversion
const sizeDataCm = {
    'XS': { bust: 81, waist: 66, hip: 91 },
    'S': { bust: 86, waist: 71, hip: 97 },
    'M': { bust: 91, waist: 76, hip: 102 },
    'L': { bust: 97, waist: 81, hip: 107 }
};

function toggleUnit(unit) {
    const buttons = document.querySelectorAll('.unit-toggle button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const tbody = document.getElementById('sizeTableBody');
    tbody.innerHTML = '';
    
    Object.entries(sizeDataCm).forEach(([size, measurements]) => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = size;
        
        if (unit === 'in') {
            row.insertCell(1).textContent = Math.round(measurements.bust / 2.54);
            row.insertCell(2).textContent = Math.round(measurements.waist / 2.54);
            row.insertCell(3).textContent = Math.round(measurements.hip / 2.54);
        } else {
            row.insertCell(1).textContent = measurements.bust;
            row.insertCell(2).textContent = measurements.waist;
            row.insertCell(3).textContent = measurements.hip;
        }
    });
}

// Fixed Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    const dots = document.querySelectorAll('.dot');
    
    // Array of images
    const images = [
        '../../../resources/product-details/heriz/heriz-1.png',
        '../../../resources/product-details/heriz/heriz-2.png'
    ];

    // Thumbnail click handler
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Update main image
            const newImageSrc = thumb.getAttribute('data-image');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
            }
            
            // Update dots
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        });
    });

    // Dot click handler
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // Update main image
            if (images[index]) {
                mainImage.src = images[index];
            }
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            if (thumbnails[index]) {
                thumbnails[index].classList.add('active');
            }
        });
    });

    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('sizeGuideModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}