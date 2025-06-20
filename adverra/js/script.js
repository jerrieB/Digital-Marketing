// Import necessary libraries
import AOS from "aos"
import $ from "jquery"
import bootstrap from "bootstrap"
import { gtag } from "gtag.js" // Declare gtag variable

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-out",
    once: true,
    offset: 100,
    delay: 0,
  })

  // Navbar scroll behavior
  const navbar = document.getElementById("mainNav")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
      navbar.style.backdropFilter = "blur(10px)"
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
    lastScrollTop = scrollTop
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = document.querySelector("#mainNav").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler")
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      }
    })
  })

  // Form validation and submission
  const consultationForm = document.getElementById("consultationForm")
  const contactForm = document.getElementById("contactForm")

  // Consultation form handler
  if (consultationForm) {
    consultationForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleFormSubmission(consultationForm, "consultation")
    })
  }

  // Contact form handler
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleFormSubmission(contactForm, "contact")
    })
  }

  // Generic form submission handler
  function handleFormSubmission(form, type) {
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Validate required fields
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("is-invalid")
        isValid = false
      } else {
        field.classList.remove("is-invalid")
      }
    })

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]')
    emailFields.forEach((field) => {
      if (field.value && !isValidEmail(field.value)) {
        field.classList.add("is-invalid")
        isValid = false
      }
    })

    if (!isValid) {
      showNotification("Please fill in all required fields correctly.", "error")
      return
    }

    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    // Simulate API call
    setTimeout(() => {
      const message =
        type === "consultation"
          ? "Thank you! We'll contact you within 24 hours to schedule your free consultation."
          : "Thank you for your message! We'll get back to you soon."

      showNotification(message, "success")
      form.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false

      // Track conversion (you would integrate with your analytics here)
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submit", {
          event_category: "engagement",
          event_label: type,
        })
      }
    }, 2000)
  }

  // Counter animation for statistics
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe stat numbers and result numbers
  document.querySelectorAll(".stat-number, .result-number").forEach((stat) => {
    observer.observe(stat)
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroImage = document.querySelector(".hero-image img")

    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`
    }
  })

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Work item hover effects with jQuery
  $(".work-item").each(function () {
    $(this).hover(
      function () {
        $(this).find(".work-overlay").css("opacity", "1")
        $(this).css("transform", "translateY(-10px)")
      },
      function () {
        $(this).find(".work-overlay").css("opacity", "0")
        $(this).css("transform", "translateY(0)")
      },
    )
  })

  // Testimonial slider auto-rotation
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  let currentTestimonial = 0

  function rotateTestimonials() {
    testimonialItems.forEach((item, index) => {
      item.style.opacity = index === currentTestimonial ? "1" : "0.7"
      item.style.transform = index === currentTestimonial ? "scale(1)" : "scale(0.95)"
    })

    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length
  }

  // Start testimonial rotation
  if (testimonialItems.length > 1) {
    setInterval(rotateTestimonials, 5000)
  }

  // Pricing card interactions
  const pricingCards = document.querySelectorAll(".pricing-card")
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(-10px) scale(1.02)"
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)"
      }
    })

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(0) scale(1)"
        this.style.boxShadow = ""
      }
    })
  })

  // FAQ accordion enhancements
  const accordionButtons = document.querySelectorAll(".accordion-button")
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add smooth transition effect
      const target = document.querySelector(this.getAttribute("data-bs-target"))
      if (target) {
        target.style.transition = "all 0.3s ease"
      }
    })
  })

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Add loading animation to images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
      this.style.transform = "scale(1)"
    })

    // Set initial state
    img.style.opacity = "0"
    img.style.transform = "scale(0.95)"
    img.style.transition = "opacity 0.5s ease, transform 0.5s ease"

    // If image is already loaded
    if (img.complete) {
      img.style.opacity = "1"
      img.style.transform = "scale(1)"
    }
  })

  // Smooth reveal animation for elements
  const revealElements = document.querySelectorAll(
    ".service-card, .work-item, .result-card, .testimonial-item, .pricing-card",
  )
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100) // Stagger the animations
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    revealObserver.observe(el)
  })

  // CTA button pulse animation
  const ctaButtons = document.querySelectorAll(".btn-primary")
  ctaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 1s infinite"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.animation = "none"
    })
  })

  // Progress bar animation for process section
  const processItems = document.querySelectorAll(".process-item")
  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateX(0)"
          }, index * 200)
        }
      })
    },
    { threshold: 0.3 },
  )

  processItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    processObserver.observe(item)
  })

  // Dynamic background for hero section
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100

      heroSection.style.background = `
        linear-gradient(135deg, 
          hsl(${220 + x * 0.1}, 70%, ${95 - y * 0.05}%) 0%, 
          hsl(${240 + y * 0.1}, 60%, ${98 - x * 0.02}%) 100%
        )
      `
    })
  }

  // Floating elements animation
  const floatingElements = document.querySelectorAll(".service-icon, .result-icon, .contact-icon")
  floatingElements.forEach((element, index) => {
    element.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`
  })

  // Add floating animation keyframes
  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `
  document.head.appendChild(style)

  // Newsletter subscription (if you add one)
  const newsletterForms = document.querySelectorAll(".newsletter-form")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.classList.add("is-invalid")
        showNotification("Please enter a valid email address.", "error")
      } else {
        emailInput.classList.remove("is-invalid")
        showNotification("Thank you for subscribing to our newsletter!", "success")
        form.reset()
      }
    })
  })

  // Performance monitoring
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          console.log("Page load time:", entry.loadEventEnd - entry.loadEventStart, "ms")
        }
      }
    })
    observer.observe({ entryTypes: ["navigation"] })
  }
})

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const colors = {
    success: "#06d6a0",
    error: "#f72585",
    info: "#4cc9f0",
    warning: "#f5a623",
  }

  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      </div>
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    display: flex;
    align-items: center;
    gap: 1rem;
  `

  // Style notification content
  const content = notification.querySelector(".notification-content")
  content.style.cssText = `
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  `

  // Style close button
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }
  }, 5000)
}

