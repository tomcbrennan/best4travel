import Swiper from 'swiper/bundle'

export default function initSliders() {
	if (document.querySelector('.destinations-slider')) {
		document.querySelectorAll('.destinations-slider').forEach((slider) => {
			const destinationsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: true,
				slidesPerView: 1.5,
				spaceBetween: 20,
				centeredSlides: true,
				breakpoints: {
					500: {
						slidesPerView: 2.5,
					},
					768: {
						slidesPerView: 3.5,
					},
					1024: {
						slidesPerView: 4,
						slidesPerGroup: 2,
						speed: 750,
					},
					1600: {
						slidesPerView: 5,
					},
				},
			})
		})
	}
	if (document.querySelector('.testimonials-slider')) {
		document.querySelectorAll('.testimonials-slider').forEach((slider) => {
			const testimonialsSlider = new Swiper(slider, {
				effect: 'fade',
				fadeEffect: {
					crossFade: true,
				},
				autoplay: {
					delay: 6000,
				},
				loop: true,
				direction: 'horizontal',
				speed: 700,
				slidesPerView: 1,
				spaceBetween: 20,
				centeredSlides: true,
				autoHeight: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
				},
			})
		})
	}

	if (document.querySelector('.deals-slider')) {
		const dealsSlider = new Swiper('.deals-slider', {
			direction: 'horizontal',
			loop: false,
			speed: 500,
			slidesPerView: 1.1,
			spaceBetween: 20,
			breakpoints: {
				540: {
					slidesPerView: 1.75,
				},
				768: {
					slidesPerView: 2.5,
				},
				1024: {
					slidesPerView: 1.75,
				},
				1200: {
					slidesPerView: 2,
				},
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})

		// HIDE TEXT NEXT TO SLIDER ON DESKTOP ON SLIDE CHANGE
		if (window.innerWidth > 1024) {
			const dealsContent = document.querySelector('.deals-content')

			dealsSlider.on('slideChange', function () {
				if (dealsSlider.activeIndex === 0) {
					dealsContent.classList.remove('hide')
				} else {
					dealsContent.classList.add('hide')
				}
			})
		}
	}
}
