// Create floating hearts animation
class HeartAnimation {
  constructor(container) {
    this.container = container;
    this.hearts = [];
    this.maxHearts = 20;
    this.colors = ['#FFD1DC', '#FFB6C1', '#FFAEB9', '#E6E6FA', '#D8BFD8'];
    this.sizes = [15, 20, 25, 30];
    this.init();
  }

  init() {
    // Create initial hearts
    this.createHeart();
    
    // Set interval to continue creating hearts
    setInterval(() => {
      this.createHeart();
    }, 1500);
  }

  createHeart() {
    if (this.hearts.length >= this.maxHearts) {
      const oldHeart = this.hearts.shift();
      if (oldHeart.parentNode) {
        oldHeart.parentNode.removeChild(oldHeart);
      }
    }

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random properties
    const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const left = Math.random() * 100;
    const animationDuration = 15 + Math.random() * 15; // Between 15-30s
    const delay = Math.random() * 5;
    const blur = Math.random() < 0.5; // 50% chance of blur
    
    // Apply styles
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.backgroundColor = color;
    heart.style.left = `${left}%`;
    heart.style.bottom = '-20px';
    heart.style.animation = `float ${animationDuration}s linear ${delay}s forwards`;
    
    if (blur) {
      heart.style.filter = 'blur(1px)';
    }
    
    // Before and after pseudo-elements need to match the heart's color and size
    heart.style.setProperty('--heart-color', color);
    heart.style.setProperty('--heart-size', `${size}px`);
    
    // Add heart to DOM
    this.container.appendChild(heart);
    
    // Store reference for cleanup
    this.hearts.push(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
        this.hearts = this.hearts.filter(h => h !== heart);
      }
    }, (animationDuration + delay) * 1000);
  }
}

// Create particle animation background
class ParticleBackground {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.maxParticles = 40;
    this.colors = ['rgba(255, 209, 220, 0.6)', 'rgba(230, 230, 250, 0.6)', 'rgba(255, 182, 193, 0.6)'];
    this.init();
  }

  init() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    
    // Random properties
    const size = 3 + Math.random() * 5;
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 20 + Math.random() * 40;
    
    // Set styles
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.opacity = 0.6;
    particle.style.filter = 'blur(1px)';
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    particle.style.animation = `pulse ${duration}s infinite ease-in-out`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const particleContainer = document.getElementById('particles');
  
  // Initialize particle background
  new ParticleBackground(particleContainer);
  
  // Initialize heart animation
  new HeartAnimation(particleContainer);
  
  // Add fade-in animation to main elements
  const elements = [
    document.querySelector('.title'),
    document.querySelector('.message'),
    document.querySelector('#readMoreBtn'),
    document.querySelector('footer')
  ];
  
  elements.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.classList.add('fade-in');
      }, 300 * index);
    }
  });
});