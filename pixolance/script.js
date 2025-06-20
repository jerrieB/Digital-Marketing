// Sparkles Animation
class SparklesAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    if (!this.canvas) return

    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.mousePosition = { x: 0, y: 0 }

    this.init()
    this.bindEvents()
    this.animate()
  }

  init() {
    this.resizeCanvas()
    this.createParticles()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    this.particles = []
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 12000)

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas))
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas()
      this.createParticles()
    })

    window.addEventListener("mousemove", (e) => {
      this.mousePosition.x = e.clientX
      this.mousePosition.y = e.clientY
    })
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.update(this.mousePosition)
      particle.draw(this.ctx)
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Particle Class
class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 0.8 + 0.6
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.5
  }

  update(mousePosition) {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around edges
    if (this.x > this.canvas.width) this.x = 0
    if (this.x < 0) this.x = this.canvas.width
    if (this.y > this.canvas.height) this.y = 0
    if (this.y < 0) this.y = this.canvas.height

    // Mouse interaction
    const dx = mousePosition.x - this.x
    const dy = mousePosition.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 100) {
      const angle = Math.atan2(dy, dx)
      this.x -= Math.cos(angle) * 1
      this.y -= Math.sin(angle) * 1
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

// Floating Papers Animation
class FloatingPapers {
  constructor(containerId, count = 6) {
    this.container = document.getElementById(containerId)
    if (!this.container) return

    this.count = count
    this.papers = []
    this.createPapers()
  }

  createPapers() {
    for (let i = 0; i < this.count; i++) {
      const paper = document.createElement("div")
      paper.className = "floating-paper"
      paper.innerHTML = '<i class="bi bi-file-text"></i>'

      // Random initial position
      const x = Math.random() * (window.innerWidth - 64)
      const y = Math.random() * (window.innerHeight - 80)

      paper.style.left = x + "px"
      paper.style.top = y + "px"

      // Random animation duration and delay
      const duration = 15 + Math.random() * 10
      const delay = Math.random() * 5

      paper.style.animation = `floatPaper ${duration}s ease-in-out ${delay}s infinite`

      this.container.appendChild(paper)
      this.papers.push(paper)

      // Animate position
      this.animatePaper(paper)
    }
  }

  animatePaper(paper) {
    const animate = () => {
      const x = Math.random() * (window.innerWidth - 64)
      const y = Math.random() * (window.innerHeight - 80)

      paper.style.transition = "all 20s linear"
      paper.style.left = x + "px"
      paper.style.top = y + "px"

      setTimeout(animate, 20000)
    }

    setTimeout(animate, Math.random() * 5000)
  }
}

// Navbar Animation
class NavbarAnimation {
  constructor() {
    this.navbar = document.querySelector(".custom-navbar")
    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        this.navbar.style.background = "rgba(0, 0, 0, 0.95)"
      } else {
        this.navbar.style.background = "rgba(0, 0, 0, 0.8)"
      }
    })
  }
}

// Intersection Observer for animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions)

    this.initObserver()
  }

  initObserver() {
    const animatedElements = document.querySelectorAll(".feature-card, .step-card, .example-card, .pricing-card")

    animatedElements.forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "all 0.6s ease"
      el.style.transitionDelay = `${index * 0.1}s`
      this.observer.observe(el)
    })
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".counter")
    this.initCounters()
  }

  initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    })

    this.counters.forEach((counter) => {
      observer.observe(counter)
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      element.textContent = Math.floor(current)

      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  new SparklesAnimation("sparkles-canvas")
  new FloatingPapers("floating-papers", 6)
  new NavbarAnimation()
  new ScrollAnimations()
  new CounterAnimation()

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 76 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Button hover effects
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      if (!this.classList.contains("btn-outline-light")) {
        this.style.transform = "translateY(-2px)"
      }
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Form handling (placeholder)
  document.querySelectorAll(".btn-purple, .btn-outline-purple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.textContent.includes("Upload Paper")) {
        // Simulate file upload
        this.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...'
        this.disabled = true

        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-check-circle me-2"></i>Upload Complete!'
          setTimeout(() => {
            this.innerHTML = '<i class="bi bi-file-text me-2"></i>Upload Paper'
            this.disabled = false
          }, 2000)
        }, 3000)
      }
    })
  })

  // Navbar collapse on mobile link click
  const navLinks = document.querySelectorAll(".nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })
})

// Handle window resize
window.addEventListener("resize", () => {
  // Update floating papers positions if needed
  const papers = document.querySelectorAll(".floating-paper")
  papers.forEach((paper) => {
    const x = Math.random() * (window.innerWidth - 64)
    const y = Math.random() * (window.innerHeight - 80)
    paper.style.left = x + "px"
    paper.style.top = y + "px"
  })
})

// Performance optimization
window.addEventListener("load", () => {
  // Preload critical animations
  document.body.classList.add("loaded")
})

// Add loading state
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})
