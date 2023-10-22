import Swiper from 'swiper/bundle'

export default function initSliders() {
	if (document.querySelector('.destinations-slider')) {
		document.querySelectorAll('.destinations-slider').forEach((slider) => {
			const destinationsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: true,
				autoplay: {
					delay: 1,
					pauseOnMouseEnter: true,
				},
				mousewheelControl: true,
				speed: 3000,
				slidesPerView: 2,
				spaceBetween: 20,
				touchRatio: 0.75,
				centeredSlides: true,
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
				loop: true,
				direction: 'horizontal',
				speed: 1000,
				slidesPerView: 1,
				spaceBetween: 20,
				centeredSlides: true,
				autoHeight: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		})
	}
}
