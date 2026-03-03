import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

let cleanupFns = []
let trackedTweens = []
let rafIds = new Set()
let timeoutIds = new Set()

function addCleanup(fn) {
  cleanupFns.push(fn)
}

function on(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options)
  addCleanup(() => target.removeEventListener(eventName, handler, options))
}

function trackTween(tween) {
  if (!tween) return
  trackedTweens.push(tween)
  if (tween.scrollTrigger) {
    const st = tween.scrollTrigger
    addCleanup(() => st.kill())
  }
  addCleanup(() => tween.kill())
}

function setRaf(id) {
  rafIds.add(id)
  addCleanup(() => {
    cancelAnimationFrame(id)
    rafIds.delete(id)
  })
}

function setTimeoutTracked(fn, ms) {
  const id = setTimeout(fn, ms)
  timeoutIds.add(id)
  addCleanup(() => {
    clearTimeout(id)
    timeoutIds.delete(id)
  })
  return id
}

/* ─────────────────────────────────────────────────────────────
   Custom cursor
───────────────────────────────────────────────────────────── */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return

  const dot = $('#cursor')
  const ring = $('#cursorFollower')
  if (!dot || !ring) return

  let mx = 0
  let my = 0
  let rx = 0
  let ry = 0

  const onMove = e => {
    mx = e.clientX
    my = e.clientY
    gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' })
  }
  on(document, 'mousemove', onMove)

  const tick = () => {
    rx += (mx - rx) * 0.1
    ry += (my - ry) * 0.1
    gsap.set(ring, { x: rx, y: ry })
    setRaf(requestAnimationFrame(tick))
  }
  tick()

  on(document, 'mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
  })
  on(document, 'mouseenter', () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
  })
}

/* ─────────────────────────────────────────────────────────────
   Hero entrance
───────────────────────────────────────────────────────────── */
function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } })
  trackTween(tl)

  tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0)

  tl.to(
    '.hero__title-row',
    {
      clipPath: 'inset(0 0 0% 0)',
      stagger: 0.12,
      duration: 0.9,
    },
    0.15,
  )

  tl.to('.hero__sub', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
  tl.to('.hero__actions', { opacity: 1, y: 0, duration: 0.8 }, 0.65)

  tl.fromTo(
    '.hero__visual',
    {
      opacity: 0,
      x: 40,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1.1,
    },
    0.3,
  )

  tl.fromTo(
    '.hero__card',
    {
      opacity: 0,
      y: 18,
      scale: 0.92,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.12,
      duration: 0.8,
    },
    0.7,
  )

  tl.to('.hero__scroll-hint', { opacity: 1, duration: 0.8 }, 1.2)
}

