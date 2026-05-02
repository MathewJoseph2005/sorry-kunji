document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const readMoreBtn = document.getElementById('readMoreBtn');
  const backBtn = document.getElementById('backBtn');
  const mainMessage = document.querySelector('.main-message');
  const moreContent = document.querySelector('.more-content');
  
  // Add pulse animation to the read more button
  setTimeout(() => {
    readMoreBtn.classList.add('pulse');
  }, 3000);
  
  // Toggle between main message and more content
  readMoreBtn.addEventListener('click', () => {
    mainMessage.classList.add('hidden');
    moreContent.classList.remove('hidden');
    
    // Trigger transition after a small delay to ensure display change has happened
    setTimeout(() => {
      moreContent.classList.add('visible');
      
      // Add fade-in animation to each section in sequence
      const sections = moreContent.querySelectorAll('section');
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('fade-in');
        }, 200 * index);
      });
      
      // Add fade-in animation to back button last
      setTimeout(() => {
        backBtn.classList.add('fade-in');
      }, 200 * sections.length);
    }, 50);
  });
  
  // Go back to main message
  backBtn.addEventListener('click', () => {
    moreContent.classList.remove('visible');
    
    // Wait for fade-out animation to complete before hiding
    setTimeout(() => {
      moreContent.classList.add('hidden');
      mainMessage.classList.remove('hidden');
      
      // Re-trigger fade-in for main message elements
      const elements = mainMessage.querySelectorAll('h1, p, button');
      elements.forEach((element, index) => {
        element.classList.remove('fade-in');
        setTimeout(() => {
          element.classList.add('fade-in');
        }, 100 * index);
      });
    }, 500);
  });
  
  // Add touch ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - this.getBoundingClientRect().left;
      const y = e.clientY - this.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.background = 'rgba(255, 255, 255, 0.7)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      // Animate ripple
      ripple.animate(
        [
          { width: '0', height: '0', opacity: 1 },
          { width: '300px', height: '300px', opacity: 0 }
        ],
        {
          duration: 600,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      );
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });