<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  let isSidebarOpen = false;
  let navHeight = 0; // Initialize to 0, will be calculated on mount
  let footerHeight = 0; // Initialize to 0, will be calculated on mount
  let currentPath;

  let galleryItems = [
    { path: '/mono_lake.jpg', location: 'Mono Lake, California' },
    { path: '/gum_wall.jpg', location: 'Gum Wall, Washington' },
    { path: '/farmers_market.jpg', location: 'Pike Place, Washington' },
    { path: '/light_jellyfish.jpg', location: 'Sensorio, California' },
    { path: '/light_field.jpg', location: 'Sensorio, California' },
    { path: '/tokyo_tower.jpg', location: 'Tokyo Tower, Japan' },
    { path: '/shrine.jpg', location: 'Meiji Jingu Shrine, Japan' },
    { path: '/sumida_river.jpg', location: 'Sumida River, Japan' },
    { path: '/bixby.JPEG', location: 'Bixby Bridge, California' },
    { path: '/waves.JPEG', location: 'Pebble Beach, California' },
    { path: '/lone_cypress.JPEG', location: 'Lone Cypress, California' },
    { path: '/mcway_falls.JPEG', location: 'Mcway Falls, California' },
    { path: '/zion.JPEG', location: 'Zion National Park, Utah' },
    { path: '/snoqualmie_falls.jpg', location: 'Snoqualmie Falls, Washington' },
    { path: '/space_needle.jpg', location: 'Space Needle, Washington' }
  ];

  let currentImageIndex = 0;

  $: currentPhoto = galleryItems[currentImageIndex];
  $: currentLocation = currentPhoto.location;

  function nextPhoto() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
  }

  function prevPhoto() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
  }

  function toggleSidebar(event) {
    if (event) {
      event.preventDefault();
    }
    isSidebarOpen = !isSidebarOpen;
  }

  // Function to calculate and set dynamic heights
  function calculateLayoutHeights() {
    const navElement = document.querySelector('nav');
    if (navElement) {
      navHeight = navElement.offsetHeight;
    }
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      footerHeight = footerElement.offsetHeight;
    }
  }

  onMount(() => {
    // Subscribe to page store to track current path
    const unsubscribe = page.subscribe($page => {
      currentPath = $page.url.pathname;
    });

    // Initial calculation and listener for resize
    calculateLayoutHeights(); // Calculate on initial mount

    function handleResize() {
      // Close sidebar if window gets wider than a certain point
      if (window.innerWidth > 1050 && isSidebarOpen) {
        isSidebarOpen = false;
      }
      calculateLayoutHeights(); // Recalculate on resize
    }

    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  });
</script>

