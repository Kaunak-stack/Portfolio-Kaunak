document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Typing effect for hero title
    const title = document.querySelector('.hero h1');
    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Mobile menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Terminal typing effect
    document.querySelectorAll('section h2').forEach(heading => {
        const originalText = heading.textContent;
        heading.textContent = '';
        terminalType(heading, originalText);
    });

    // Apply glitch effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        createGlitchEffect(card);
    });

    // Add matrix rain effect to background
    createMatrixRain();
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Terminal typing effect
function terminalType(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '> ';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '█';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            if (cursor) element.removeChild(cursor);
            element.innerHTML += text.charAt(i);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else {
            cursor.style.animation = 'blink 1s infinite';
        }
    }
    
    type();
}

// Glitch effect
function createGlitchEffect(element) {
    setInterval(() => {
        element.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        setTimeout(() => {
            element.style.transform = 'translate(0, 0)';
        }, 50);
    }, 3000);
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const drops = [];
    const fontSize = 10;
    const columns = canvas.width/fontSize;

    for(let x = 0; x < columns; x++)
        drops[x] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random()*matrix.length)];
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

function toggleProjects(type) {
    const webProjects = document.getElementById('web-projects');
    const databaseProjects = document.getElementById('database-projects');
    const pythonProjects = document.getElementById('python-projects');

    if (type === 'web') {
        webProjects.style.display = webProjects.style.display === 'none' ? 'block' : 'none';
        databaseProjects.style.display = 'none'; // Hide other sections
        pythonProjects.style.display = 'none'; // Hide other sections
    } else if (type === 'database') {
        databaseProjects.style.display = databaseProjects.style.display === 'none' ? 'block' : 'none';
        webProjects.style.display = 'none'; // Hide other sections
        pythonProjects.style.display = 'none'; // Hide other sections
    } else if (type === 'python') {
        pythonProjects.style.display = pythonProjects.style.display === 'none' ? 'block' : 'none';
        webProjects.style.display = 'none'; // Hide other sections
        databaseProjects.style.display = 'none'; // Hide other sections
    }
}

function toggleProjectDescription(projectId) {
    const description = document.getElementById(projectId);
    const allDescriptions = document.querySelectorAll('.project-description');
    
    allDescriptions.forEach(desc => {
        if (desc.id !== projectId && desc.classList.contains('active')) {
            desc.style.opacity = '0';
            desc.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                desc.classList.remove('active');
            }, 1200);
        }
    });
    
    if (!description.classList.contains('active')) {
        description.classList.add('active');
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
    } else {
        description.style.opacity = '0';
        description.style.transform = 'translateY(-3px)';
        setTimeout(() => {
            description.classList.remove('active');
        }, 1200);
    }
} 