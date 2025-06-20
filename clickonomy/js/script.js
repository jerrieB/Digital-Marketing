// Import AOS and bootstrap
import AOS from "aos"
import bootstrap from "bootstrap"

// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Form validation
  const forms = document.querySelectorAll(".needs-validation")

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add("was-validated")
      },
      false,
    )
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar active state based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  function highlightNavLink() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Counter animation
  function animateCounter(element, start, end, duration) {
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      element.innerHTML = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  // Initialize counters when they come into view
  const counters = document.querySelectorAll(".counter")
  const options = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const end = Number.parseInt(element.getAttribute("data-count"))
        animateCounter(element, 0, end, 2000)
        observer.unobserve(element)
      }
    })
  }, options)

  counters.forEach((counter) => {
    observer.observe(counter)
  })

  // Testimonial carousel
  const testimonialCarousel = document.querySelector("#testimonialCarousel")
  if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
    })
  }

  // Back to top button
  const backToTopBtn = document.querySelector("#backToTop")
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    document.addEventListener("click", (e) => {
      const isClickInside = navbarToggler.contains(e.target) || navbarCollapse.contains(e.target)

      if (!isClickInside && navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  }

  // Form submission handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real implementation, you would send the form data to the server here
      // For this example, we'll just show a success message

      const formData = new FormData(contactForm)
      const formValues = {}

      formData.forEach((value, key) => {
        formValues[key] = value
      })

      console.log("Form submitted with values:", formValues)

      // Show success message
      const successMessage = document.createElement("div")
      successMessage.className = "alert alert-success mt-3"
      successMessage.innerHTML = "Thank you for your message! We will get back to you shortly."

      contactForm.reset()
      contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling)

      // Remove the success message after 5 seconds
      setTimeout(() => {
        successMessage.remove()
      }, 5000)
    })
  }
})
