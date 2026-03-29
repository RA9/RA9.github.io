/* ============================================
   Carlos S. Nah, Jr — Portfolio Scripts
   Complete Redesign · 2025
   ============================================ */

(function () {
	"use strict";

	/* ------------------------------------------
     Navigation — scroll glassmorphism effect
     ------------------------------------------ */
	function initNav() {
		const nav = document.getElementById("nav");
		if (!nav) return;

		const SCROLL_THRESHOLD = 40;

		function onScroll() {
			if (window.scrollY > SCROLL_THRESHOLD) {
				nav.classList.add("scrolled");
			} else {
				nav.classList.remove("scrolled");
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll(); // initial check
	}

	/* ------------------------------------------
     Mobile hamburger menu
     ------------------------------------------ */
	function initMobileMenu() {
		const toggle = document.getElementById("nav-toggle");
		const links = document.getElementById("nav-links");
		if (!toggle || !links) return;

		toggle.addEventListener("click", function () {
			toggle.classList.toggle("open");
			links.classList.toggle("open");
		});

		// Close menu when a link is clicked
		links.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				toggle.classList.remove("open");
				links.classList.remove("open");
			});
		});

		// Close on outside click
		document.addEventListener("click", function (e) {
			if (!toggle.contains(e.target) && !links.contains(e.target)) {
				toggle.classList.remove("open");
				links.classList.remove("open");
			}
		});
	}

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
     Skill Pills — stagger entrance animation
     ------------------------------------------ */
	function initPills() {
		var container = document.getElementById("skill-pills");
		if (!container) return;

		var pills = container.querySelectorAll(".pill");

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						pills.forEach(function (pill, i) {
							setTimeout(function () {
								pill.classList.add("visible");
							}, i * 70);
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 },
		);

		observer.observe(container);
	}

	/* ------------------------------------------
     Stat Counter Animation
     Counts from 0 to data-count on scroll
     ------------------------------------------ */
	function initCounters() {
		var statNumbers = document.querySelectorAll(".stat__number[data-count]");
		if (!statNumbers.length) return;

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						animateCounter(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 },
		);

		statNumbers.forEach(function (el) {
			observer.observe(el);
		});
	}

	function animateCounter(el) {
		var target = parseInt(el.getAttribute("data-count"), 10);
		if (isNaN(target)) return;

		var duration = 1200; // ms
		var startTime = null;
		var startVal = 0;

		function ease(t) {
			// ease-out cubic
			return 1 - Math.pow(1 - t, 3);
		}

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			var elapsed = timestamp - startTime;
			var progress = Math.min(elapsed / duration, 1);
			var current = Math.round(startVal + (target - startVal) * ease(progress));

			el.textContent = current;

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				el.textContent = target;
			}
		}

		requestAnimationFrame(step);
	}

	/* ------------------------------------------
     Active nav link highlighting on scroll
     ------------------------------------------ */
	function initActiveNav() {
		var sections = document.querySelectorAll("section[id]");
		var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
		if (!sections.length || !navLinks.length) return;

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var id = entry.target.getAttribute("id");
						navLinks.forEach(function (link) {
							if (link.getAttribute("href") === "#" + id) {
								link.style.color = "#e2e8f0";
							} else if (!link.classList.contains("btn")) {
								link.style.color = "";
							}
						});
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "-80px 0px -40% 0px",
			},
		);

		sections.forEach(function (section) {
			observer.observe(section);
		});
	}

	/* ------------------------------------------
     Smooth anchor scrolling (fallback + offset)
     ------------------------------------------ */
	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
			anchor.addEventListener("click", function (e) {
				var href = this.getAttribute("href");
				if (href === "#") return;

				var target = document.querySelector(href);
				if (!target) return;

				e.preventDefault();

				var navHeight = 80;
				var top =
					target.getBoundingClientRect().top + window.pageYOffset - navHeight;

				window.scrollTo({
					top: top,
					behavior: "smooth",
				});
			});
		});
	}

	/* ------------------------------------------
     Boot — kick everything off on DOM ready
     ------------------------------------------ */
	document.addEventListener("DOMContentLoaded", function () {
		initNav();
		initMobileMenu();
		initSmoothScroll();
		initReveal();
		initPills();
		initCounters();
		initActiveNav();
		TypeWriter.init("#typed-output");
	});
})();
