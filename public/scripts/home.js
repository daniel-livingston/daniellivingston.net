AOS.init();

(() => {
	const contactForm = document.getElementById("contact-form");
	const navbar = document.getElementById("navbar");
	const homeLink = document.getElementById("home-link");
	const aboutLink = document.getElementById("about-link");
	const projectsLink = document.getElementById("projects-link");
	const project = document.getElementById("projects");
	const contactLink = document.getElementById("contact-link");
	const contact = document.getElementById("contact");

	const mobileNavButton = document.getElementById("mobile-nav-button");
	const mobileDropdown = document.getElementById("mobile-dropdown");
	const homeLinkM = document.getElementById("home-link-m");
	const aboutLinkM = document.getElementById("about-link-m");
	const projectsLinkM = document.getElementById("projects-link-m");
	const contactLinkM = document.getElementById("contact-link-m");

	// Helper functions for finding the position of elements
	function getAboutPosition() {
		return window.innerHeight;
	}

	function getProjectsPosition() {
		return project.offsetTop - navbar.clientHeight - 50;
	}

	function getContactPosition() {
		return contact.offsetTop - navbar.clientHeight - 50;
	}

	// Handles proper highlighting of nav links
	function getExpectedHighlighted() {
		if (window.scrollY < window.innerHeight) {
			return homeLink;
		} else if (window.scrollY < getProjectsPosition()) {
			return aboutLink;
		} else if (window.scrollY < getContactPosition()) {
			return projectsLink;
		} else {
			return contactLink;
		}
	}

	let highlighted = homeLink;
	function setHighlightedLink() {
		if (!highlighted) {
			highlighted = getExpectedHighlighted();
			return highlightLink(highlighted);
		}

		const expectedHighlighted = getExpectedHighlighted();
		if (expectedHighlighted !== highlighted) {
			highlightLink(expectedHighlighted, highlighted);
			highlighted = expectedHighlighted;
		}
	}

	function highlightLink(toHighlight, toUnhighlight) {
		toHighlight && toHighlight.setAttribute("class", "active");
		toUnhighlight && toUnhighlight.removeAttribute("class");
	}

	window.addEventListener("load", (e) => {
		setHighlightedLink();
	});

	let isFixed = false;
	window.addEventListener("scroll", (e) => {
		if (!isFixed && window.scrollY >= window.innerHeight) {
			navbar.style.position = "fixed";
			isFixed = true;
		} else if (isFixed && window.scrollY < window.innerHeight) {
			navbar.style.position = "static";
			isFixed = false;
		}
		setHighlightedLink();
	});

	// Handles navigation when clicking nav links
	function navigateTo(position) {
		window.scroll({
			top: position,
			behavior: "smooth",
		});
	}

	function hideMobileDropdown() {
		mobileDropdown.style.display = "none";
	}

	homeLink.addEventListener("click", (e) => {
		e.preventDefault();
		navigateTo(0);
	});

	homeLinkM.addEventListener("click", (e) => {
		e.preventDefault();
		hideMobileDropdown();
		navigateTo(0);
	});

	aboutLink.addEventListener("click", (e) => {
		e.preventDefault();
		navigateTo(getAboutPosition());
	});

	aboutLinkM.addEventListener("click", (e) => {
		e.preventDefault();
		hideMobileDropdown();
		navigateTo(getAboutPosition());
	});

	projectsLink.addEventListener("click", (e) => {
		e.preventDefault();
		navigateTo(getProjectsPosition());
	});

	projectsLinkM.addEventListener("click", (e) => {
		e.preventDefault();
		hideMobileDropdown();
		navigateTo(getProjectsPosition());
	});

	contactLink.addEventListener("click", (e) => {
		e.preventDefault();
		navigateTo(getContactPosition());
	});

	contactLinkM.addEventListener("click", (e) => {
		e.preventDefault();
		hideMobileDropdown();
		navigateTo(getContactPosition());
	});

	// Handles contact form
	contactForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const message = e.target.message.value;

		let somethingMissing = false;
		if (!name) {
			document.getElementById("name-error-message").style.display = "inline";
			e.target.name.setAttribute("class", "error");
			somethingMissing = true;
		}

		if (!email) {
			document.getElementById("email-error-message").style.display = "inline";
			e.target.email.setAttribute("class", "error");
			somethingMissing = true;
		}

		if (!message) {
			document.getElementById("message-error-message").style.display = "inline";
			e.target.message.setAttribute("class", "error");
			somethingMissing = true;
		}

		if (somethingMissing) {
			return;
		}

		const response = await fetch("/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			body: JSON.stringify({ name, email, message }),
		});

		if (response.status === 400) {
			document.getElementById("email-error-message").style.display = "inline";
			e.target.email.setAttribute("class", "error");
		} else if (response.status === 200) {
			location.reload();
		}
	});

	function clearError(errorId, inputElement) {
		document.getElementById(errorId).style.display = "none";
		inputElement.removeAttribute("class");
	}

	const nameInput = contactForm.name;
	nameInput.addEventListener("input", () => {
		clearError("name-error-message", nameInput);
	});

	const emailInput = contactForm.email;
	emailInput.addEventListener("input", () => {
		clearError("email-error-message", emailInput);
	});

	const messageInput = contactForm.message;
	messageInput.addEventListener("input", () => {
		clearError("message-error-message", messageInput);
	});

	mobileNavButton.addEventListener("click", () => {
		if (mobileDropdown.style.display === "flex") {
			mobileDropdown.style.display = "none";
		} else {
			mobileDropdown.style.display = "flex";
		}
	});
})();
