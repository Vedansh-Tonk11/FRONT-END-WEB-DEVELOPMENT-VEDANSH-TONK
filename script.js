
document.addEventListener('DOMContentLoaded', function() {
    // Add floating particles to background
    function createFloatingParticles() {
        const bg = document.querySelector('.interactive-bg');
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.4 + 0.1;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                opacity: ${opacity};
                background: ${i % 2 === 0 ? 'rgba(58, 134, 255, 0.7)' : 'rgba(131, 56, 236, 0.7)'};
            `;
            
            bg.appendChild(particle);
        }
    }

    // Call the function to create particles
    createFloatingParticles();
    
    // Handle magnification changes
    const viewButtons = document.querySelectorAll('[data-view]');
    viewButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Visual feedback
            button.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out'
            });

            // Update active state and view
            viewButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            document.querySelector('.microscope').className = 'microscope ' + button.dataset.view + '-power';
        });
    });

    // Handle function buttons
    const functionButtons = document.querySelectorAll('[data-function]');
    functionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.classList.toggle('active');
            const microscope = document.querySelector('.microscope');
            microscope.classList.toggle(button.dataset.function + '-active');
            
            // Visual feedback
            button.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.95)' },
                { transform: 'scale(1)' }
            ], {
                duration: 200,
                easing: 'ease-out'
            });
        });
    });

    // Enhanced light control with smooth transition
    const lightControl = document.getElementById('light-intensity');
    lightControl.addEventListener('input', function(e) {
        document.documentElement.style.setProperty('--light-intensity', e.target.value + '%');
        
        // Add glow effect when adjusting
        if (!lightControl.classList.contains('adjusting')) {
            lightControl.classList.add('adjusting');
            setTimeout(function() {
                lightControl.classList.remove('adjusting');
            }, 500);
        }
    });
});