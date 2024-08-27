let currentIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const dots = document.querySelectorAll('.dot');

function showImage(index) {

    images.forEach((img, i) => {
        img.style.transform = `translateX(${-100 * index}%)`;
    });

    dots.forEach(dot => dot.classList.remove('active'));


    dots[index].classList.add('active');
}
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showImage(i);
        currentIndex = i;
    });
});
showImage(currentIndex);
