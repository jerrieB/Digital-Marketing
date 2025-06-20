$(document).ready(() => {
  // Declare variables
  const $ = window.$
  const AOS = window.AOS

  // Initialize AOS Animation
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: "ease-in-out",
  })

  // Navbar Scroll Effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled")
    } else {
      $(".navbar").removeClass("scrolled")
    }

    // Back to Top Button
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").addClass("active")
    } else {
      $(".back-to-top").removeClass("active")
    }
  })

  // Back to Top Button Click
  $(".back-to-top").click((e) => {
    e.preventDefault()
    $("html, body").animate({ scrollTop: 0 }, 800)
    return false
  })

  // Smooth Scrolling for Anchor Links
  $('a[href^="#"]:not([data-bs-toggle])').click(function (e) {
    e.preventDefault()
    var target = $(this.hash)
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800,
      )
    }
  })

  // Counter Animation
  $(".counter").each(function () {
    var $this = $(this)
    var countTo = $this.text()

    $({ countNum: 0 }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 2000,
        easing: "linear",
        step: function () {
          $this.text(Math.floor(this.countNum))
        },
        complete: function () {
          $this.text(this.countNum)
        },
      },
    )
  })

  // Progress Bars Animation
  function animateProgressBars() {
    $(".progress-bar").each(function () {
      var $this = $(this)
      var width = $this.attr("style").match(/width:\s*(\d+)%/)
      if (width) {
        $this.css("width", "0%")
        $this.animate(
          {
            width: width[0],
          },
          1500,
        )
      }
    })
  }

  // Trigger progress bars animation when in viewport
  var progressBarsAnimated = false
  $(window).scroll(() => {
    if (!progressBarsAnimated && $(".conversion-metrics").length) {
      var elementTop = $(".conversion-metrics").offset().top
      var elementBottom = elementTop + $(".conversion-metrics").outerHeight()
      var viewportTop = $(window).scrollTop()
      var viewportBottom = viewportTop + $(window).height()

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        animateProgressBars()
        progressBarsAnimated = true
      }
    }
  })

  // Services Accordion
  $(".service-item").click(function () {
    var target = $(this).attr("data-bs-target")
    var isExpanded = $(this).attr("aria-expanded") === "true"

    // Close all other items
    $(".service-item").attr("aria-expanded", "false")
    $(".service-content").removeClass("show")

    // Toggle current item
    if (!isExpanded) {
      $(this).attr("aria-expanded", "true")
      $(target).addClass("show")
    }
  })

  // Testimonials Slider
  var currentTestimonial = 0
  var testimonials = $(".testimonial-item")
  var totalTestimonials = testimonials.length

  function showTestimonial(index) {
    testimonials.removeClass("active")
    testimonials.eq(index).addClass("active")
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials
    showTestimonial(currentTestimonial)
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials
    showTestimonial(currentTestimonial)
  }

  // Auto-play testimonials
  setInterval(nextTestimonial, 5000)

  // Testimonials navigation
  $(".testimonials-section .slider-next").click(nextTestimonial)
  $(".testimonials-section .slider-prev").click(prevTestimonial)

  // Case Studies Slider
  var currentCaseStudy = 0
  var caseStudyCards = $(".case-study-card")
  var visibleCards = 4

  function updateCaseStudySlider() {
    if ($(window).width() < 768) {
      visibleCards = 1
    } else if ($(window).width() < 992) {
      visibleCards = 2
    } else if ($(window).width() < 1200) {
      visibleCards = 3
    } else {
      visibleCards = 4
    }
  }

  function showCaseStudies() {
    caseStudyCards.hide()
    for (var i = currentCaseStudy; i < currentCaseStudy + visibleCards && i < caseStudyCards.length; i++) {
      caseStudyCards.eq(i).show()
    }
  }

  function nextCaseStudy() {
    if (currentCaseStudy + visibleCards < caseStudyCards.length) {
      currentCaseStudy++
      showCaseStudies()
    }
  }

  function prevCaseStudy() {
    if (currentCaseStudy > 0) {
      currentCaseStudy--
      showCaseStudies()
    }
  }

  // Initialize case studies slider
  updateCaseStudySlider()
  showCaseStudies()

  // Case studies navigation
  $(".case-studies-section .slider-next").click(nextCaseStudy)
  $(".case-studies-section .slider-prev").click(prevCaseStudy)

  // Update slider on window resize
  $(window).resize(() => {
    updateCaseStudySlider()
    currentCaseStudy = 0
    showCaseStudies()
  })

  // Circular Progress Animation
  function animateCircularProgress() {
    $(".circular-chart .circle").each(function () {
      var $this = $(this)
      var percent = $this.attr("stroke-dasharray").split(",")[0]
      $this.css("stroke-dasharray", "0, 100")

      setTimeout(() => {
        $this.css("stroke-dasharray", percent + ", 100")
      }, 500)
    })
  }

  // Trigger circular progress animation when in viewport
  var circularProgressAnimated = false
  $(window).scroll(() => {
    if (!circularProgressAnimated && $(".stats-section").length) {
      var elementTop = $(".stats-section").offset().top
      var elementBottom = elementTop + $(".stats-section").outerHeight()
      var viewportTop = $(window).scrollTop()
      var viewportBottom = viewportTop + $(window).height()

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        animateCircularProgress()
        circularProgressAnimated = true
      }
    }
  })

  // Newsletter Form
  $(".newsletter-form").submit(function (e) {
    e.preventDefault()
    var email = $(this).find('input[type="email"]').val()

    if (email) {
      // Simulate form submission
      $(this).find(".btn").html('<i class="fas fa-check"></i>').prop("disabled", true)

      setTimeout(() => {
        $(".newsletter-form .btn").html('<i class="fas fa-paper-plane"></i>').prop("disabled", false)
        $('.newsletter-form input[type="email"]').val("")
      }, 2000)
    }
  })

  // Parallax Effect
  $(window).scroll(function () {
    var scrolled = $(this).scrollTop()
    var parallax = $(".hero-section")
    var speed = scrolled * 0.5

    parallax.css("background-position", "center " + speed + "px")
  })

  // Hover Effects
  $(".feature-card").hover(
    function () {
      $(this).addClass("animate__animated animate__pulse")
    },
    function () {
      $(this).removeClass("animate__animated animate__pulse")
    },
  )

  $(".case-study-card").hover(
    function () {
      $(this).find("img").addClass("animate__animated animate__zoomIn")
    },
    function () {
      $(this).find("img").removeClass("animate__animated animate__zoomIn")
    },
  )

  // Mobile Menu Close on Link Click
  $(".navbar-nav .nav-link").click(() => {
    if ($(window).width() < 992) {
      $(".navbar-collapse").collapse("hide")
    }
  })

  // Loading Animation
  $(window).on("load", () => {
    $(".hero-title").addClass("animate__animated animate__fadeInUp")
    $(".hero-text").addClass("animate__animated animate__fadeInUp animate__delay-1s")
    $(".btn-primary").addClass("animate__animated animate__fadeInUp animate__delay-2s")
    $(".hero-image").addClass("animate__animated animate__fadeInRight animate__delay-1s")
  })

  // Intersection Observer for Advanced Animations
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe elements
    document.querySelectorAll(".feature-card, .case-study-card, .stat-item").forEach((el) => {
      observer.observe(el)
    })
  }

  // Typing Effect for Hero Title
  function typeWriter(element, text, speed) {
    var i = 0
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

  // Initialize typing effect
  setTimeout(() => {
    var heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      var originalText = heroTitle.textContent
      typeWriter(heroTitle, originalText, 100)
    }
  }, 1000)

  // Preloader
  if ($(".preloader").length) {
    $(window).on("load", () => {
      $(".preloader").fadeOut(500)
    })
  }

  // Form Validation
  $("form").submit(function (e) {
    var isValid = true

    $(this)
      .find("input[required], textarea[required]")
      .each(function () {
        if (!$(this).val()) {
          $(this).addClass("is-invalid")
          isValid = false
        } else {
          $(this).removeClass("is-invalid")
        }
      })

    if (!isValid) {
      e.preventDefault()
    }
  })

  // Dynamic Year in Footer
  $(".current-year").text(new Date().getFullYear())

  // Lazy Loading for Images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
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
})

// Additional utility functions
function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var args = arguments
    var later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

// Optimized scroll handler
var optimizedScroll = debounce(() => {
  // Scroll-dependent functions here
}, 10)

window.addEventListener("scroll", optimizedScroll)
