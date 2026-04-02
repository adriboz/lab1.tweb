document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.map-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
});