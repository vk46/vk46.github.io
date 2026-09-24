(function () {
    const year = new Date().getFullYear();
    const startYear = 2016;

    document.querySelectorAll('.total_experience').forEach(function (element) {
        element.textContent = (year - startYear) + '+';
    });

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = year;
    }
})();
