
    //navigation bar funtion
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        header.classList.toggle("scroller", window.scrollY > 0);
    });

    