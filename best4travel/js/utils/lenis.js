import Lenis from '@studio-freight/lenis'

export default function initLenis() {
	const lenis = new Lenis({
		lerp: 0.175,
	})

	window.lenis = lenis

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)
}
