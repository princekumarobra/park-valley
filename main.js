// FINAL JAVASCRIPT CODE - REUSABLE ACROSS ALL PAGES

document.addEventListener('DOMContentLoaded', function() {
  
  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // MOBILE MENU TOGGLE
  window.mobileMenuToggle = function() {
    const nav = document.getElementById("navLinks");
    if (nav.style.display === "flex") {
      nav.style.display = "none";
    } else {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = '55px'; // Below navbar
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.backgroundColor = 'white';
      nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      nav.style.zIndex = '900';
      nav.style.paddingBottom = '10px';
    }
  }
  
  // FORM SUBMIT (Works on all pages with an enquiryForm)
  const form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("enquiryName").value.trim();
      const mobile = document.getElementById("enquiryMobile").value.trim();
      const interest = document.getElementById("enquiryInterest").value;
      const formMessage = document.getElementById("formMessage");
      
      // Validation checks
      if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
        formMessage.textContent = "Please enter a valid 10-digit mobile number.";
        formMessage.style.color = '#ff9800';
        return;
      }
      if (name === "" || interest === "") {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = '#ff9800';
        return;
      }
      
      // --- SUCCESS MESSAGE ---
      formMessage.textContent = `Thank you ${name}! Your enquiry for ${interest} has been sent. We will call you soon.`;
      formMessage.style.color = '#fff';
      document.getElementById("enquiryForm").reset();
    });
  }
  
  // VISIT COUNTER
  let v = localStorage.getItem("parkvalley_visits") || 0;
  v++;
  localStorage.setItem("parkvalley_visits", v);
  const visitElement = document.getElementById("visitCount");
  if (visitElement) {
    visitElement.innerText = v;
  }
  
  // LIGHTBOX/MODAL FUNCTIONS (Reusable)
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  window.openLightbox = function(imgSrc, captionText) {
    if (!lightbox) return;
    lightbox.style.display = 'block';
    lightboxImage.src = imgSrc;
    lightboxCaption.innerHTML = captionText;
    document.body.style.overflow = 'hidden';
  };
  
  window.closeLightbox = function() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  };
  
  if (lightbox) {
    // Close lightbox if user clicks anywhere outside the image (on the dark background)
    lightbox.addEventListener('click', function(e) {
      if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-btn')) {
        closeLightbox();
      }
    });
  }
  
  // STATS ANIMATION
  const statsSection = document.querySelector('.stats-section');
  const animateStats = () => {
    const counters = document.querySelectorAll(".stat-box h3");
    counters.forEach(counter => {
      let targetText = counter.innerText.replace('+', '');
      let target = parseInt(targetText);
      let count = 0;
      let interval = setInterval(() => {
        count++;
        counter.innerText = count + '+';
        if (count >= target) {
          clearInterval(interval);
          counter.innerText = targetText + '+';
        }
      }, 30);
    });
  };
  
  // Animate when the section is visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% visible
  
  if (statsSection) {
    observer.observe(statsSection);
  }
  
});
