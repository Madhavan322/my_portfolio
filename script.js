// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize all components
    initNavigation();
    initBatSignal();
    initTypewriter();
    initStatsCounter();
    initProgressBars();
    initCertificateViewer();
    initCertificateSlideshow();
    initMissionTerminal();
    initEmailJS(); // Initialize EmailJS
    initContactForm();
    initAudioControls();
    initDynamicContent();
    initAnimations();
    initBackToTop();
    initMobileNav();
    
    // Set first section as active
    showSection('home');
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const chars = document.querySelectorAll('.char');
    
    // Add index to each character for staggered animation
    chars.forEach((char, index) => {
        char.style.setProperty('--char-index', index);
    });
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Play background music
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
            }
        }, 1000);
    }, 2000);
}

// Navigation
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Menu items click handler
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.target;
            showSection(target);
            
            // Update active state
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
    
    // Menu toggle for mobile
    menuToggle.addEventListener('click', function() {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(10, 10, 10, 0.95)';
            navMenu.style.backdropFilter = 'blur(10px)';
            navMenu.style.padding = '20px';
            navMenu.style.borderTop = '1px solid rgba(255, 215, 0, 0.2)';
            navMenu.style.gap = '15px';
        }
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
                navMenu.style.display = 'none';
            }
        }
    });
}

// Show Section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Play click sound
        playSound('click');
        
        // Scroll to top of section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Global function to open mission terminal
function openMissionTerminal() {
    const terminal = document.getElementById('missionTerminal');
    terminal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const terminalCmd = document.getElementById('terminalCmd');
    if (terminalCmd) {
        setTimeout(() => {
            terminalCmd.focus();
        }, 100);
    }
    
    // Display welcome message
    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
        terminalOutput.innerHTML = '';
        displayTerminalOutput('SYSTEM INITIALIZED\nWelcome to AI Terminal\nType "help" for available commands');
    }
    
    playSound('click');
}

// Global function to open certificate viewer
function openCertificateViewer(index) {
    const viewer = document.getElementById('certViewer');
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load certificate data
    const certificates = getCertificates();
    if (certificates[index]) {
        updateCertificateViewer(index);
    }
    
    playSound('click');
}

// Bat Signal Animation
function initBatSignal() {
    const signalLight = document.querySelector('.signal-light');
    
    if (signalLight) {
        // Randomize light intensity
        setInterval(() => {
            const intensity = Math.random() * 0.4 + 0.3;
            signalLight.style.opacity = intensity;
        }, 2000);
    }
}

// Typewriter Effect
function initTypewriter() {
    const typeLines = document.querySelectorAll('.type-line');
    
    if (typeLines.length === 0) return;
    
    // Set up staggered animation
    typeLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        // Type out text character by character
        setTimeout(() => {
            typeText(line, text, 0);
        }, index * 100);
    });
}

function typeText(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeText(element, text, index + 1), 50);
    }
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    if (progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const level = progressBar.dataset.level;
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${level}%`;
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Certificate Viewer
function initCertificateViewer() {
    const viewer = document.getElementById('certViewer');
    const closeBtn = document.getElementById('viewerClose');
    const prevBtn = document.getElementById('viewerPrev');
    const nextBtn = document.getElementById('viewerNext');
    const downloadBtn = document.getElementById('downloadCert');
    const shareBtn = document.getElementById('shareCert');
    
    if (!viewer) return;
    
    let currentIndex = 0;
    
    // Close viewer
    closeBtn.addEventListener('click', () => {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
        playSound('click');
    });
    
    // Navigate previous
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const certificates = getCertificates();
            currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
            updateCertificateViewer(currentIndex);
            playSound('click');
        });
    }
    
    // Navigate next
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const certificates = getCertificates();
            currentIndex = (currentIndex + 1) % certificates.length;
            updateCertificateViewer(currentIndex);
            playSound('click');
        });
    }
    
    // Download certificate
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const certificates = getCertificates();
            const cert = certificates[currentIndex];
            const link = document.createElement('a');
            link.href = cert.image;
            link.download = `certificate-${cert.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
            link.click();
            playSound('click');
        });
    }
    
    // Share certificate
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const certificates = getCertificates();
            const cert = certificates[currentIndex];
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: cert.title,
                        text: cert.description,
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                const text = `${cert.title} - ${cert.description}`;
                navigator.clipboard.writeText(text)
                    .then(() => showToast('Certificate info copied to clipboard!'))
                    .catch(err => console.log('Error copying:', err));
            }
            playSound('click');
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!viewer.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (prevBtn) prevBtn.click();
                break;
            case 'ArrowRight':
                if (nextBtn) nextBtn.click();
                break;
            case 'Escape':
                closeBtn.click();
                break;
        }
    });
    
    // Close on outside click
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            closeBtn.click();
        }
    });
}

