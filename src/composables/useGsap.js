import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Generic [data-animate] scroll triggers inside a container */
export function setupScrollAnimations(container) {
  if (!container) return
  const $$ = (sel) => [...container.querySelectorAll(sel)]

  $$('[data-animate="fade-up"]').forEach((el) => {
    gsap.set(el, { opacity: 0, y: 40 })
    gsap.to(el, {
      opacity: 1, y: 0,
      delay: parseFloat(el.dataset.delay || 0),
      duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })

  $$('[data-animate="fade-right"]').forEach((el) => {
    gsap.set(el, { opacity: 0, x: 40 })
    gsap.to(el, {
      opacity: 1, x: 0,
      delay: parseFloat(el.dataset.delay || 0),
      duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })

  $$('[data-animate="clip-up"]').forEach((el) => {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)', opacity: 0 })
    gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)', opacity: 1,
      delay: parseFloat(el.dataset.delay || 0),
      duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
}

/* Magnetic hover for .magnetic buttons inside a container */
export function setupMagnetic(container) {
  if (!container) return
  const cleanups = []
  ;[...container.querySelectorAll('.magnetic')].forEach((btn) => {
    const onMove = (e) => {
      const r = btn.getBoundingClientRect()
      gsap.to(btn, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.35,
        y: (e.clientY - (r.top  + r.height / 2)) * 0.35,
        duration: 0.4, ease: 'expo.out',
      })
    }
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' })
    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)
    cleanups.push(() => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    })
  })
  return () => cleanups.forEach((fn) => fn())
}

/* Staggered project cards */
export function setupProjectCards(grid) {
  if (!grid) return
  gsap.fromTo([...grid.querySelectorAll('.project')],
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true } })
}

/* Scroll-parallax on project images */
export function setupProjectParallax(grid) {
  if (!grid) return
  ;[...grid.querySelectorAll('.project__img')].forEach((img) => {
    gsap.fromTo(img, { scale: 1.12, yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    })
  })
}

/* Animated number counters */
export function setupCounters(container) {
  if (!container) return
  ;[...container.querySelectorAll('[data-count]')].forEach((el) => {
    const target = parseInt(el.dataset.count, 10)
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter() {
        gsap.to(obj, { val: target, duration: 1.5, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.val) } })
      },
    })
  })
}

/* Skill pills stagger */
export function setupSkillPills(container) {
  if (!container) return
  gsap.fromTo([...container.querySelectorAll('.skill-pill')],
    { opacity: 0, scale: 0.85, y: 12 },
    { opacity: 1, scale: 1, y: 0, stagger: 0.055, duration: 0.5, ease: 'back.out(2)',
      scrollTrigger: { trigger: container, start: 'top 85%', once: true } })
}

/* About image clip reveal */
export function setupAboutReveal(wrap) {
  if (!wrap) return
  gsap.fromTo(wrap,
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: wrap, start: 'top 82%', once: true } })
}

/* Experience timeline dot + line animation */
export function setupExperienceTimeline(container) {
  if (!container) return
  ;[...container.querySelectorAll('.exp__item')].forEach((item, i) => {
    const dot  = item.querySelector('.exp__dot')
    const line = item.querySelector('.exp__line')
    if (dot)  gsap.set(dot,  { scale: 0, opacity: 0 })
    if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
    ScrollTrigger.create({
      trigger: item, start: 'top 82%', once: true,
      onEnter() {
        const tl = gsap.timeline({ delay: i * 0.04 })
        if (dot)  tl.to(dot,  { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' })
        if (line) tl.to(line, { scaleY: 1, duration: 0.5, ease: 'expo.out' }, '-=0.2')
      },
    })
  })
}

/* Process steps */
export function setupProcessSteps(container) {
  if (!container) return
  ;[...container.querySelectorAll('.process__step')].forEach((step, i) => {
    gsap.fromTo(step, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'expo.out',
      scrollTrigger: { trigger: step, start: 'top 85%', once: true },
    })
  })
}

/* Contact glow drift */
export function setupContactGlow(el) {
  if (!el) return
  gsap.to(el, { x: 'random(-80,80)', y: 'random(-60,60)', duration: 6,
    ease: 'sine.inOut', repeat: -1, yoyo: true })
}
