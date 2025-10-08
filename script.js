// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mobile menu clicked'); // Debug log
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
            } else {
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '☰';
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && mobileMenuBtn) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Story click handlers
    window.openStory = function(storyId) {
        const stories = {
            'sukumvasi': {
                title: 'सुकुम्वासी',
                content: 'This is where you can add the full story content. You can replace this with actual story text or redirect to a dedicated story page.'
            },
            'chugli': {
                title: 'चुग्ली',
                content: 'This is where you can add the full story content. You can replace this with actual story text or redirect to a dedicated story page.'
            },
            'irshya': {
                title: 'ईर्ष्या',
                content: 'This is where you can add the full story content. You can replace this with actual story text or redirect to a dedicated story page.'
            }
        };

        const story = stories[storyId];
        if (story) {
            // Create a simple modal
            showStoryModal(story.title, story.content);
        }
    };

    // Simple modal for stories
    function showStoryModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.story-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'story-modal';
        modal.innerHTML = `
            <div class="story-modal-overlay">
                <div class="story-modal-content">
                    <div class="story-modal-header">
                        <h2>${title}</h2>
                        <button class="story-modal-close">&times;</button>
                    </div>
                    <div class="story-modal-body">
                        <p>${content}</p>
                        <p><em>You can add the full story content here or redirect to dedicated story pages.</em></p>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .story-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
            }
            
            .story-modal-overlay {
                background: rgba(0,0,0,0.8);
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            .story-modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                animation: modalSlideIn 0.3s ease;
            }
            
            .story-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            
            .story-modal-header h2 {
                font-family: 'Playfair Display', serif;
                color: #2c3e50;
                margin: 0;
            }
            
            .story-modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .story-modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .story-modal-body {
                padding: 1.5rem;
                line-height: 1.8;
                color: #666;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        // Add styles to head if not already added
        if (!document.querySelector('#modal-styles')) {
            const styleTag = document.createElement('style');
            styleTag.id = 'modal-styles';
            styleTag.textContent = modalStyles;
            document.head.appendChild(styleTag);
        }

        // Add modal to body
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.story-modal-close');
        const overlay = modal.querySelector('.story-modal-overlay');

        function closeModal() {
            modal.remove();
        }

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Header scroll effect
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navigation on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add active navigation styles
    const activeNavStyles = `
        .nav-menu li a.active {
            background: #3498db;
            color: white;
        }
    `;

    const activeStyleTag = document.createElement('style');
    activeStyleTag.textContent = activeNavStyles;
    document.head.appendChild(activeStyleTag);

    // Listen for scroll events to highlight active section
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initial call to set active section
    highlightActiveSection();

    // Form submission handler (if you add contact form later)
    window.handleContactForm = function(event) {
        event.preventDefault();
        // Add your form handling logic here
        alert('Thank you for your message! This is where you would handle form submission.');
        return false;
    };

    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('Literature website loaded successfully!');
});