// Certificate Slideshow
function initCertificateSlideshow() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    const slideshowDots = document.getElementById('slideshowDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!slideshowContainer) return;
    
    const certificates = getCertificates();
    let currentSlide = 0;
    
    // Load slides
    slideshowContainer.innerHTML = '';
    slideshowDots.innerHTML = '';
    
    certificates.forEach((cert, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'certificate-slide';
        slide.innerHTML = `
            <img src="${cert.image}" alt="${cert.title}" class="slide-image" loading="lazy">
            <div class="slide-content">
                <h3 class="slide-title">${cert.title}</h3>
                <p class="slide-description">${cert.description}</p>
                <div class="slide-meta">
                    <span class="slide-date">${cert.date}</span>
                    <span class="slide-issuer">${cert.issuer}</span>
                </div>
            </div>
        `;
        slideshowContainer.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = `slideshow-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        slideshowDots.appendChild(dot);
    });
    
    // Navigation functions
    function goToSlide(index) {
        currentSlide = index;
        slideshowContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.slideshow-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        playSound('click');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % certificates.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + certificates.length) % certificates.length;
        goToSlide(currentSlide);
    }
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Button events
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const certificatesSection = document.getElementById('certificates');
        if (certificatesSection.classList.contains('active')) {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        }
    });
}

// Update certificate viewer
function updateCertificateViewer(index) {
    const certificates = getCertificates();
    const cert = certificates[index];
    
    const certImage = document.getElementById('certImage');
    const certTitle = document.getElementById('certTitle');
    const certDesc = document.getElementById('certDesc');
    const certDate = document.getElementById('certDate');
    const certIssuer = document.getElementById('certIssuer');
    
    if (certImage) certImage.src = cert.image;
    if (certImage) certImage.alt = cert.title;
    if (certTitle) certTitle.textContent = cert.title;
    if (certDesc) certDesc.textContent = cert.description;
    if (certDate) certDate.textContent = cert.date;
    if (certIssuer) certIssuer.textContent = cert.issuer;
}

// Mission Terminal
function initMissionTerminal() {
    const terminal = document.getElementById('missionTerminal');
    const closeBtn = document.getElementById('terminalClose');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalCmd = document.getElementById('terminalCmd');
    
    if (!terminal) return;
    
    // Terminal commands
    const commands = {
        help: 'Available commands: help, about, skills, projects, contact, clear',
        about: 'Madhavan S - AI & Data Science Student. Passionate about ML and intelligent systems.',
        skills: 'Python, Machine Learning, Java, MongoDB, Data Analysis, Computer Vision, SQL',
        projects: 'Hand Cricket Number Detection, AI Projects, Machine Learning Models',
        contact: 'Email: mathavanmathav123@gmail.com | LinkedIn: /in/madhavan-s | GitHub: Madhavan322',
        clear: () => { 
            if (terminalOutput) terminalOutput.innerHTML = ''; 
            return ''; 
        },
        portfolio: 'Opening portfolio sections...',
        github: 'Redirecting to GitHub: https://github.com/Madhavan322',
        linkedin: 'Redirecting to LinkedIn: https://linkedin.com/in/madhavan-s-9b881a31a',
        resume: 'Downloading resume...'
    };

    // Close terminal
    closeBtn.addEventListener('click', () => {
        terminal.classList.remove('active');
        document.body.style.overflow = '';
        playSound('click');
    });
    
    // Handle command input
    if (terminalCmd) {
        terminalCmd.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalCmd.value.trim().toLowerCase();
                terminalCmd.value = '';
                
                // Display command
                displayTerminalOutput(`> ${command}`, 'input');
                
                // Execute command
                setTimeout(() => {
                    if (commands[command]) {
                        if (typeof commands[command] === 'function') {
                            commands[command]();
                        } else {
                            displayTerminalOutput(commands[command]);
                            
                            // Handle special commands
                            switch(command) {
                                case 'portfolio':
                                    setTimeout(() => showSection('home'), 1000);
                                    break;
                                case 'github':
                                    setTimeout(() => window.open('https://github.com/Madhavan322', '_blank'), 1000);
                                    break;
                                case 'linkedin':
                                    setTimeout(() => window.open('https://linkedin.com/in/madhavan-s-9b881a31a', '_blank'), 1000);
                                    break;
                                case 'resume':
                                    setTimeout(() => {
                                        const link = document.createElement('a');
                                        link.href = 'certificats/Resume Madhavan.pdf';
                                        link.download = 'Madhavan_S_Resume.pdf';
                                        link.click();
                                    }, 1000);
                                    break;
                            }
                        }
                    } else {
                        displayTerminalOutput(`Command not found: ${command}\nType "help" for available commands`);
                    }
                }, 100);
            }
        });
    }
    
    // Display output in terminal
    function displayTerminalOutput(text, type = 'output') {
        if (!terminalOutput) return;
        
        const line = document.createElement('div');
        line.className = `terminal-${type}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminal.classList.contains('active')) {
            closeBtn.click();
        }
    });
}

