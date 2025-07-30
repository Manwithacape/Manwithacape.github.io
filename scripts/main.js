
// load header component and place it at the top of the body 
async function loadHeader() {
    try {
        const response = await fetch('components/header.html');
        if (!response.ok) throw new Error('Failed to load header');
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const header = tempDiv.querySelector('header');
        if (header) {
            document.body.insertBefore(header, document.body.firstChild);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
});

function attachHeaderScrollListener() {
    window.addEventListener('scroll', function() {
        var header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 0) {
                header.classList.add('header-shrink');
                header.classList.remove('header-full');
            }

            if (window.scrollY === 0) {
                header.classList.remove('header-shrink');
                header.classList.add('header-full');
            }
        }
    });
}

// Scroll functionality for header
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 0) {
            header.classList.add('header-shrink');
            header.classList.remove('header-full');
        }

        if (window.scrollY === 0) {
            header.classList.remove('header-shrink');
            header.classList.add('header-full');
        }
    }
});



