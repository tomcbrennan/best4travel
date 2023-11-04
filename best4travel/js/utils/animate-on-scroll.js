import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function animateOnScroll() {
	// GSAP HELPER FOR RESPONSIVENESS
	let mediaSize = gsap.matchMedia()

	/**
	 * ANIMATE HEADER ON SCROLL
	 */
	const header = document.querySelector('header')
	const destinationsMenu = document.querySelector('.destinations-menu')
	const chatbot = document.querySelector('#ht-ctc-chat')

	window.addEventListener('scroll', () => {
		const scrollPosition = window.scrollY
		const windowHeight = window.innerHeight
		const documentHeight = document.documentElement.scrollHeight

		if (scrollPosition > 75 && !destinationsMenu.classList.contains('active')) {
			header.classList.add('scrolling')
		} else {
			header.classList.remove('scrolling')
		}

		if (documentHeight - scrollPosition - windowHeight < 100) {
			// HIDE CHATBOT
			chatbot.style.pointerEvents = 'none'
			chatbot.style.transform = 'translateX(200px)'

			// SHOW SCROLL TO TOP
		} else {
			// SHOW CHATBOT
			chatbot.style.pointerEvents = 'auto'
			chatbot.style.transform = 'translateX(0)'

			// HIDE SCROLL TO TOP
		}
	})

	/**
	 * PARALLAX IMAGE
	 */
	mediaSize.add('(min-width: 1024px)', () => {
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
	})

	/**
	 * PARALLAX IMAGE - SMALL
	 */
	gsap.utils.toArray('.image-parallax-small').forEach((image) => {
		gsap.fromTo(
			image,
			{
				y: -75,
			},
			{
				scrollTrigger: {
					trigger: image,
					scrub: true,
				},
				y: 0,
				ease: 'none',
			}
		)
	})

	/**
	 * PARALLAX TEXT
	 */
	gsap.utils.toArray('.text-parallax').forEach((text) => {
		gsap.to(text, {
			scrollTrigger: {
				trigger: text,
				scrub: true,
			},
			y: -100,
			ease: 'none',
		})
	})

	/**
	 * OPTIONS
	 */
	const START = 'top bottom-=10%'
	const fadeProperties = {
		autoAlpha: 0,
		delay: 0.2,
		duration: 1,
	}

	const staggerProperties = {
		autoAlpha: 0,
		delay: 0.2,
		stagger: 0.2,
	}

	/**
	 * SINGLE ELEMENT SELECTORS
	 * Apply these data attributes DIRECTLY to desired elements :~)
	 */
	const elementsFadeDown = document.querySelectorAll('[data-fade-down]')
	const elementsFadeUp = document.querySelectorAll('[data-fade-up]')
	const elementsFadeUpDestination = document.querySelectorAll(
		'[data-fade-up-destination]'
	)
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
	const elementsRevealUp = document.querySelectorAll('[data-animate-reveal-up]')
	const elementsRevealDown = document.querySelectorAll(
		'[data-animate-reveal-down]'
	)
	const elementsRevealLeft = document.querySelectorAll(
		'[data-animate-reveal-left]'
	)
	const elementsRevealRight = document.querySelectorAll(
		'[data-animate-reveal-right]'
	)
	const elementsRevealCenter = document.querySelectorAll(
		'[data-animate-reveal-center]'
	)
	const elementsBannerRevealDown = document.querySelectorAll(
		'[data-animate-banner-reveal-down]'
	)
	const lineArrows = document.querySelectorAll('[data-animate-line-arrow]')
	const curtains = document.querySelectorAll('[data-curtain]')

	/**
	 * SINGLE FINS (Single Fade Ins)
	 */

	// LINE ARROWS --------------------------
	lineArrows.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			autoAlpha: 0,
			delay: 0.2,
			duration: 1.2,
			stagger: 0.4,
			x: -100,
		}

		gsap.from(element, settings)
	})

	// CURTAINS --------------------------
	curtains.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 1.1,
			height: '100%',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})

	// BANNER LINE REVEAL DOWN -------------------------------
	elementsBannerRevealDown.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 1.25,
			duration: 6,
			height: 0,
			transformOrigin: 'top',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// REVEAL CENTER -------------------------------
	elementsRevealCenter.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 3,
			width: 0,
			transformOrigin: 'center',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// REVEAL DOWN -------------------------------
	elementsRevealDown.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 1,
			height: 0,
			transformOrigin: 'top',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// REVEAL UP -------------------------------
	elementsRevealUp.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 1,
			height: 0,
			transformOrigin: 'bottom',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// REVEAL LEFT -------------------------------
	elementsRevealLeft.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 8,
			width: 0,
			transformOrigin: 'left',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// REVEAL RIGHT -------------------------------
	elementsRevealRight.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			delay: 0.2,
			duration: 8,
			width: 0,
			transformOrigin: 'right',
			ease: 'power2.out',
		}

		gsap.from(element, settings)
	})
	// FADE -------------------------------
	elementsFade.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: START,
			},
			autoAlpha: 0,
			delay: 0.2,
			duration: 2,
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
			autoAlpha: 0,
			delay: 0.2,
			duration: 0.6,
			y: 16,
		}

		gsap.from(element, settings)
	})

	// FADE UP Destination ----------------------------
	elementsFadeUpDestination.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=5%',
			},
			autoAlpha: 0,
			delay: 0.2,
			duration: 0.4,
			y: 16,
		}
		mediaSize.add('(min-width: 1024px)', () => {
			gsap.from(element, settings)
		})
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

	if (document.querySelector('[data-image-reveal-left]')) {
		const imageRevealLeft = gsap.utils.toArray('[data-image-reveal-left]')
		imageRevealLeft.forEach((imageReveal) => {
			let image = imageReveal.querySelector('img')
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: image,
					start: 'top bottom-=20%',
				},
			})
			tl.set(imageReveal, {
				autoAlpha: 1,
			})
			tl.fromTo(
				imageReveal,
				{
					xPercent: -100,
				},
				{
					xPercent: 0,
					duration: 2,
					ease: 'power3.easeInOut',
				}
			)
			tl.fromTo(
				image,
				{
					xPercent: 100,
				},
				{
					xPercent: 0,
					delay: -2,
					duration: 2,
					ease: 'power3.easeInOut',
				}
			)
		})
	}

	const zoomElement = document.querySelectorAll('.zoom-element')

	mediaSize.add('(min-width: 768px)', () => {
		// ZOOM AS YOU SCROLL SCROLL
		zoomElement.forEach((element) => {
			const tl = gsap.timeline()

			tl.fromTo(
				element,
				{ scale: '0.9', opacity: 0 },
				{ scale: '1', opacity: 1 }
			)

			ScrollTrigger.create({
				trigger: element,
				start: 'top bottom',
				end: 'bottom bottom',
				animation: tl,
				scrub: 1,
			})
		})
	})
}
