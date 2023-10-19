import Swiper from 'swiper/bundle'

export default function initSliders() {
	if (document.querySelector('.destinations-slider')) {
		document.querySelectorAll('.destinations-slider').forEach((slider) => {
			const destinationsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: true,
				speed: 750,
				slidesPerView: 2,
				spaceBetween: 20,
				centeredSlides: true,
				touchRatio: 0.3,
				breakpoints: {
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
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
					delay: 7000,
				},
				loop: true,
				direction: 'horizontal',
				speed: 1000,
				slidesPerView: 1,
				spaceBetween: 20,
				centeredSlides: true,
			})
		})
	}
}
