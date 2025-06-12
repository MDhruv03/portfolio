// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

let currentTheme = localStorage.getItem('theme');

if (!currentTheme) {
  currentTheme = 'dark'; // default to dark for first-time visitors
  localStorage.setItem('theme', currentTheme);
}

body.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';


themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksList = document.querySelector('.nav-links');

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => {
                s.classList.remove('active');
                s.classList.add('hidden');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
                
                // Trigger animation
                setTimeout(() => {
                    targetSection.classList.add('visible');
                }, 50);
            }
            
            // Close mobile menu
            navLinksList.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// CTA Button functionality
document.querySelector('.cta-button')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Switch to projects section
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    
    document.querySelector('a[href="#projects"]').classList.add('active');
    const projectsSection = document.getElementById('projects');
    projectsSection.classList.remove('hidden');
    projectsSection.classList.add('active');
    
    setTimeout(() => {
        projectsSection.classList.add('visible');
    }, 50);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    homeSection.classList.add('visible');
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .social-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px var(--shadow)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .social-card').forEach(card => {
    observer.observe(card);
});