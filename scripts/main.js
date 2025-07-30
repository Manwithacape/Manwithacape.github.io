
/**
 * Creates a project card element.
 * @param {string} _title title of the project 
 * @param {string} _url URL of the project page
 * @param {string} _image main image thumbnail of the project
 * @param {string} _application_logo image of the application logo this project was made in
 * @param {string} _date the date of the project creation
 * @returns {HTMLElement} The project card element.
 */
function createProjectCard(_title, _url, _image, _application_logo, _date) {
    const card = document.createElement('a');
    card.className = 'project-card shadow';
    card.href = _url;

    // Banner holds the text and application logo
    const card_banner = document.createElement('div');
    card_banner.className = 'project-card-banner';

    // Create card text
    const card_text = document.createElement('div');
    card_text.className = 'project-card-text';

    const title = document.createElement('h2');
    title.textContent = _title;

    const date = document.createElement('p');
    date.textContent = _date;

    card_text.appendChild(title);
    card_text.appendChild(date);

    // Create card image
    const img = document.createElement('img');
    img.src = _image;
    img.alt = `Image for ${_title}`;
    img.className = 'project-card-image';

    // Create application logo
    const appLogo = document.createElement('img');
    appLogo.src = _application_logo;
    appLogo.alt = `Application logo for ${_title}`;
    appLogo.className = 'project-card-application-logo';
    

    // Add the elements to the card
    card.appendChild(img);
    card_banner.appendChild(card_text);
    card_banner.appendChild(appLogo);
    card.appendChild(card_banner);
    // return the complete card
    return card;
}

/**
 * Loads project cards from a JSON file and appends them to the project section.
 * @param {string} _json_path JSON file should be a object with a "projects" array. each project should have Title, url, image, application_logo, and date properties.
 */
function loadProjectCards(_json_path) {
    fetch(_json_path)
        .then(response => {
            if (!response.ok) throw new Error('Failed to load project data');
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('project-cards');
            if (!projectsContainer) return;

            // Access the projects array from the data object
            const projectsArray = data.projects || data;
            
            for (const project of projectsArray) {
                const projectCard = createProjectCard(
                    project.Title,
                    project.url,
                    project.image,
                    project.application_logo,
                    project.date
                );
                projectsContainer.appendChild(projectCard);
            }
        })
        .catch(error => console.error('Error loading project cards:', error));
}

// load header component and place it at the top of the body 
async function loadHeader() {
    try {
        // Detect if we're in a subdirectory and adjust the path accordingly
        const currentPath = window.location.pathname;
        const depth = (currentPath.match(/\//g) || []).length - 1;
        let headerPath = 'components/header.html';
        
        // If we're in a subdirectory, go up the appropriate number of levels
        if (depth > 0) {
            headerPath = '../'.repeat(depth) + 'components/header.html';
        }
        
        const response = await fetch(headerPath);
        if (!response.ok) throw new Error('Failed to load header');
        const html = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const header = tempDiv.querySelector('header');
        if (header) {
            // Adjust the nav links to point to the correct paths
            const navLinks = header.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http')) {
                    // Adjust the href to point to the correct path
                    link.setAttribute('href', '../'.repeat(depth) + href);
                }
            });

            document.body.insertBefore(header, document.body.firstChild);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadProjectCards('projects/projects.json');
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



