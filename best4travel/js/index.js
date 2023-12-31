import gsap from 'gsap'
import initLenis from './utils/lenis'
import animateOnScroll from './utils/animate-on-scroll'
import initAccordions from './components/accordions'
import initSliders from './components/sliders'

document.addEventListener('DOMContentLoaded', () => {
	initLenis()
	toggleMenu()
	toggleMobileSubMenu()
	animateOnScroll()
	initSliders()

	// TOGGLE DESTINATIONS MENU ON MENU ITEM CLICK
	document
		.querySelector('.destinations-toggle > a')
		.addEventListener('click', () => {
			toggleDestinations()
		})

	if (document.querySelector('.about-destination-content')) {
		toggleDestinationContent()
	}

	if (document.querySelector('.toggle-deal-modal')) {
		toggleDealModal()
	}

	if (document.querySelector('.accordion')) {
		initAccordions()
	}

	// REMOVE DEFAULT ACTION AND LINK FROM PARENT NAVIGATION ITEMS

	if (document.querySelector('.no-link')) {
		const noLink = document.querySelectorAll('.no-link > a')

		noLink.forEach((link) => {
			link.removeAttribute('href')

			link.addEventListener('click', (e) => {
				e.preventDefault()
			})
		})
	}
})

/**
 * Toggle the state of the mobile menu
 *
 * @returns void
 */
const toggleMenu = () => {
	const menuButtons = document.querySelectorAll('[data-toggle-menu]')
	const mainElement = document.querySelector('main')
	const staggerContainers = document.querySelectorAll(
		'[data-animate-stagger-menu]'
	)
	const header = document.querySelector('header')

	menuButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			document.body.classList.toggle('menuIsOpen')
			document.documentElement.classList.toggle('overflow-hidden')
			document.querySelector('.hamburger').classList.toggle('is-active')

			if (document.body.classList.contains('menuIsOpen')) {
				lenis.stop()
				header.classList.add('scrolling')
				staggerContainers.forEach((stagger) => {
					const elementsStagger = gsap.utils.toArray(stagger.children)

					gsap.from(elementsStagger, {
						y: -20,
						opacity: 0,
						delay: 0.4,
						stagger: 0.1,
					})
				})
			} else {
				lenis.start()

				const scrollPosition = window.scrollY

				if (scrollPosition > 75) {
					header.classList.add('scrolling')
				} else {
					header.classList.remove('scrolling')
				}
			}
		})
	})

	const closeMenu = () => {
		document.body.classList.remove('menuIsOpen')
		document.documentElement.classList.remove('overflow-hidden')
	}

	mainElement.addEventListener('click', () => {
		if (document.body.classList.contains('menuIsOpen')) {
			closeMenu()
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && document.body.classList.contains('menuIsOpen')) {
			closeMenu()
		}
	})
}

const toggleDealModal = () => {
	const dealModal = document.querySelector('.deal-modal')
	const toggleModalButton = document.querySelectorAll('.toggle-deal-modal')

	toggleModalButton.forEach((toggle) => {
		toggle.addEventListener('click', (e) => {
			toggleDeal(e)
		})
	})

	const toggleDeal = (e) => {
		dealModal.classList.toggle('active')

		const selectedDeal = e.target.getAttribute('data-deal-button')
		const allDealsContent = document.querySelectorAll('.deal-content')

		allDealsContent.forEach((dealContent) => {
			if (dealContent.getAttribute('data-deal-content') === selectedDeal) {
				dealContent.classList.toggle('!hidden')
			} else {
				dealContent.classList.add('!hidden')
			}
		})

		if (dealModal.classList.contains('active')) {
			lenis.stop()
		} else {
			lenis.start()
		}

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && dealModal.classList.contains('active')) {
				dealModal.classList.toggle('active')
				lenis.start()
				allDealsContent.forEach((dealContent) => {
					dealContent.classList.add('!hidden')
				})
			}
		})
	}
}

const toggleDestinations = () => {
	const destinationsLink = document.querySelector('.destinations-toggle')
	const destinationsMenu = document.querySelector('.destinations-menu')
	const header = document.querySelector('header')

	const scrollPosition = window.scrollY

	destinationsLink.classList.toggle('active')
	destinationsMenu.classList.toggle('active')

	if (destinationsMenu.classList.contains('active')) {
		header.classList.remove('scrolling')
		lenis.stop()
	} else if (
		!destinationsMenu.classList.contains('active') &&
		scrollPosition > 75
	) {
		header.classList.add('scrolling')
		lenis.start()
	} else {
		lenis.start()
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && destinationsMenu.classList.contains('active')) {
			destinationsLink.classList.toggle('active')
			destinationsMenu.classList.toggle('active')
			lenis.start()

			const scrollPosition = window.scrollY

			if (scrollPosition > 75) {
				header.classList.add('scrolling')
			} else {
				header.classList.remove('scrolling')
			}
		}
	})
}

/**
 * Toggles the mobile sub menu
 *
 * @returns void
 */
const toggleMobileSubMenu = () => {
	const toggles = document.querySelectorAll('[data-toggle-mobile-sub-menu]')

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const parentEl = toggle.closest('[data-mobile-menu-item]')
			const subMenu = parentEl.querySelector('[data-mobile-sub-menu]')

			// Doesn't exist, bail early
			if (!subMenu) {
				return
			}

			subMenu.classList.toggle('hidden')
		})
	})
}

const toggleDestinationContent = () => {
	const destinationContent = document.querySelector(
		'.about-destination-content'
	)
	const paragraphs = destinationContent.querySelectorAll('p')
	const maxParagraphs = 2

	if (paragraphs.length > maxParagraphs) {
		// CREATE READ MORE BUTTON + APPEND
		const readMoreBtn = document.createElement('button')
		readMoreBtn.classList.add('button')
		readMoreBtn.classList.add('border')
		readMoreBtn.classList.add('round')
		readMoreBtn.innerHTML = 'Show more'
		destinationContent.appendChild(readMoreBtn)

		let isExpanded = false

		const toggleContent = () => {
			paragraphs.forEach((paragraph, index) => {
				if (index >= maxParagraphs) {
					paragraph.classList.toggle('hidden')
				}
			})
		}

		toggleContent()

		readMoreBtn.addEventListener('click', () => {
			isExpanded = !isExpanded
			destinationContent.classList.toggle('content-expanded')
			toggleContent()

			if (isExpanded) {
				readMoreBtn.innerHTML = 'Show less'
			} else {
				readMoreBtn.innerHTML = 'Show more'
			}
		})
	}
}
