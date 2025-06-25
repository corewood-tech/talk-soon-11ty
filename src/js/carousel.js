// Carousel functionality
let currentSlideIndex = {};

function initializeCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        currentSlideIndex[carouselId] = 0;
        
        // Show first slide
        showSlide(carouselId, 0);
    });
}

function moveSlide(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    currentSlideIndex[carouselId] += direction;
    
    if (currentSlideIndex[carouselId] >= totalSlides) {
        currentSlideIndex[carouselId] = 0;
    } else if (currentSlideIndex[carouselId] < 0) {
        currentSlideIndex[carouselId] = totalSlides - 1;
    }
    
    showSlide(carouselId, currentSlideIndex[carouselId]);
}

function currentSlide(carouselId, slideIndex) {
    currentSlideIndex[carouselId] = slideIndex - 1;
    showSlide(carouselId, currentSlideIndex[carouselId]);
}

function showSlide(carouselId, slideIndex) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    // Move track to show current slide
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    
    // Update active states
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Auto-advance carousels
function autoAdvanceCarousels() {
    Object.keys(currentSlideIndex).forEach(carouselId => {
        moveSlide(carouselId, 1);
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousels();
    
    // Auto-advance every 5 seconds
    setInterval(autoAdvanceCarousels, 5000);
});

// Handle window resize
window.addEventListener('resize', function() {
    Object.keys(currentSlideIndex).forEach(carouselId => {
        showSlide(carouselId, currentSlideIndex[carouselId]);
    });
}); 
