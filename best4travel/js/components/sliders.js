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
