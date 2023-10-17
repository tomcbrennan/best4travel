import SplitType from 'split-type'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function initSplitText() {
	document.querySelectorAll('.split-lines').forEach((elem) => {
		const splitTextLines = new SplitType(elem, { types: 'lines, words' })
		const lines = splitTextLines.lines

		lines.forEach((line) => {
			gsap.fromTo(
				lines,
				{
					y: 25,
					autoAlpha: 0,
					skewY: '2deg',
				},
				{
					y: 0,
					skewY: '0deg',
					delay: 0.4,
					autoAlpha: 1,
					stagger: 0.15,
					duration: 1.5,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: elem,
						start: 'top bottom-=5%',
					},
				}
			)
		})
	})
}