// ==================== EMAILJS INTEGRATION START ====================
// Initialize EmailJS
function initEmailJS() {
    // EmailJS configuration
    // REPLACE THESE WITH YOUR ACTUAL CREDENTIALS FROM EMAILJS.COM
    const serviceID = 'service_1akis1g'; // Replace with your Service ID
    const templateID = 'template_rmxrm3j'; // Replace with your Template ID
    
    // Store credentials globally
    window.emailjsServiceID = serviceID;
    window.emailjsTemplateID = templateID;
    
    // Test if EmailJS is initialized
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS initialized successfully');
        console.log('Service ID:', serviceID);
        console.log('Template ID:', templateID);
    } else {
        console.error('❌ EmailJS not loaded properly');
    }
}

// Contact Form with EmailJS
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('sender').value.trim(),
            email: document.getElementById('frequency').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast('Please fill in all fields!', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address!', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        try {
            // Show loading state
            submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
            submitBtn.disabled = true;
            
            // Get EmailJS credentials
            const serviceID = window.emailjsServiceID;
            const templateID = window.emailjsTemplateID;
            
            // Check if EmailJS is configured
            if (!serviceID || !templateID || serviceID === 'service_q0vuxgg') {
                // Fallback mode for testing
                console.log('EmailJS not configured. Using fallback mode.');
                console.log('Form data would be sent:', formData);
                
                // Simulate sending delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Handle success
                handleFormSuccess(submitBtn, originalText);
                return;
            }
            
            // Send email using EmailJS
            const response = await emailjs.send(serviceID, templateID, {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                date: new Date().toLocaleDateString()
            });
            
            if (response.status === 200) {
                handleFormSuccess(submitBtn, originalText);
            } else {
                throw new Error('Email sending failed with status: ' + response.status);
            }
            
        } catch (error) {
            console.error('❌ Error sending message:', error);
            
            // Show error state
            submitBtn.querySelector('.btn-text').textContent = 'SEND FAILED';
            submitBtn.style.background = 'linear-gradient(45deg, var(--batman-red), #cc0000)';
            
            // Play error sound if available
            playSound('error');
            
            // Show error toast
            showToast('Failed to send message. Please try again or email directly.', 'error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Handle form success
function handleFormSuccess(submitBtn, originalText) {
    // Show success state
    submitBtn.querySelector('.btn-text').textContent = 'MESSAGE SENT!';
    submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Play success sound
    playSound('success');
    
    // Show success toast
    showToast('Message sent successfully! I\'ll respond within 24 hours.', 'success');
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}
// ==================== EMAILJS INTEGRATION END ====================

// Audio Controls
function initAudioControls() {
    const musicToggle = document.getElementById('musicToggle');
    const themeToggle = document.getElementById('themeToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicToggle || !bgMusic) return;
    
    // Music toggle
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
            showToast('Music enabled');
        } else {
            bgMusic.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            showToast('Music disabled');
        }
        
        playSound('click');
    });
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
                showToast('Light theme activated');
            } else {
                icon.className = 'fas fa-moon';
                showToast('Dark theme activated');
            }
            
            playSound('click');
        });
    }
}

