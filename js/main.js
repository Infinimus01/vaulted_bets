// Vault Animation and Main Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const vaultContainer = document.getElementById('vaultContainer');
    const vaultDoor = document.getElementById('vaultDoor');
    const vaultHandle = document.getElementById('vaultHandle');
    const vaultContent = document.getElementById('vaultContent');
    const enterSiteBtn = document.getElementById('enterSite');
    const mainContent = document.getElementById('mainContent');
    const contactForm = document.getElementById('contactForm');
    
    
    const ANIMATION_DELAYS = {
        INITIAL: 1000,
        HANDLE_PULL: 600,
        DOOR_OPEN: 800,
        CONTENT_REVEAL: 800
    };

    
    function startVaultAnimation() {
        console.log('Starting vault animation...');
        
        
        setTimeout(() => {
            vaultHandle.classList.add('pulled');
            console.log('Handle pulled');
            
            
            setTimeout(() => {
                vaultDoor.classList.add('open');
                console.log('Door opened');
                
                
                setTimeout(() => {
                    vaultContent.classList.add('show');
                    console.log('Content revealed');
                }, ANIMATION_DELAYS.CONTENT_REVEAL);
                
            }, ANIMATION_DELAYS.DOOR_OPEN);
            
        }, ANIMATION_DELAYS.HANDLE_PULL);
    }


    function enterSite() {
        console.log('Entering site...');
        
       
        vaultContent.style.opacity = '0';
        vaultContent.style.transform = 'translateY(-20px)';
        
       
        setTimeout(() => {
            vaultContainer.style.opacity = '0';
        
            setTimeout(() => {
                vaultContainer.style.display = 'none';
                mainContent.classList.add('show');
                
              
                animateCardsOnScroll();
                console.log('Site entered successfully');
            }, 1000);
        }, 500);
    }


    function animateCardsOnScroll() {
        const cards = document.querySelectorAll('.card, .testimonial');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }


    function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
      
        setTimeout(() => {
          
            alert('Thank you for your message! We will get back to you soon.');
         
            this.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            console.log('Form submitted successfully');
        }, 2000);
    }

   
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

   
    function init() {
        console.log('Initializing Vaulted Bets website...');
        
       
        startVaultAnimation();
        
   
        enterSiteBtn.addEventListener('click', enterSite);
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
       
        initSmoothScrolling();
        
       
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    }

   
    init();
});


window.addEventListener('load', function() {
    console.log('Website fully loaded');
    
    // We can Add any post-load functionality here
    const preloadImages = [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});