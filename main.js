/* main.js */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Run on initial load too in case page starts scrolled down
  handleScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      header.classList.toggle('menu-open');
      
      // Animate the hamburger icon lines to an 'X'
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        header.classList.remove('menu-open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 3. Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Adjust for fixed header height (80px)
        const headerHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Modal Overlay for Style Cards
  const styleCards = document.querySelectorAll('.style-card');
  const modal = document.querySelector('#style-modal');
  
  if (styleCards.length && modal) {
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    const modalImageCol = modal.querySelector('.modal-image-col');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDetails = modal.querySelector('.modal-details');
    const modalContentCol = modal.querySelector('.modal-content-col');

    styleCards.forEach(card => {
      // Style cursor to signify clickability
      card.style.cursor = 'pointer';

      card.addEventListener('click', (e) => {
        // If the user clicked the CTA button directly, let the default link behavior take over
        if (e.target.closest('.card-button')) {
          return;
        }

        // Extract background image and content dynamically from the clicked card
        const bgImg = window.getComputedStyle(card).backgroundImage;
        const titleHtml = card.querySelector('.card-title').innerHTML;
        const detailsHtml = card.querySelector('.card-details').innerHTML;

        // Apply to modal
        modalImageCol.style.backgroundImage = bgImg;
        modalTitle.innerHTML = titleHtml;
        modalDetails.innerHTML = detailsHtml;

        // Clean up any existing dynamically replicated buttons
        const existingModalBtn = modalContentCol.querySelector('.modal-btn');
        if (existingModalBtn) {
          existingModalBtn.remove();
        }

        // If card contains a CTA button, replicate it in the modal
        const cardBtn = card.querySelector('.card-button');
        if (cardBtn) {
          const modalBtn = document.createElement('a');
          modalBtn.className = 'modal-btn';
          modalBtn.href = cardBtn.href;
          modalBtn.target = cardBtn.target;
          modalBtn.rel = cardBtn.rel;
          modalBtn.innerHTML = cardBtn.innerHTML;
          modalContentCol.appendChild(modalBtn);
        }

        // Open modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }
});