// Play Sound
function playSound(type) {
    let sound;
    
    switch(type) {
        case 'click':
            sound = document.getElementById('clickSound');
            break;
        case 'success':
            sound = document.getElementById('successSound');
            break;
        case 'error':
            // Use click sound for error if success sound not available
            sound = document.getElementById('clickSound');
            break;
    }
    
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => {
            if (type !== 'click') {
                console.log('Sound play prevented:', e);
            }
        });
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast';
    
    // Add type class
    if (type === 'error') {
        toast.style.background = 'rgba(255, 0, 51, 0.9)';
        toast.style.color = '#ffffff';
    } else if (type === 'success') {
        toast.style.background = 'rgba(0, 255, 0, 0.9)';
        toast.style.color = '#000000';
    }
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showToast('Email copied to clipboard!'))
        .catch(err => console.log('Error copying:', err));
    playSound('click');
}

// Dynamic Content
function initDynamicContent() {
    // Load projects
    loadProjects();
    
    // Set up button actions
    setupButtonActions();
}

// Get Certificates Data
function getCertificates() {
    return [
       {
            id: 1,
            title: "Paper Presentation",
            description: "My first certificate in Paper Presentation at Selvam College of Technology.",
            date: "2024",
            issuer: "Selvam college of technology",
            image: "certificats/WhatsApp Image 2026-01-30 at 11.20.45 AM.jpeg",
            count: 1
        },
        {
            id: 2,
            title: "Innovation Ambassador (IA)",
            description: "Successfully completed Innovation Ambassador (IA) Training at Foundation, Reskilling, and Advanced levels under MoE’s Innovation Cell & AICTE.",
            date: "2025",
            image: "certificats/Untitled design.png",
            count: 3
            
            
        },
        {
            id: 3,
            title: "WORKSHOP ON GENERATIVE AI & XAI",
            description: "Participated in a Workshop on Generative AI & XAI conducted during DHRUVA 2025 at Karpagam College of Engineering.",
            date: "2025",
            issuer: "Karpagam College of Engineering",
            image: "certificats/work.jpeg",
            count: 1
        },
       {
            id: 4,
            title: "CORE JAVA",
            description: "Successfully completed the Value Added Course on Core Java (VACAD03) at Kongunadu College of Engineering & Technology.Strengthened object-oriented programming skills and Java fundamentals through focused academic training.",
            date: "2024",
            issuer: "Kongunadu College of Engineering & Technology",
            image: "certificats/vlaue/WhatsApp Image 2026-01-30 at 11.51.18 AM (1).jpeg",
            count: 1
        },
        {
            id: 5,
            title: "Machine Learning with AI Applications",
            description: "Completed a Value Added Course on Machine Learning with AI Applications in association with Saived Perficient Pvt Ltd, gaining hands-on exposure to real-world ML use cases.",
            date: "2024",
            issuer: "kongunadu College of Engineering & Technology",
            image: "certificats/vlaue/WhatsApp Image 2026-01-30 at 11.51.18 AM.jpeg",
            count: 1
        },
        {
            id: 6,
            title: "Hackathon Participation - VIT",
            description: "Participated in national level hackathon focusing on AI and machine learning solutions.That's my first hackathon experience.that learned me a lot.",
            date: "2025",
            issuer: "Vellore Institute of Technology--VIT",
            image: "certificats/Hackthon/WhatsApp Image 2025-10-19 at 22.34.15_f2fffa77.jpg",
            count: 1
        },
        {
            id: 7,
            title: "Hackathon Participation - KPR",
            description: "Competed my second hackathon event, at KPR that was more helpful and knowledgeable.project tiltle is alzimer's detection using machine learning.",
            date: "2025",
            issuer: "KPR Institute of Engineering and Technology",
            image: "certificats/Hackthon/WhatsApp Image 2025-10-19 at 22.34.16_cfee68a6.jpg",
            count: 1
        },
      /*  {
            id: 8,
            title: "Database Management with MongoDB",
            description: "Certified in MongoDB database management, NoSQL concepts, and data modeling.",
            date: "2024",
            issuer: "MongoDB University",
            image: "certificats/mongodb-certificate.jpg",
            count: 1
        }*/
    ];
}

