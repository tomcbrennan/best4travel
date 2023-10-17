import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateOnScroll() {
	/**
	 * ANIMATE HEADER ON SCROLL
	 */
	const header = document.querySelector('header')
	const destinationsMenu = document.querySelector('.destinations-menu')

	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY
		if (scrollPosition > 25 && !destinationsMenu.classList.contains('active')) {
			header.classList.add('scrolling')
		} else {
			header.classList.remove('scrolling')
		}
	})

	/**
	 * PARALLAX IMAGE
	 */
	gsap.utils.toArray('.image-parallax').forEach((image) => {
		gsap.fromTo(
			image,
			{
				y: -200,
			},
			{
				scrollTrigger: {
					trigger: image,
					scrub: true,
				},
				y: 100,
				ease: 'none',
			}
		)
	})

	/**
	 * SINGLE ELEMENT SELECTORS
	 * Apply these data attributes DIRECTLY to desired elements :~)
	 */
	const elementsFadeDown = document.querySelectorAll('[data-fade-down]')
	const elementsFadeUp = document.querySelectorAll('[data-fade-up]')
	const elementsFadeLeft = document.querySelectorAll('[data-fade-left]')
	const elementsFadeRight = document.querySelectorAll('[data-fade-right]')
	const elementsFade = document.querySelectorAll('[data-fade]')

	/**
	 * MULTIPLE ELEMENT SELECTORS
	 * Apply these data attributes to CONTAINER of desired elements :~)
	 */
	const elementsStaggerFade = document.querySelectorAll(
		'[data-animate-stagger-fade]'
	)
	const elementsStaggerRight = document.querySelectorAll(
		'[data-animate-stagger-right]'
	)
	const elementsStaggerLeft = document.querySelectorAll(
		'[data-animate-stagger-left]'
	)
	const elementsStaggerUp = document.querySelectorAll(
		'[data-animate-stagger-up]'
	)
	const elementsStaggerDown = document.querySelectorAll(
		'[data-animate-stagger-down]'
	)

	const START = 'top bottom-=10%'
	const fadeProperties = {
		autoAlpha: 0,
		delay: 0.2,
		duration: 0.6,
	}

	const staggerProperties = {
		autoAlpha: 0,
		delay: 0.2,
		stagger: 0.2,
	}

	/**
	 * SINGLE FINS (Single Fade Ins)
	 */

	// FADE -------------------------------
	elementsFade.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			...fadeProperties,
		}

		gsap.from(element, settings)
	})

	// FADE DOWN --------------------------
	elementsFadeDown.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			...fadeProperties,
			y: -16,
		}

		gsap.from(element, settings)
	})

	// FADE UP ----------------------------
	elementsFadeUp.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			...fadeProperties,
			y: 16,
		}

		gsap.from(element, settings)
	})

	// FADE LEFT --------------------------
	elementsFadeLeft.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			...fadeProperties,
			x: 40,
		}

		gsap.from(element, settings)
	})

	// FADE RIGHT -------------------------
	elementsFadeRight.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			...fadeProperties,
			x: -40,
		}

		gsap.from(element, settings)
	})

	/**
	 * STAG DOS (Do Staggers)
	 */
	elementsStaggerFade.forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: START,
			},
			...staggerProperties,
		})
	})

	elementsStaggerLeft.forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: START,
			},
			...staggerProperties,
			x: 20,
		})
	})

	elementsStaggerRight.forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: START,
			},
			...staggerProperties,
			x: -20,
		})
	})
	elementsStaggerUp.forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: START,
			},
			...staggerProperties,
			y: 20,
		})
	})
	elementsStaggerDown.forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: START,
			},
			...staggerProperties,
			y: -20,
		})
	})
}