function animateCounter(element) {
  const text = element.textContent
  const target = Number.parseInt(text.replace(/[^\d]/g, ""))
  const isPercentage = text.includes("%")
  const isNegative = text.includes("-")
  const hasPlus = text.includes("+")
  const hasK = text.includes("K")

  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      let displayValue = Math.floor(current)
      if (hasK) displayValue = displayValue >= 1000 ? Math.floor(displayValue / 1000) + "K" : displayValue
      element.textContent = (isNegative ? "-" : "") + displayValue + (isPercentage ? "%" : hasPlus && !hasK ? "+" : "")
      requestAnimationFrame(updateCounter)
    } else {
      let finalValue = target
      if (hasK) finalValue = finalValue >= 1000 ? Math.floor(finalValue / 1000) + "K" : finalValue
      element.textContent = (isNegative ? "-" : "") + finalValue + (isPercentage ? "%" : hasPlus && !hasK ? "+" : "")
    }
  }

  updateCounter()
}

// Preloader
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Remove any loading states
  const loadingElements = document.querySelectorAll(".loading")
  loadingElements.forEach((el) => {
    el.classList.remove("loading")
  })

  // Trigger initial animations
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})

// Performance optimization - Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // You could send this to your error tracking service
})

// Service Worker registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Analytics tracking (replace with your analytics code)
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }
  // You can also add other analytics services here
}

// Track scroll depth
let maxScrollDepth = 0
window.addEventListener("scroll", () => {
  const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
  if (scrollDepth > maxScrollDepth) {
    maxScrollDepth = scrollDepth
    if (maxScrollDepth % 25 === 0) {
      trackEvent("scroll_depth", { depth: maxScrollDepth })
    }
  }
})

// Track time on page
const startTime = Date.now()
window.addEventListener("beforeunload", () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000)
  trackEvent("time_on_page", { seconds: timeOnPage })
})
