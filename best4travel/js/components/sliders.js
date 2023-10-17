import Swiper from 'swiper/bundle'

export default function initSliders() {
	if (document.querySelector('.destinations-slider')) {
		document.querySelectorAll('.destinations-slider').forEach((slider) => {
			const destinationsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: true,
				speed: 500,
				slidesPerView: 2,
				spaceBetween: 20,
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
}