/* ─────────────────────────────────────────────────────────────
   Page loader
───────────────────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader')
  if (!loader) return

  setTimeoutTracked(() => {
    loader.classList.add('hidden')
    heroEntrance()
  }, 1500)
}

/* ─────────────────────────────────────────────────────────────
   ScrollTrigger – generic fade-up / clip-up
───────────────────────────────────────────────────────────── */
function initScrollAnimations() {
  $$('[data-animate="fade-up"]').forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 })
  })
  $$('[data-animate="fade-left"]').forEach(el => {
    gsap.set(el, { opacity: 0, x: -40 })
  })
  $$('[data-animate="fade-right"]').forEach(el => {
    gsap.set(el, { opacity: 0, x: 40 })
  })
  $$('[data-animate="clip-up"]').forEach(el => {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' })
  })

  const observe = (els, toVars) => {
    els.forEach(el => {
      const delay = parseFloat(el.dataset.delay || 0)
      const tween = gsap.to(el, {
        ...toVars,
        delay,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
      trackTween(tween)
    })
  }

  observe($$('[data-animate="fade-up"]'), { opacity: 1, y: 0 })
  observe($$('[data-animate="fade-left"]'), { opacity: 1, x: 0 })
  observe($$('[data-animate="fade-right"]'), { opacity: 1, x: 0 })
  observe($$('[data-animate="clip-up"]'), { clipPath: 'inset(0 0 0% 0)', opacity: 1 })

  $$('.work__grid').forEach(grid => {
    const projects = $$('.project', grid)
    const tween = gsap.fromTo(
      projects,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    )
    trackTween(tween)
  })

  $$('.process__step').forEach((step, i) => {
    const tween = gsap.fromTo(
      step,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
    trackTween(tween)
  })
}

/* ─────────────────────────────────────────────────────────────
   Parallax on hero floating cards
───────────────────────────────────────────────────────────── */
function initHeroParallax() {
  const cards = $$('.hero__card[data-parallax]')
  if (!cards.length) return

  on(document, 'mousemove', e => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2
    const cy = (e.clientY / window.innerHeight - 0.5) * 2

    cards.forEach(card => {
      const factor = parseFloat(card.dataset.parallax || 0.05) * 80
      gsap.to(card, {
        x: cx * factor,
        y: cy * factor,
        duration: 1.2,
        ease: 'expo.out',
      })
    })
  })
}

/* ─────────────────────────────────────────────────────────────
   Scroll parallax on project images
───────────────────────────────────────────────────────────── */
function initProjectParallax() {
  $$('.project__img').forEach(img => {
    const tween = gsap.fromTo(
      img,
      { scale: 1.12, yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.project'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      },
    )
    trackTween(tween)
  })
}

/* ─────────────────────────────────────────────────────────────
   Animated counters (About stats)
───────────────────────────────────────────────────────────── */
function initCounters() {
  $$('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10)
    const obj = { val: 0 }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter() {
        const tween = gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val)
          },
        })
        trackTween(tween)
      },
    })

    addCleanup(() => st.kill())
  })
}

/* ─────────────────────────────────────────────────────────────
   Nav – hide / show on scroll, glass on scroll
───────────────────────────────────────────────────────────── */
function initNav() {
  const nav = $('#nav')
  if (!nav) return

  let lastY = 0

  const st = ScrollTrigger.create({
    start: 'top -60',
    end: '99999',
    onUpdate(self) {
      const y = self.scroller.scrollTop !== undefined ? self.scroller.scrollTop : window.scrollY

      nav.classList.toggle('scrolled', y > 60)

      if (y > lastY + 4 && y > 180) {
        gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'expo.inOut' })
      } else if (y < lastY - 4) {
        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'expo.out' })
      }
      lastY = y
    },
  })
  addCleanup(() => st.kill())

  const hamburger = $('#hamburger')
  const mobileMenu = $('#mobileMenu')

  if (hamburger && mobileMenu) {
    on(hamburger, 'click', () => {
      const open = mobileMenu.classList.toggle('open')
      hamburger.classList.toggle('open', open)
    })

    $$('.nav__mobile-link').forEach(link => {
      on(link, 'click', () => {
        mobileMenu.classList.remove('open')
        hamburger.classList.remove('open')
      })
    })
  }
}

/* ─────────────────────────────────────────────────────────────
   Magnetic buttons
───────────────────────────────────────────────────────────── */
function initMagneticButtons() {
  $$('.magnetic').forEach(btn => {
    on(btn, 'mousemove', e => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.35
      const dy = (e.clientY - cy) * 0.35
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'expo.out' })
    })
    on(btn, 'mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  })
}

/* ─────────────────────────────────────────────────────────────
   Skill pills – stagger in
───────────────────────────────────────────────────────────── */
function initSkillPills() {
  const wrap = $('.about__skills')
  if (!wrap) return

  const pills = $$('.skill-pill', wrap)
  const tween = gsap.fromTo(
    pills,
    { opacity: 0, scale: 0.85, y: 12 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.055,
      duration: 0.5,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: wrap,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    },
  )
  trackTween(tween)
}