// Load Projects
function loadProjects() {
    const projectsGrid = document.querySelector('.missions-grid');
    
    if (!projectsGrid) return;
    
    const projects = [
        {
            title: "HAND CRICKET NUMBER DETECTION",
            description: "A real-time hand cricket number detection system that uses Python, OpenCV, and MediaPipe to recognize finger gestures through a webcam.",
            technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Machine Learning", "Real-Time Video Processing"],
            github: "https://github.com/Madhavan322/PROJECT/tree/main/Hand%20Number%20Detection",
            demo: null,
            icon: "fas fa-hand-pointer"
        },
       {
            title: "CGPA-CALCULATOR FOR KNCET-UGR 2020",
            description: "Using Simple HTML, CSS, and JavaScript to create a user-friendly CGPA calculator tailored for KNCET-UGR 2020 curriculum.",
            technologies: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/Madhavan322/CGPA-Calculater",
            demo: "https://madhavan322.github.io/CGPA-Calculater/",
            icon: "fas fa-calculator"
        },
       /* {
            title: "IMAGE RECOGNITION SYSTEM",
            description: "Deep learning model for image classification using Convolutional Neural Networks on CIFAR-10 dataset.",
            technologies: ["Python", "TensorFlow", "CNN", "Deep Learning"],
            github: "https://github.com/Madhavan322",
            demo: null,
            icon: "fas fa-eye"
        }*/
    ];
    
    projectsGrid.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animated';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        projectCard.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="${project.icon}"></i>
                </div>
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                </div>
            </div>
            
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-links">
                <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i>
                    <span>VIEW CODE</span>
                </a>
                ${project.demo ? `
                <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i>
                    <span>LIVE DEMO</span>
                </a>
                ` : `
                <a href="${project.github}" class="project-link" onclick="showToast('Demo coming soon! Check GitHub for code.'); return false;">
                    <i class="fas fa-external-link-alt"></i>
                    <span>VIEW DEMO</span>
                </a>
                `}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Setup Button Actions
function setupButtonActions() {
    // Smooth scroll for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
    // External links open in new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Initialize Animations
function initAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.weapon-card, .project-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Add mouse move effect
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const batSignal = document.querySelector('.bat-signal-beam');
        if (batSignal) {
            batSignal.style.transform = `translateX(-50%) rotate(${x}deg)`;
        }
        
        const podFrame = document.querySelector('.pod-frame');
        if (podFrame) {
            podFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
    
    // Fix for mobile menu
    window.addEventListener('resize', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.width = 'auto';
            navMenu.style.background = 'transparent';
            navMenu.style.backdropFilter = 'none';
            navMenu.style.padding = '0';
            navMenu.style.borderTop = 'none';
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        playSound('click');
    });
}

// Mobile Navigation
function initMobileNav() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            mobileNavItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            playSound('click');
        });
    });
    
    // Update active mobile nav based on section
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                mobileNavItems.forEach(item => item.classList.remove('active'));
                if (mobileNavItems[index]) {
                    mobileNavItems[index].classList.add('active');
                }
            }
        });
    });
}

// Add global helper functions
window.showSection = showSection;
window.openMissionTerminal = openMissionTerminal;
window.openCertificateViewer = openCertificateViewer;
window.copyToClipboard = copyToClipboard;

// Test EmailJS function (optional)
function testEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded');
        return;
    }
    
    const serviceID = window.emailjsServiceID;
    const templateID = window.emailjsTemplateID;
    
    if (serviceID && templateID && serviceID !== 'service_q0vuxgg') {
        console.log('✅ EmailJS Configured:');
        console.log('Service ID:', serviceID);
        console.log('Template ID:', templateID);
        return true;
    } else {
        console.warn('⚠️ EmailJS not configured. Using fallback mode.');
        return false;
    }
}

// Initialize everything when window loads
window.addEventListener('load', () => {
    // Set active mobile nav item
    setTimeout(() => {
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        if (mobileNavItems[0]) {
            mobileNavItems[0].classList.add('active');
        }
    }, 100);
    
    // Test EmailJS on load (optional)
    // testEmailJS();
});

console.log('AI Engineer Portfolio initialized successfully!');