/* ============================================
   Carlos S. Nah, Jr — Portfolio & Blog Scripts
   Minimal redesign
   ============================================ */

(function () {
	"use strict";

	/* ------------------------------------------
     Typing Animation (terminal style)
     ------------------------------------------ */
	const TypeWriter = {
		el: null,
		strings: [
			"Building full-stack web applications...",
			"Teaching the next generation of developers...",
			"Writing clean, maintainable code...",
			"Crafting APIs and microservices...",
			"Open-source contributor & mentor...",
			"From Monrovia, Liberia to the world.",
		],
		currentString: 0,
		currentChar: 0,
		isDeleting: false,
		typeSpeed: 50,
		deleteSpeed: 28,
		pauseAfterType: 2200,
		pauseAfterDelete: 350,
		_timeout: null,

		init: function (selector) {
			this.el = document.querySelector(selector);
			if (!this.el) return;

			// Respect users who prefer less motion — show a single line.
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				this.el.textContent = this.strings[this.strings.length - 1];
				return;
			}

			this.tick();
		},

		tick: function () {
			var self = this;
			var full = this.strings[this.currentString];

			if (this.isDeleting) {
				this.currentChar--;
			} else {
				this.currentChar++;
			}

			this.el.textContent = full.substring(0, this.currentChar);

			var delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

			// Add slight randomness to feel more human
			delay += Math.random() * 30 - 15;

			// Finished typing the full string
			if (!this.isDeleting && this.currentChar === full.length) {
				delay = this.pauseAfterType;
				this.isDeleting = true;
			}

			// Finished deleting
			if (this.isDeleting && this.currentChar === 0) {
				this.isDeleting = false;
				this.currentString = (this.currentString + 1) % this.strings.length;
				delay = this.pauseAfterDelete;
			}

			this._timeout = setTimeout(function () {
				self.tick();
			}, delay);
		},
	};

	/* ------------------------------------------
     Scroll Reveal (Intersection Observer)
     ------------------------------------------ */
	function initReveal() {
		var reveals = document.querySelectorAll(".reveal");
		if (!reveals.length) return;

		if (!("IntersectionObserver" in window)) {
			reveals.forEach(function (el) {
				el.classList.add("visible");
			});
			return;
		}

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -60px 0px",
			},
		);

		reveals.forEach(function (el) {
			observer.observe(el);
		});
	}

	/* ------------------------------------------
     Boot
     ------------------------------------------ */
	document.addEventListener("DOMContentLoaded", function () {
		initReveal();
		TypeWriter.init("#typed-output");
	});
})();
