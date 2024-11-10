window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('header-shrink');
        header.classList.remove('header-full');
    }

    if (window.scrollY === 0) {
        header.classList.remove('header-shrink');
        header.classList.add('header-full');
    }
});