/* ─────────────────────────────────────────────────────────────
   Contact section – glow drift
───────────────────────────────────────────────────────────── */
function initContactGlow() {
  const glow = $('.contact__glow')
  if (!glow) return

  const tween = gsap.to(glow, {
    x: 'random(-80, 80)',
    y: 'random(-60, 60)',
    duration: 6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
  trackTween(tween)
}

/* ─────────────────────────────────────────────────────────────
   Smooth section reveal bars (contact title)
───────────────────────────────────────────────────────────── */
function initContactEntrance() {
  const tween = gsap.fromTo(
    '.contact__title',
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.contact__title',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    },
  )
  trackTween(tween)
}

/* ─────────────────────────────────────────────────────────────
   About image reveal
───────────────────────────────────────────────────────────── */
function initAboutReveal() {
  const tween = gsap.fromTo(
    '.about__image-wrap',
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.about__image-wrap',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    },
  )
  trackTween(tween)
}

/* ─────────────────────────────────────────────────────────────
   Marquee – pause on hover
───────────────────────────────────────────────────────────── */
function initMarquee() {
  const track = $('.marquee__track')
  if (!track) return

  on(track, 'mouseenter', () => {
    $$('.marquee__inner').forEach(el => {
      el.style.animationPlayState = 'paused'
    })
  })
  on(track, 'mouseleave', () => {
    $$('.marquee__inner').forEach(el => {
      el.style.animationPlayState = 'running'
    })
  })
}

/* ─────────────────────────────────────────────────────────────
   Horizontal scroll on process (mobile)
───────────────────────────────────────────────────────────── */
function initMobileProcess() {
  const steps = $('.process__steps')
  if (!steps || window.innerWidth > 860) return

  let startX
  let scrollLeft
  let isDown = false

  const onDown = e => {
    isDown = true
    startX = e.pageX - steps.offsetLeft
    scrollLeft = steps.scrollLeft
  }
  const onLeave = () => {
    isDown = false
  }
  const onUp = () => {
    isDown = false
  }
  const onMove = e => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - steps.offsetLeft
    steps.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  on(steps, 'mousedown', onDown)
  on(steps, 'mouseleave', onLeave)
  on(steps, 'mouseup', onUp)
  on(steps, 'mousemove', onMove)
}

/* ─────────────────────────────────────────────────────────────
   Experience timeline – dot & line stagger
───────────────────────────────────────────────────────────── */
function initExperienceTimeline() {
  const items = $$('.exp__item')
  if (!items.length) return

  items.forEach((item, i) => {
    const dot = item.querySelector('.exp__dot')
    const line = item.querySelector('.exp__line')

    if (!dot) return

    gsap.set(dot, { scale: 0, opacity: 0 })
    if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })

    const st = ScrollTrigger.create({
      trigger: item,
      start: 'top 82%',
      once: true,
      onEnter() {
        const tl = gsap.timeline({ delay: i * 0.04 })
        trackTween(tl)
        tl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' })
        if (line) tl.to(line, { scaleY: 1, duration: 0.5, ease: 'expo.out' }, '-=0.2')
      },
    })
    addCleanup(() => st.kill())
  })
}

export function bootPortfolioAnimations() {
  cleanupPortfolioAnimations()

  cleanupFns = []
  trackedTweens = []
  rafIds = new Set()
  timeoutIds = new Set()

  initCursor()
  initLoader()
  initNav()
  initScrollAnimations()
  initHeroParallax()
  initProjectParallax()
  initCounters()
  initMagneticButtons()
  initSkillPills()
  initContactGlow()
  initContactEntrance()
  initAboutReveal()
  initMarquee()
  initMobileProcess()
  initExperienceTimeline()
}

export function cleanupPortfolioAnimations() {
  cleanupFns.forEach(fn => {
    try {
      fn()
    } catch {
      // ignore cleanup errors
    }
  })

  cleanupFns = []

  trackedTweens.forEach(tween => {
    try {
      tween.kill()
    } catch {
      // ignore
    }
  })

  trackedTweens = []

  // As a final safety net (for any triggers created indirectly)
  try {
    ScrollTrigger.getAll().forEach(t => t.kill())
  } catch {
    // ignore
  }
}
