// Import necessary libraries
import AOS from "aos"
import $ from "jquery"
import bootstrap from "bootstrap"
import { gtag } from "gtag.js" // Declare gtag variable
import { fbq } from "fbq.js" // Declare fbq variable

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-out",
    once: true,
    offset: 100,
  })

  // Navbar scroll behavior
  const navbar = document.getElementById("mainNav")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.classList.add("scrolled")
      document.querySelector(".back-to-top").classList.add("active")
    } else {
      navbar.classList.remove("scrolled")
      document.querySelector(".back-to-top").classList.remove("active")
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

  // Back to top button
  document.querySelector(".back-to-top").addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Mobile menu close on link click
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    })
  })

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("animate__animated", "animate__pulse")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("animate__animated", "animate__pulse")
    })
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
  function animateFloatingElements() {
    document.querySelectorAll(".floating-circle, .floating-star, .floating-plus, .floating-dot").forEach((element) => {
      const randomDelay = Math.random() * 2
      const randomDuration = 8 + Math.random() * 4

      element.style.animationDelay = `${randomDelay}s`
      element.style.animationDuration = `${randomDuration}s`
    })
  }

  animateFloatingElements()

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

  // Blog cards hover effect
  document.querySelectorAll(".blog-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelector(".blog-image img").style.transform = "scale(1.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.querySelector(".blog-image img").style.transform = "scale(1)"
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        showNotification("Please fill in all required fields.", "error")
        return
      }

      // Email validation
      if (!isValidEmail(formData.email)) {
        showNotification("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitButton.disabled = true

      setTimeout(() => {
        showNotification("Thank you! Your message has been sent successfully.", "success")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }

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

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-content .title")
  if (heroTitle) {
    const titleText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, titleText, 50)
    }, 1000)
  }

  // Service cards stagger animation
  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Blog cards stagger animation
  document.querySelectorAll(".blog-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Benefit cards stagger animation
  document.querySelectorAll(".benefit-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Mouse parallax effect
  window.addEventListener("mousemove", (e) => {
    const mouseX = e.pageX
    const mouseY = e.pageY
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    document.querySelectorAll(".floating-circle").forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.02
      const x = (windowWidth - mouseX * speed) / 100
      const y = (windowHeight - mouseY * speed) / 100

      element.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
  })

  // Add data-speed attributes to floating elements
  document.querySelectorAll(".floating-circle").forEach((element, index) => {
    element.setAttribute("data-speed", 0.02 + index * 0.01)
  })

  // Form field focus effects
  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value.trim()) {
        this.parentElement.classList.remove("focused")
      }
    })
  })

  // Button ripple effect
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      const offset = this.getBoundingClientRect()
      const x = e.clientX - offset.left
      const y = e.clientY - offset.top

      ripple.style.top = `${y}px`
      ripple.style.left = `${x}px`
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple CSS
  const style = document.createElement("style")
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // Performance optimization - Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
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
})

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
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

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Analytics tracking (replace with your analytics code)
function trackEvent(eventName, eventData = {}) {
  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData)
  }

  // Facebook Pixel
  if (typeof fbq !== "undefined") {
    fbq("track", eventName, eventData)
  }
}

// Track form submissions
document.addEventListener("submit", (e) => {
  if (e.target.tagName === "FORM") {
    const formId = e.target.id || "unknown"
    trackEvent("form_submit", {
      form_id: formId,
    })
  }
})

// Track button clicks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const buttonText = this.textContent.trim()
    trackEvent("button_click", {
      button_text: buttonText,
    })
  })
})

// Track scroll depth
let maxScrollDepth = 0
window.addEventListener("scroll", () => {
  const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
  if (scrollDepth > maxScrollDepth) {
    maxScrollDepth = scrollDepth
    if (maxScrollDepth % 25 === 0) {
      trackEvent("scroll_depth", {
        depth: maxScrollDepth,
      })
    }
  }
})

// Track time on page
const startTime = Date.now()
window.addEventListener("beforeunload", () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000)
  trackEvent("time_on_page", {
    seconds: timeOnPage,
  })
})
