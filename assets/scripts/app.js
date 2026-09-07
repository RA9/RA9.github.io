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
     Table of contents — open on desktop, collapsible on mobile,
     with the current section highlighted while scrolling
     ------------------------------------------ */
	function initToc() {
		var toc = document.getElementById("toc");
		if (!toc) return;

		var links = toc.querySelectorAll('a[href^="#"]');
		var desktop = window.matchMedia("(min-width: 900px)");

		// Always expanded on desktop; user-controlled on small screens.
		function syncOpen() {
			if (desktop.matches) toc.open = true;
		}
		syncOpen();
		if (desktop.addEventListener) {
			desktop.addEventListener("change", syncOpen);
		}

		// Collapse after jumping, so the section lands in view on mobile.
		links.forEach(function (link) {
			link.addEventListener("click", function () {
				if (!desktop.matches) toc.open = false;
			});
		});

		var sections = document.querySelectorAll(".prose section[id]");
		if (!sections.length) return;

		function setActive(id) {
			links.forEach(function (link) {
				link.classList.toggle(
					"is-active",
					id !== null && link.getAttribute("href") === "#" + id,
				);
			});
		}

		// Derived from scroll position rather than intersection state, so a
		// reflow (web fonts loading) can't leave a stale section highlighted.
		var ticking = false;

		function updateActive() {
			ticking = false;

			var readingLine = window.innerHeight * 0.25;
			var doc = document.documentElement;
			var atBottom =
				window.innerHeight + window.scrollY >= doc.scrollHeight - 4;

			if (atBottom) {
				setActive(sections[sections.length - 1].id);
				return;
			}

			var current = null;
			for (var i = 0; i < sections.length; i++) {
				if (sections[i].getBoundingClientRect().top <= readingLine) {
					current = sections[i].id;
				}
			}

			setActive(current);
		}

		var settleTimer = null;

		function requestUpdate() {
			if (!ticking) {
				ticking = true;
				window.requestAnimationFrame(updateActive);
			}
			// Trailing update, so the end of a smooth scroll is always measured.
			clearTimeout(settleTimer);
			settleTimer = setTimeout(updateActive, 150);
		}

		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		window.addEventListener("hashchange", requestUpdate);
		// Re-run once fonts have settled and the layout is final.
		window.addEventListener("load", requestUpdate);
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(requestUpdate);
		}
		updateActive();
	}

	/* ------------------------------------------
     Boot
     ------------------------------------------ */
	document.addEventListener("DOMContentLoaded", function () {
		initReveal();
		initToc();
		TypeWriter.init("#typed-output");
	});
})();