<nav style="--nav-height: {navHeight}px;">
  {#if isSidebarOpen}
    <ul class="sidebar">
      <li>
        <a href="#" on:click={toggleSidebar} aria-label="Close navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
          </svg>
        </a>
      </li>
      <li><a href="/" class:active={currentPath === '/'}>Home</a></li>
      <li><a href="/about" class:active={currentPath === '/about'}>About</a></li>
      <li><a href="/projects" class:active={currentPath === '/projects'}>Projects</a></li>
      <li><a href="/skills" class:active={currentPath === '/skills'}>Skills</a></li>
    </ul>
  {/if}

  <ul>
    <li><a href="/" class:active={currentPath === '/'}>Timothy Ou</a></li>
    <li class="hide-on-desktop-nav"><a href="/" class:active={currentPath === '/'}>Home</a></li>
    <li class="hide-on-desktop-nav"><a href="/about" class:active={currentPath === '/about'}>About</a></li>
    <li class="hide-on-desktop-nav"><a href="/projects" class:active={currentPath === '/projects'}>Projects</a></li>
    <li class="hide-on-desktop-nav"><a href="/skills" class:active={currentPath === '/skills'}>Skills</a></li>
    <li class="menu-button">
      <a href="#" on:click={toggleSidebar} aria-label="Open navigation menu">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
      </a>
    </li>
  </ul>
</nav>

<main style="--nav-height: {navHeight}px; --footer-height: {footerHeight}px;">
  <div class="about-content">
    <div class="column-content">
      <img src="/timothyou2.png" alt="Timothy Ou" class="timothy-pic">
      <div class="contact-panel">
        <div class="resume">
          <a href="https://www.linkedin.com/in/timothy-ou/" target="_blank" rel="noopener noreferrer">
            <p>Resume 📄</p>
          </a>
        </div>
        <div class="socials">
          <div class="linkedin">
            <a href="https://www.linkedin.com/in/timothy-ou/" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/linkedin.png" alt="LinkedIn Profile">
            </a>
          </div>
          <div class="instagram">
            <a href="https://www.instagram.com/timothyouu/" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/instagram.png" alt="Instagram Profile">
            </a>
          </div>
          <div class="github">
            <a href="https://github.com/timothyouu" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/github.png" alt="GitHub Profile">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="media-content">
        <button type="button" class="side-button left-arrow" on:click={prevPhoto} aria-label="Previous photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
          </svg>
        </button>
        <div class="photo-image">
          <img src={currentPhoto.path} alt={currentPhoto.location} class="gallery-photo">
        </div>
        <button type="button" class="side-button right-arrow" on:click={nextPhoto} aria-label="Next photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z"/>
          </svg>
        </button>
      </div>
      <div class="location">
        <p>Location: {currentLocation}</p>
      </div>
    </div>
  </div>
</main>

<footer style="--footer-height: {footerHeight}px;">
  <p>Made with Timmy’s ❤️</p>
  <p>&copy; 2025 Timothy Ou</p>
</footer>

<style>
  /* Base styles and variables */
  :root {
    --content-vertical-padding: 20px;
  }

  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background-color: #16142A;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-y: auto;
  }

  /* Navigation Styles (retained from previous improvements for fluidity) */
  nav {
    background-color: #0A081D;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  nav ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  nav li {
    height: 136px; /* Original desktop height */
    line-height: 50px;
    padding: 0 20px;
  }

  nav a {
    color: #D5B8E2;
    height: 100%;
    text-decoration: none;
    display: flex;
    padding: 0 30px;
    font-size: 36px;
    font-style: normal;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    line-height: normal;
    align-items: center;
    transition: color 0.3s ease;
  }

  nav a.active {
    color: #7D73EC;
  }

  nav a:hover {
    background-color: #16142A;
  }

  nav li:first-child {
    margin-right: auto;
  }

  nav li:first-child a {
    color: #7D73EC;
    white-space: nowrap;
    min-width: fit-content;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px; /* Original fixed width */
    z-index: 999;
    background-color: #16142A;
    box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    display: none; /* Hidden by default, shown by JS */
    opacity: 95%; /* Keep existing opacity */
    backdrop-filter: blur(10px); /* Keep existing blur */
  }

  .sidebar li {
    width: 100%;
  }

  .sidebar a {
    width: 100%;
  }

  /* Main content layout */
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    /* Use the calculated navHeight and dynamic padding */
    padding-top: calc(var(--nav-height, 136px) + var(--content-vertical-padding));
    padding-bottom: var(--content-vertical-padding);
    /* Min-height to ensure main content pushes footer down */
    min-height: calc(100vh - var(--nav-height, 136px) - var(--footer-height, 100px) - (var(--content-vertical-padding) * 2));
  }

  .menu-button {
    display: none;
  }

  .hide-on-desktop-nav {
    display: flex;
  }

  /* About Content Section - Reverting to original sizes for large screens */
  .about-content {
    display: flex;
    flex-direction: row; /* Default for larger screens */
    align-items: flex-start;
    justify-content: center;
    gap: 30px; /* Original fixed gap */
    padding: 20px; /* Original fixed padding */
    width: 100%;
    max-width: 1800px;
    height: auto;
    box-sizing: border-box;
  }

  .column-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 30px; /* Original fixed gap */
    flex-shrink: 0;
    width: 100%;
    max-width: 500px; /* Original fixed max-width */
  }

  .timothy-pic {
    max-height: 500px; /* Original fixed max-height */
    max-width: 500px; /* Original fixed max-width */
    border-radius: 48px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .contact-panel {
    background-color: #0A091A;
    height: 300px; /* Original fixed height */
    width: 100%;
    max-width: 500px; /* Original fixed max-width */
    border-radius: 48px;
    padding: 20px; /* Original fixed padding */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .resume {
    background-color: #282450;
    width: 90%;
    height: 45%;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #D5B8E2;
  }

  .resume p {
    font-size: 50px; /* Original fixed font size */
    font-weight: 300;
    font-family: "Titan One";
    text-align: center;
    margin: 0; /* Remove default paragraph margin */
  }

  .socials {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    height: 45%;
    align-items: center;
  }

  .image-effects {
    filter: invert(100%) sepia(100%) saturate(200%) hue-rotate(270deg) brightness(100%) contrast(100%);
  }

  a {
    text-decoration: none;
    color: #D5B8E2;
  }

  .linkedin,
  .instagram,
  .github {
    background-color: #282450;
    width: 30%;
    height: 90px; /* Original fixed height */
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .linkedin img,
  .instagram img,
  .github img {
    height: 50px; /* Original fixed height */
    width: auto;
    color: #D5B8E2;
  }

  /* Gallery Section - Reverting to original sizes for large screens */
  .gallery {
    background-color: #0A091A;
    width: 100%;
    max-width: 1500px;
    flex-grow: 1;
    border-radius: 48px;
    padding: 30px; /* Original fixed padding */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 830px; /* Original fixed height */
    gap: 30px; /* Original fixed gap */
    justify-content: center;
    align-items: center;
  }

  .media-content {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px; /* Original fixed gap */
    max-height: 80%;
  }

  .side-button {
    background-color: #282450;
    width: 70px; /* Original fixed width */
    height: 90%;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .side-button:hover {
    background-color: #3f3b79;
  }

  .side-button svg {
    height: 48px; /* Original fixed height */
    width: 48px; /* Original fixed width */
    fill: #D5B8E2;
    transform: translateX(5px);
  }

  .photo-image {
    width: 80%;
    max-width: 1100px;
    height: 100%;
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gallery-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 32px;
  }

  .location {
    background-color: #282450;
    width: 90%;
    max-width: 500px;
    height: 80px; /* Original fixed height */
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .location p {
    color: #D5B8E2;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px; /* Original fixed font size */
    font-weight: 600;
    margin: 0;
  }

  .side-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px #D5B8E2;
  }

  button:focus {
    outline: none !important;
  }

  /* Footer (retained from previous improvements for fluidity) */
  footer {
    background-color: #0A081D;
    color: #D5B8E2;
    padding: 20px 0;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    font-size: 1.2em; /* Original em size */
    flex-shrink: 0;
    width: 100%;
  }

  footer p {
    margin: 5px 0;
  }

  /* Media Queries - Adjusting fixed sizes for responsiveness */

  /* Tablet & smaller desktop (approx. 1050px and below) */
  @media (max-width: 1050px) {
    /* Navigation remains similar to previous version */
    nav li {
      height: 70px;
    }
    nav a {
      font-size: 24px;
      padding: 0 15px;
    }
    nav li:first-child a {
      font-size: 26px;
      padding: 0 10px;
    }

    .hide-on-desktop-nav {
      display: none;
    }

    .menu-button {
      display: list-item;
    }

    .sidebar {
      display: flex;
    }

    main {
      padding-top: var(--nav-height, 70px);
    }

    /* ABOUT CONTENT ADJUSTMENTS */
    .about-content {
      flex-direction: column; /* Stack columns */
      align-items: center;
      gap: 25px; /* Adjust gap */
      padding: 15px; /* Adjust padding */
    }

    .column-content {
      width: 100%; /* Take full width within its flex container */
      max-width: 500px; /* Keep the max-width for consistency */
      gap: 25px;
    }

    .timothy-pic {
      max-width: 350px; /* Reduce image size */
      max-height: 350px; /* Match new max-width for square images */
    }

    .contact-panel {
      width: 90%; /* Scale width relative to column-content */
      max-width: 350px; /* Reduce max-width */
      height: auto; /* Allow height to adjust based on content */
      padding: 15px;
      gap: 15px;
    }

    .resume {
      height: 100px; /* Reduce height */
    }

    .resume p {
      font-size: 36px; /* Reduce font size */
    }

    .socials {
      height: 80px; /* Reduce height */
    }

    .linkedin,
    .instagram,
    .github {
      height: 60px; /* Reduce height */
    }

    .linkedin img,
    .instagram img,
    .github img {
      height: 40px; /* Reduce icon size */
    }

    /* GALLERY ADJUSTMENTS */
    .gallery {
      width: 100%; /* Take full width within its flex container */
      height: auto; /* Allow height to adjust */
      max-width: 500px; /* Reduce max-width */
      padding: 20px;
      gap: 20px;
    }

    .media-content {
      height: auto;
      max-height: none; /* No max height here to allow flexibility */
    }

    .photo-image {
      height: 300px; /* Set a fixed height for image container */
      width: 100%;
      max-width: none;
    }

    .side-button {
      width: 50px; /* Reduce button width */
      height: 100%; /* Keep height relative to its flex parent */
    }

    .side-button svg {
      height: 36px; /* Reduce SVG size */
      width: 36px;
      transform: translateX(0); /* Remove small translateX on smaller screens */
    }

    .location {
      height: 60px; /* Reduce height */
    }

    .location p {
      font-size: 20px; /* Reduce font size */
    }

    footer {
      font-size: 1em;
      padding: 15px 0;
    }
  }

  /* Smaller Tablets and larger Phones (approx. 768px and below) */
  @media (max-width: 768px) {
    nav li {
      padding: 0 10px;
    }
    nav a {
      font-size: 20px;
      padding: 0 10px;
    }
    nav li:first-child a {
      font-size: 22px;
      padding: 0 10px;
    }

    .sidebar a {
      font-size: 20px;
      padding: 0 15px;
    }

    /* ABOUT CONTENT ADJUSTMENTS */
    .about-content {
      padding: 10px;
      gap: 20px;
    }

    .column-content {
      max-width: 400px; /* Further reduce max-width */
      gap: 20px;
    }

    .timothy-pic {
      max-width: 280px; /* Further reduce image size */
      max-height: 280px;
    }

    .contact-panel {
      max-width: 280px;
      padding: 10px;
      gap: 10px;
    }

    .resume {
      height: 80px; /* Further reduce height */
    }

    .resume p {
      font-size: 30px; /* Further reduce font size */
    }

    .socials {
      height: 70px;
    }

    .linkedin,
    .instagram,
    .github {
      height: 50px;
    }

    .linkedin img,
    .instagram img,
    .github img {
      height: 35px;
    }

    /* GALLERY ADJUSTMENTS */
    .gallery {
      max-width: 400px; /* Further reduce max-width */
      padding: 15px;
      gap: 15px;
    }

    .photo-image {
      height: 250px; /* Further reduce image container height */
    }

    .side-button {
      width: 40px; /* Further reduce button width */
    }

    .side-button svg {
      height: 28px;
      width: 28px;
    }

    .location {
      height: 45px;
    }

    .location p {
      font-size: 18px;
    }

    footer {
      font-size: 0.9em;
      padding: 10px 0;
    }
  }

  /* Very Small Phones (approx. 500px and below) */
  @media (max-width: 500px) {
    /* ABOUT CONTENT ADJUSTMENTS */
    .about-content {
      flex-direction: column; /* Ensure stacked */
      align-items: center;
      padding: 10px;
      gap: 15px;
    }

    .column-content {
      width: 95%; /* Wider on smallest screens */
      max-width: 280px; /* Cap max-width */
      gap: 15px;
    }

    .timothy-pic {
      max-width: 200px; /* Smallest image size */
      max-height: 200px;
    }

    .contact-panel {
      max-width: 200px;
      padding: 10px;
      gap: 10px;
    }

    .resume {
      height: 70px;
    }

    .resume p {
      font-size: 26px;
    }

    .socials {
      height: 60px;
    }

    .linkedin,
    .instagram,
    .github {
      height: 40px;
    }

    .linkedin img,
    .instagram img,
    .github img {
      height: 30px;
    }

    /* GALLERY ADJUSTMENTS */
    .gallery {
      width: 95%; /* Wider on smallest screens */
      max-width: 300px; /* Cap max-width */
      padding: 10px;
      gap: 10px;
    }

    .photo-image {
      height: 180px; /* Smallest image container height */
    }

    .side-button {
      width: 35px;
    }

    .side-button svg {
      height: 24px;
      width: 24px;
    }

    .location {
      height: 40px;
    }

    .location p {
      font-size: 16px;
    }

    footer {
      font-size: 0.8em;
      padding: 8px 0;
    }
  }

  /* Extra Small Phones (e.g., iPhone 5/SE old models) */
  @media (max-width: 350px) {
    /* ABOUT CONTENT ADJUSTMENTS */
    .timothy-pic {
      max-width: 180px;
      max-height: 180px;
    }
    .contact-panel {
      max-width: 180px;
    }
    .resume {
      height: 60px;
    }
    .resume p {
      font-size: 20px;
    }
    .socials {
      height: 50px;
    }
    .linkedin,
    .instagram,
    .github {
      height: 35px;
    }
    .linkedin img,
    .instagram img,
    .github img {
      height: 25px;
    }

    /* GALLERY ADJUSTMENTS */
    .gallery {
      max-width: 250px;
    }
    .photo-image {
      height: 150px;
    }
    .side-button {
      width: 30px;
    }
    .side-button svg {
      height: 20px;
      width: 20px;
    }
    .location p {
      font-size: 14px;
    }
  }
</style>