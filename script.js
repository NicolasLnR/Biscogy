// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a navigation item
        document.querySelectorAll('.nav-menu a').forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Form Submission Handler
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showFormMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Phone validation - simple Brazilian format check
            const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
            if (!phoneRegex.test(formData.phone)) {
                showFormMessage('Por favor, insira um telefone válido.', 'error');
                return;
            }
            
            // Simulate form submission success
            // In a real implementation, you would send this data to a server
            console.log('Form data:', formData);
            showFormMessage('Pedido enviado com sucesso! Entraremos em contato em breve.', 'success');
            
            // Reset form
            orderForm.reset();
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(message, type) {
        // Check if a message element already exists and remove it
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add styles based on message type
        if (type === 'error') {
            messageElement.style.backgroundColor = '#ffdddd';
            messageElement.style.color = '#d83131';
        } else if (type === 'success') {
            messageElement.style.backgroundColor = '#ddffdd';
            messageElement.style.color = '#28a745';
        }
        
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '15px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.textAlign = 'center';
        
        // Insert message after the form
        orderForm.after(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Add animation on scroll for elements
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.product-card, .featured-item, .gallery-item');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.product-card, .featured-item, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on initial load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Image gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1001';
            
            // Create image element
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '90%';
            lightboxImg.style.borderRadius = '5px';
            
            // Create close button
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.color = 'white';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.cursor = 'pointer';
            
            // Add elements to lightbox
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Close lightbox when clicking close button or outside the image
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
});