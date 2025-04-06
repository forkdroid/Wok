document.addEventListener('DOMContentLoaded', function() {
    // Space background enhancements
    setupShootingStars();
    setupPlanets();
    
    // Get and display today's date
    displayCurrentDate();
    
    function displayCurrentDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        
        // Create date display element if it doesn't exist
        if (!document.getElementById('current-date')) {
            const dateDisplay = document.createElement('div');
            dateDisplay.id = 'current-date';
            dateDisplay.classList.add('current-date');
            dateDisplay.textContent = `Today is ${formattedDate}`;
            
            // Add it to the cake section near the timer
            const timerContainer = document.querySelector('.timer-container');
            timerContainer.insertAdjacentElement('beforebegin', dateDisplay);
        }
    }
    
    function setupShootingStars() {
        const shootingStars = document.querySelectorAll('.shooting-star');
        
        // Randomize shooting star attributes
        shootingStars.forEach(star => {
            // Random position
            star.style.top = `${Math.random() * 80}%`;
            star.style.left = `${Math.random() * 80}%`;
            
            // Random animation duration
            const duration = 3 + Math.random() * 3;
            star.style.animationDuration = `${duration}s, ${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 8;
            star.style.animationDelay = `${delay}s, ${delay}s`;
            
            // Random animation direction
            const angle = Math.random() * 360;
            star.style.transform = `rotate(${angle}deg)`;
        });
    }
    
    function setupPlanets() {
        const planetCenters = document.querySelectorAll('.planet-center');
        
        // Randomize planet positions and orbits
        planetCenters.forEach((center, index) => {
            // Set different offsets for each planet center
            const offsetX = (Math.random() - 0.5) * 300;
            const offsetY = (Math.random() - 0.5) * 100;
            center.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            
            // Adjust planet orbit
            const planet = center.querySelector('.planet');
            const orbitSize = 100 + Math.random() * 100;
            const speed = 20 + Math.random() * 20;
            
            // Add slight wobble to orbit for realism
            const wobble = Math.random() * 10;
            planet.style.animationName = `rotate-${index}`;
            
            // Add custom keyframe animation for each planet
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rotate-${index} {
                    from { transform: rotate(0deg) translateX(${orbitSize}px) rotate(0deg) translateY(${wobble}px); }
                    to { transform: rotate(360deg) translateX(${orbitSize}px) rotate(-360deg) translateY(${-wobble}px); }
                }
            `;
            document.head.appendChild(style);
            
            // Apply the custom animation
            planet.style.animation = `rotate-${index} ${speed}s linear infinite`;
        });
    }

    // Control visibility of shooting stars and planets based on section
    const shootingStarsElement = document.querySelector('.shooting-stars');
    const planetsElement = document.querySelector('.planets');

    // Navigation
    const sections = {
        wish: document.getElementById('wish-section'),
        gallery: document.getElementById('gallery-section'),
        cake: document.getElementById('cake-section')
    };

    // Set initial active section
    sections.wish.classList.add('active');
    // Make sure shooting stars and planets are visible initially
    shootingStarsElement.style.display = 'block';
    planetsElement.style.display = 'block';

    // Navigation button handlers
    document.getElementById('to-gallery').addEventListener('click', () => {
        changeSection('wish', 'gallery');
    });

    document.getElementById('to-cake').addEventListener('click', () => {
        changeSection('gallery', 'cake');
    });

    document.getElementById('back-to-top').addEventListener('click', () => {
        changeSection('cake', 'wish');
    });

    function changeSection(from, to) {
        sections[from].classList.remove('active');
        sections[to].classList.add('active');
        
        // Control shooting stars and planets visibility based on section
        if (to === 'wish') {
            // Show shooting stars and planets in first section
            shootingStarsElement.style.display = 'block';
            planetsElement.style.display = 'block';
        } else {
            // Hide shooting stars and planets in other sections
            shootingStarsElement.style.display = 'none';
            planetsElement.style.display = 'none';
        }
        
        // Add entrance animation based on section
        if (to === 'gallery') {
            initSlider();
        } else if (to === 'cake') {
            initTimer();
        }
    }

    // Photo slider functionality
    const sliderContainer = document.querySelector('.slider');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentSlide = 0;
    let slides = [];

    // Image data with the user's images and captions
    const photoData = [
        { 
            src: 'Img1.png', 
            message: 'Eda, I love to see you blush this way, I am not perfect but I will try to surprise you(good ones ofc).' 
        },
        { 
            src: 'img2.png', 
            message: 'Well although gpt did not generate he most accurate images, this is how I was looking at you, all confused.(I did not want to make any mistakes).' 
        },
        { 
            src: 'img3.png', 
            message: 'Well, this has not happened yet. But someday...' 
        }
    ];

    function createSlides() {
        sliderContainer.innerHTML = '';
        slides = [];
        
        photoData.forEach((photo, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            
            // Create and add the image
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = `Birthday memory ${index + 1}`;
            
            // Add loading animation
            img.style.opacity = '0';
            img.onload = () => {
                fadeIn(img);
            };
            
            // Create and add the message
            const message = document.createElement('div');
            message.classList.add('slide-message');
            message.textContent = photo.message;
            
            slide.appendChild(img);
            slide.appendChild(message);
            sliderContainer.appendChild(slide);
            slides.push(slide);
        });
    }

    function fadeIn(element) {
        let opacity = 0;
        const interval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    function initSlider() {
        if (slides.length === 0) {
            createSlides();
        }
        
        updateSliderPosition();
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSliderPosition();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSliderPosition();
        });
    }
    
    function updateSliderPosition() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Birthday countdown timer
    function initTimer() {
        const now = new Date();
        
        // Display current date in console
        console.log(`Current date: ${now.toDateString()}`);
        
        // Set the date to countdown to April 16th
        // Month is 0-indexed (0 = January, 1 = February, ..., 3 = April)
        const targetDay = 16;
        const targetMonth = 3; // April (0-indexed)
        let targetBirthday = new Date(now.getFullYear(), targetMonth, targetDay);
        
        // If April 16th has already passed this year, set for next year
        if (now > targetBirthday) {
            targetBirthday = new Date(now.getFullYear() + 1, targetMonth, targetDay);
        }
        
        // Log the target birthday
        console.log(`Target date: ${targetBirthday.toDateString()}`);
        
        // Update target date display
        const currentDateDisplay = document.getElementById('current-date');
        if (currentDateDisplay) {
            const targetOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedTarget = targetBirthday.toLocaleDateString('en-US', targetOptions);
            currentDateDisplay.innerHTML = `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br><span class="countdown-target">Counting down to ${formattedTarget}</span>`;
        }
        
        // Start countdown updates
        const timerInterval = setInterval(() => {
            const isComplete = updateTimer(targetBirthday);
            
            // If countdown is complete, clear the interval and show celebration
            if (isComplete) {
                clearInterval(timerInterval);
                showCelebration();
            }
        }, 1000);
        
        // Initial update
        updateTimer(targetBirthday);
    }
    
    function updateTimer(endDate) {
        const now = new Date();
        const diff = endDate - now;
        
        // Check if countdown is complete
        if (diff <= 0) {
            showCelebration();
            return true;
        }
        
        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        return false;
    }
    
    function showCelebration() {
        const timerContainer = document.querySelector('.timer-container');
        const timerElement = document.querySelector('.timer');
        
        // Hide the timer
        if (timerElement) {
            timerElement.style.display = 'none';
        }
        
        // Create celebration message
        const celebrationMsg = document.createElement('div');
        celebrationMsg.classList.add('celebration-message');
        celebrationMsg.innerHTML = '<h3>Happy Birthday!</h3><p>Today is the day!</p>';
        
        // Create flower container
        const flowerContainer = document.createElement('div');
        flowerContainer.classList.add('flower-container');
        
        // Add flowers
        for (let i = 0; i < 12; i++) {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            
            // Randomize flower position and animation
            flower.style.left = `${Math.random() * 80 + 10}%`;
            flower.style.animationDelay = `${Math.random() * 2}s`;
            flower.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
            
            // Create flower parts
            const flowerCenter = document.createElement('div');
            flowerCenter.classList.add('flower-center');
            
            // Create petals
            for (let j = 0; j < 8; j++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                petal.style.transform = `rotate(${j * 45}deg)`;
                petal.style.backgroundColor = getRandomColor();
                flower.appendChild(petal);
            }
            
            flower.appendChild(flowerCenter);
            flowerContainer.appendChild(flower);
        }
        
        // Add to container
        if (timerContainer) {
            timerContainer.innerHTML = '';
            timerContainer.appendChild(celebrationMsg);
            timerContainer.appendChild(flowerContainer);
        }
        
        // Trigger confetti
        createConfetti();
    }
    
    function getRandomColor() {
        const colors = [
            '#ff9a9e', // Pink
            '#fad0c4', // Light Pink
            '#ffecd2', // Peach
            '#fcb69f', // Coral
            '#a1c4fd', // Light Blue
            '#c2e9fb', // Sky Blue
            '#d4fc79', // Light Green
            '#96e6a1', // Mint
            '#84fab0', // Aqua
            '#fee140', // Yellow
            '#fa709a', // Hot Pink
            '#c1dfc4'  // Sage
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Candle blowing animation
    const flame = document.getElementById('flame');
    const blowBtn = document.getElementById('blow-btn');
    let candleBlown = false; // Track if candle has been blown

    blowBtn.addEventListener('click', () => {
        // Only allow blowing the candle once
        if (!candleBlown) {
            // Add blowing animation
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            
            // Confetti animation
            createConfetti();
            
            // Update button state
            blowBtn.disabled = true;
            blowBtn.textContent = 'Wish Granted!';
            
            // Set candle as blown
            candleBlown = true;
            
            // Save state to localStorage so it persists between page reloads
            localStorage.setItem('candleBlown', 'true');
        }
    });

    // Check if candle was already blown (on page load)
    function checkCandleState() {
        if (localStorage.getItem('candleBlown') === 'true') {
            candleBlown = true;
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            blowBtn.disabled = true;
            blowBtn.textContent = 'Wish Granted!';
        }
    }

    // Call this function when the page loads
    checkCandleState();
    
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1000';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#f0db4f', '#58a6ff', '#ff6b6b', '#48dbfb', '#1dd1a1'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'absolute';
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 5 + 5}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.transform = 'rotate(0deg)';
            
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
            
            confettiContainer.appendChild(confetti);
            
            // Add CSS animation for falling confetti
            if (!document.getElementById('confetti-style')) {
                const style = document.createElement('style');
                style.id = 'confetti-style';
                style.textContent = `
                    @keyframes fall {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Remove confetti container after animation completes
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
}); 