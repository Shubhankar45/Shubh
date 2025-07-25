// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .smooth-scroll');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('about');
    
    const animateProgressBars = () => {
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > skillsSectionTop + skillsSectionHeight / 2) {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    };
    
    // Initial check
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);
    
    // Add active class to navigation links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    const highlightNavigation = () => {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return false;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
        });
    }
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .certification-card, .education-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Add typing effect to hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        const words = text.split(' ');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }
        
        // Uncomment to enable typing effect
        // setTimeout(typeEffect, 2000);
    }
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .project-card, .certification-card, .education-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .project-card.animate-in, .certification-card.animate-in, .education-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar-nav .nav-link.active {
        color: var(--accent-gold) !important;
    }
    
    .navbar-nav .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
