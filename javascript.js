// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
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

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .skill-category, .project-card, .contact-link {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .skill-category.animate-in, .project-card.animate-in, .contact-link.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Animate skill categories and project cards with staggered delay
document.querySelectorAll('.skill-category, .project-card, .contact-link').forEach((element, index) => {
    observer.observe(element);
    element.style.transitionDelay = `${index * 0.1}s`;
});

// Typing effect for the tagline
const tagline = document.querySelector('.tagline');
const originalText = tagline.textContent;
tagline.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        tagline.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add a simple theme toggle (light/dark mode)
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌙';
themeToggle.style.position = 'fixed';
themeToggle.style.top = '20px';
themeToggle.style.right = '20px';
themeToggle.style.background = 'linear-gradient(135deg, #ec407a, #ba68c8)';
themeToggle.style.border = '3px solid rgba(255,255,255,0.8)';
themeToggle.style.borderRadius = '50%';
themeToggle.style.width = '55px';
themeToggle.style.height = '55px';
themeToggle.style.cursor = 'pointer';
themeToggle.style.boxShadow = '0 4px 15px rgba(236,64,122,0.3)';
themeToggle.style.zIndex = '1000';
themeToggle.style.fontSize = '1.3rem';
themeToggle.style.color = 'white';
themeToggle.style.fontWeight = 'bold';

let isDarkMode = false;
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    themeToggle.style.background = isDarkMode ?
        'linear-gradient(135deg, #333, #555)' :
        'linear-gradient(135deg, #ec407a, #ba68c8)';
});

document.body.appendChild(themeToggle);

// Dark mode styles
const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = `
    body.dark-mode {
        background: linear-gradient(135deg, #2a0a1a 0%, #1a0a2a 50%, #0a1a2a 100%);
        color: #f8e1f4;
    }

    body.dark-mode .section:nth-child(even) {
        background: linear-gradient(135deg, rgba(42,10,26,0.8) 0%, rgba(26,10,42,0.6) 100%);
    }

    body.dark-mode .section:nth-child(odd) {
        background: linear-gradient(135deg, rgba(26,10,42,0.9) 0%, rgba(10,26,42,0.7) 100%);
    }

    body.dark-mode .skill-category,
    body.dark-mode .project-card,
    body.dark-mode .contact-link {
        background: linear-gradient(135deg, rgba(42,10,26,0.9) 0%, rgba(26,10,42,0.8) 100%);
        color: #f8e1f4;
        border-color: rgba(236,64,122,0.4);
    }

    body.dark-mode .skill-category li {
        border-bottom-color: rgba(236,64,122,0.3);
        color: #e1bee7;
    }

    body.dark-mode .project-card p {
        color: #e1bee7;
    }

    body.dark-mode footer {
        background: linear-gradient(135deg, #4a148c 0%, #880e4f 50%, #ad1457 100%);
    }

    body.dark-mode .contact-link {
        background: linear-gradient(135deg, rgba(42,10,26,0.9) 0%, rgba(26,10,42,0.8) 100%);
        color: #f8e1f4;
    }

    body.dark-mode .section h2 {
        color: #f48fb1;
    }

    body.dark-mode .skill-category h3,
    body.dark-mode .project-card h3 {
        color: #f48fb1;
    }

    body.dark-mode .about-text p {
        color: #e1bee7;
    }

    body.dark-mode .contact-content p {
        color: #e1bee7;
    }
`;
document.head.appendChild(darkModeStyle);

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '6px';
progressBar.style.background = 'linear-gradient(135deg, #ec407a 0%, #ba68c8 50%, #f06292 100%)';
progressBar.style.zIndex = '1001';
progressBar.style.transition = 'width 0.3s ease';
progressBar.style.boxShadow = '0 2px 4px rgba(236,64,122,0.3)';

document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});
