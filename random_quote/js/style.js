/* ============================================
   Random Quote Machine — Scripts
   Vanilla JS · No dependencies
   ============================================ */

(function () {
	"use strict";

	/* ------------------------------------------
     Built-in quotes (fallback + instant load)
     ------------------------------------------ */
	var quotes = [
		{
			text: "The only way to do great work is to love what you do.",
			author: "Steve Jobs",
		},
		{
			text: "Innovation distinguishes between a leader and a follower.",
			author: "Steve Jobs",
		},
		{ text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
		{
			text: "Life is what happens when you're busy making other plans.",
			author: "John Lennon",
		},
		{
			text: "The future belongs to those who believe in the beauty of their dreams.",
			author: "Eleanor Roosevelt",
		},
		{
			text: "It is during our darkest moments that we must focus to see the light.",
			author: "Aristotle",
		},
		{
			text: "The only impossible journey is the one you never begin.",
			author: "Tony Robbins",
		},
		{
			text: "In the middle of every difficulty lies opportunity.",
			author: "Albert Einstein",
		},
		{
			text: "Believe you can and you're halfway there.",
			author: "Theodore Roosevelt",
		},
		{
			text: "The best time to plant a tree was 20 years ago. The second best time is now.",
			author: "Chinese Proverb",
		},
		{
			text: "Your time is limited, don't waste it living someone else's life.",
			author: "Steve Jobs",
		},
		{
			text: "If you look at what you have in life, you'll always have more.",
			author: "Oprah Winfrey",
		},
		{
			text: "The mind is everything. What you think you become.",
			author: "Buddha",
		},
		{ text: "An unexamined life is not worth living.", author: "Socrates" },
		{
			text: "Strive not to be a success, but rather to be of value.",
			author: "Albert Einstein",
		},
		{
			text: "I have not failed. I've just found 10,000 ways that won't work.",
			author: "Thomas Edison",
		},
		{ text: "The best revenge is massive success.", author: "Frank Sinatra" },
		{
			text: "What we achieve inwardly will change outer reality.",
			author: "Plutarch",
		},
		{
			text: "The only limit to our realization of tomorrow is our doubts of today.",
			author: "Franklin D. Roosevelt",
		},
		{
			text: "It does not matter how slowly you go as long as you do not stop.",
			author: "Confucius",
		},
		{
			text: "Everything you've ever wanted is on the other side of fear.",
			author: "George Addair",
		},
		{ text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
		{
			text: "Don't watch the clock; do what it does. Keep going.",
			author: "Sam Levenson",
		},
		{
			text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
			author: "Winston Churchill",
		},
		{
			text: "You miss 100% of the shots you don't take.",
			author: "Wayne Gretzky",
		},
		{
			text: "Whether you think you can or you think you can't, you're right.",
			author: "Henry Ford",
		},
		{
			text: "The only person you are destined to become is the person you decide to be.",
			author: "Ralph Waldo Emerson",
		},
		{
			text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
			author: "Henry David Thoreau",
		},
		{
			text: "When you reach the end of your rope, tie a knot in it and hang on.",
			author: "Franklin D. Roosevelt",
		},
		{
			text: "There is nothing impossible to they who will try.",
			author: "Alexander the Great",
		},
		{
			text: "Act as if what you do makes a difference. It does.",
			author: "William James",
		},
		{
			text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
			author: "Ralph Waldo Emerson",
		},
		{
			text: "Happiness is not something ready made. It comes from your own actions.",
			author: "Dalai Lama",
		},
		{
			text: "If opportunity doesn't knock, build a door.",
			author: "Milton Berle",
		},
		{
			text: "Try not to become a man of success. Rather become a man of value.",
			author: "Albert Einstein",
		},
		{
			text: "We may encounter many defeats but we must not be defeated.",
			author: "Maya Angelou",
		},
		{
			text: "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
			author: "Johann Wolfgang von Goethe",
		},
		{
			text: "Imagination is more important than knowledge.",
			author: "Albert Einstein",
		},
		{
			text: "A person who never made a mistake never tried anything new.",
			author: "Albert Einstein",
		},
		{
			text: "You must be the change you wish to see in the world.",
			author: "Mahatma Gandhi",
		},
	];

	var lastIndex = -1;

	/* ------------------------------------------
     Get a random quote (avoids repeats)
     ------------------------------------------ */
	function getRandomQuote() {
		var index;
		do {
			index = Math.floor(Math.random() * quotes.length);
		} while (index === lastIndex && quotes.length > 1);
		lastIndex = index;
		return quotes[index];
	}

	/* ------------------------------------------
     Display a quote with fade transition
     ------------------------------------------ */
	var quoteEl = null;
	var authorEl = null;
	var twitterBtn = null;

	function displayQuote(quote) {
		if (!quoteEl || !authorEl) return;

		// Fade out
		quoteEl.classList.add("fade-out");
		authorEl.classList.add("fade-out");

		setTimeout(function () {
			quoteEl.textContent = quote.text;
			authorEl.textContent = quote.author || "Unknown";

			// Update Twitter link
			if (twitterBtn) {
				var tweetText = encodeURIComponent(
					'"' + quote.text + '" — ' + (quote.author || "Unknown"),
				);
				twitterBtn.href =
					"https://twitter.com/intent/tweet?text=" +
					tweetText +
					"&hashtags=quotes,inspiration";
			}

			// Fade in
			quoteEl.classList.remove("fade-out");
			authorEl.classList.remove("fade-out");
		}, 300);
	}

	/* ------------------------------------------
     Copy to clipboard
     ------------------------------------------ */
	function copyToClipboard() {
		if (!quoteEl || !authorEl) return;

		var text = '"' + quoteEl.textContent + '" — ' + authorEl.textContent;

		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(function () {
				showCopiedFeedback();
			});
		} else {
			// Fallback for older browsers
			var textarea = document.createElement("textarea");
			textarea.value = text;
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			showCopiedFeedback();
		}
	}

	function showCopiedFeedback() {
		var copyBtn = document.getElementById("copy-quote");
		if (!copyBtn) return;

		copyBtn.classList.add("copied");
		var icon = copyBtn.querySelector("i");
		if (icon) {
			icon.className = "fa-solid fa-check";
		}

		setTimeout(function () {
			copyBtn.classList.remove("copied");
			if (icon) {
				icon.className = "fa-solid fa-copy";
			}
		}, 1500);
	}

	/* ------------------------------------------
     Clock (date + time)
     ------------------------------------------ */
	function updateClock() {
		var now = new Date();

		// Time
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		if (hours === 0) hours = 12;
		var minuteStr = minutes < 10 ? "0" + minutes : minutes.toString();
		var timeStr = hours + ":" + minuteStr + " " + ampm;

		// Date
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		var dateStr =
			days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate();

		var timeEl = document.getElementById("clock-time");
		var dateEl = document.getElementById("clock-date");

		if (timeEl) timeEl.textContent = timeStr;
		if (dateEl) dateEl.textContent = dateStr;
	}

	/* ------------------------------------------
     Boot
     ------------------------------------------ */
	document.addEventListener("DOMContentLoaded", function () {
		quoteEl = document.getElementById("quote-text");
		authorEl = document.getElementById("quote-author");
		twitterBtn = document.getElementById("share-twitter");

		var newQuoteBtn = document.getElementById("new-quote");
		var copyBtn = document.getElementById("copy-quote");

		// Show first quote
		var firstQuote = getRandomQuote();
		displayQuote(firstQuote);

		// New quote button
		if (newQuoteBtn) {
			newQuoteBtn.addEventListener("click", function () {
				var q = getRandomQuote();
				displayQuote(q);
			});
		}

		// Copy button
		if (copyBtn) {
			copyBtn.addEventListener("click", copyToClipboard);
		}

		// Keyboard shortcut: Space for new quote
		document.addEventListener("keydown", function (e) {
			if (e.code === "Space" && e.target === document.body) {
				e.preventDefault();
				var q = getRandomQuote();
				displayQuote(q);
			}
		});

		// Clock
		updateClock();
		setInterval(updateClock, 1000);
	});
})();
