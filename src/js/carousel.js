// Accessible Carousel functionality
let currentSlideIndex = {};
let autoAdvanceTimers = {};

function initializeCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        currentSlideIndex[carouselId] = 0;
        
        // Add ARIA attributes to carousel container
        const container = carousel.querySelector('.carousel-container');
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Photo gallery');
        container.setAttribute('aria-live', 'polite');
        
        // Add ARIA attributes to slides
        const slides = carousel.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `Image ${index + 1} of ${slides.length}`);
            
            // Make images focusable for screen readers
            const img = slide.querySelector('img');
            if (img) {
                img.setAttribute('tabindex', index === 0 ? '0' : '-1');
            }
        });
        
        // Add ARIA attributes and keyboard support to navigation buttons
        const prevButton = carousel.querySelector('.carousel-btn-prev');
        const nextButton = carousel.querySelector('.carousel-btn-next');
        
        if (prevButton) {
            prevButton.setAttribute('aria-label', 'Previous image');
            prevButton.setAttribute('aria-controls', carouselId);
            prevButton.addEventListener('keydown', handleButtonKeydown);
        }
        
        if (nextButton) {
            nextButton.setAttribute('aria-label', 'Next image');
            nextButton.setAttribute('aria-controls', carouselId);
            nextButton.addEventListener('keydown', handleButtonKeydown);
        }
        
        // Add ARIA attributes to dots
        const dots = carousel.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            dot.setAttribute('aria-controls', carouselId);
            dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
            dot.addEventListener('keydown', handleDotKeydown);
        });
        
        // Add keyboard navigation to carousel container
        container.addEventListener('keydown', (e) => handleCarouselKeydown(e, carouselId));
        
        // Pause auto-advance on hover or focus
        container.addEventListener('mouseenter', () => pauseAutoAdvance(carouselId));
        container.addEventListener('mouseleave', () => resumeAutoAdvance(carouselId));
        container.addEventListener('focusin', () => pauseAutoAdvance(carouselId));
        container.addEventListener('focusout', () => resumeAutoAdvance(carouselId));
        
        // Show first slide
        showSlide(carouselId, 0);
        
        // Start auto-advance
        startAutoAdvance(carouselId);
    });
}

function handleButtonKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.target.click();
    }
}

function handleDotKeydown(event) {
    const carousel = event.target.closest('.image-carousel');
    const carouselId = carousel.id;
    const dots = carousel.querySelectorAll('.dot');
    const currentIndex = Array.from(dots).indexOf(event.target);
    
    switch (event.key) {
        case 'Enter':
        case ' ':
            event.preventDefault();
            currentSlide(carouselId, currentIndex + 1);
            break;
        case 'ArrowLeft':
            event.preventDefault();
            focusDot(carousel, Math.max(0, currentIndex - 1));
            break;
        case 'ArrowRight':
            event.preventDefault();
            focusDot(carousel, Math.min(dots.length - 1, currentIndex + 1));
            break;
        case 'Home':
            event.preventDefault();
            focusDot(carousel, 0);
            break;
        case 'End':
            event.preventDefault();
            focusDot(carousel, dots.length - 1);
            break;
    }
}

function handleCarouselKeydown(event, carouselId) {
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            moveSlide(carouselId, -1);
            break;
        case 'ArrowRight':
            event.preventDefault();
            moveSlide(carouselId, 1);
            break;
        case 'Home':
            event.preventDefault();
            currentSlide(carouselId, 1);
            break;
        case 'End':
            event.preventDefault();
            const carousel = document.getElementById(carouselId);
            const totalSlides = carousel.querySelectorAll('.carousel-slide').length;
            currentSlide(carouselId, totalSlides);
            break;
    }
}

function focusDot(carousel, index) {
    const dots = carousel.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    dots[index].focus();
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
    
    // Update active states and ARIA attributes
    slides.forEach((slide, index) => {
        const isActive = index === slideIndex;
        slide.classList.toggle('active', isActive);
        
        // Update image tabindex for keyboard navigation
        const img = slide.querySelector('img');
        if (img) {
            img.setAttribute('tabindex', isActive ? '0' : '-1');
        }
        
        // Update slide visibility for screen readers
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        const isActive = index === slideIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-pressed', isActive.toString());
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Announce slide change to screen readers
    const container = carousel.querySelector('.carousel-container');
    const totalSlides = slides.length;
    container.setAttribute('aria-label', `Photo gallery, image ${slideIndex + 1} of ${totalSlides}`);
}

function startAutoAdvance(carouselId) {
    autoAdvanceTimers[carouselId] = setInterval(() => {
        moveSlide(carouselId, 1);
    }, 5000);
}

function pauseAutoAdvance(carouselId) {
    if (autoAdvanceTimers[carouselId]) {
        clearInterval(autoAdvanceTimers[carouselId]);
        autoAdvanceTimers[carouselId] = null;
    }
}

function resumeAutoAdvance(carouselId) {
    if (!autoAdvanceTimers[carouselId]) {
        startAutoAdvance(carouselId);
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousels();
});

// Handle window resize
window.addEventListener('resize', function() {
    Object.keys(currentSlideIndex).forEach(carouselId => {
        showSlide(carouselId, currentSlideIndex[carouselId]);
    });
});

// Pause all carousels when user prefers reduced motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Object.keys(autoAdvanceTimers).forEach(carouselId => {
        pauseAutoAdvance(carouselId);
    });
} 
