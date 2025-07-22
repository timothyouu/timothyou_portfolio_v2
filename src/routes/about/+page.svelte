<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  let isSidebarOpen = false;
  let navHeight = 0;
  let footerHeight = 0;
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
    const unsubscribe = page.subscribe($page => {
      currentPath = $page.url.pathname;
    });

    calculateLayoutHeights();

    function handleResize() {
      if (window.innerWidth > 1050 && isSidebarOpen) {
        isSidebarOpen = false;
      }
      calculateLayoutHeights();
    }

    window.addEventListener('resize', handleResize);

    return () => {
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
            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
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
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </a>
    </li>
  </ul>
</nav>

<main style="--nav-height: {navHeight}px; --footer-height: {footerHeight}px;">
  <div class="about-content">
    <div class="column-content">
      <img src="/timothyou2.png" alt="Timothy Ou" class="timothy-pic" />
      <div class="contact-panel">
        <div class="resume">
          <a href="/timothy_resume.pdf" target="_blank" rel="noopener noreferrer">
            <p>Resume 📄</p>
          </a>
        </div>
        <div class="socials">
          <div class="linkedin">
            <a href="https://www.linkedin.com/in/timothy-ou/" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/linkedin.png" alt="LinkedIn Profile" />
            </a>
          </div>
          <div class="instagram">
            <a href="https://www.instagram.com/timothyouu/" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/instagram.png" alt="Instagram Profile" />
            </a>
          </div>
          <div class="github">
            <a href="https://github.com/timothyouu" target="_blank" rel="noopener noreferrer">
              <img class="image-effects" src="/github.png" alt="GitHub Profile" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery">
      <div class="media-content">
        <button type="button" class="side-button left-arrow" on:click={prevPhoto} aria-label="Previous photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        <div class="photo-image">
          <img src={currentPhoto.path} alt={currentPhoto.location} class="gallery-photo" />
        </div>
        <button type="button" class="side-button right-arrow" on:click={nextPhoto} aria-label="Next photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z" />
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
  :root {
    --nav-height-desktop: 136px;
    --footer-height-desktop: 100px;
    --content-vertical-padding: 10px; /* Reduced vertical padding */
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
  }

  nav {
    background-color: #0A081D;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: var(--nav-height-desktop); /* Use variable */
  }

  nav ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%; /* Fill nav height */
  }

  nav li {
    height: 100%; /* Fill nav ul height */
    line-height: 1; /* Adjust to better center text vertically */
    padding: 0 15px; /* Reduced padding */
  }

  nav a {
    color: #D5B8E2;
    height: 100%;
    text-decoration: none;
    display: flex;
    padding: 0 20px; /* Reduced padding */
    font-size: 32px; /* Slightly reduced font size */
    font-style: normal;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
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
    width: 250px;
    z-index: 999;
    background-color: #16142A;
    box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    display: none;
    opacity: 95%;
    backdrop-filter: blur(10px);
  }

  .sidebar li {
    width: 100%;
  }

  .sidebar a {
    width: 100%;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align content to the top within main */
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    /* Calculate padding dynamically based on navHeight */
    padding-top: calc(var(--nav-height, var(--nav-height-desktop)) + var(--content-vertical-padding));
    padding-bottom: var(--content-vertical-padding);
    overflow-y: auto; /* Allow main to scroll if content overflows vertically */
    min-height: calc(100vh - var(--nav-height, var(--nav-height-desktop)) - var(--footer-height, var(--footer-height-desktop))); /* Ensure main fills available vertical space, allowing scrolling */
  }

  .menu-button {
    display: none;
  }

  .hide-on-desktop-nav {
    display: flex;
  }

  .about-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    width: 100%;
    max-width: 1800px;
    height: auto; /* Allow height to be flexible */
    box-sizing: border-box;
    flex-shrink: 1;
    min-width: 0;
    min-height: 0;
  }

  .column-content {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    display: flex;
    gap: 30px;
    flex-shrink: 1; /* Allow column-content to shrink */
    flex-basis: 450px; /* Preferred width */
    min-width: 250px; /* Minimum width */
    width: auto;
    height: 600px; /* Adjusted height to match gallery from screenshot */
    max-height: 600px;
    min-height: 0;
    background-color: #0A091A;
    border-radius: 40px;
    padding: 20px;
    box-sizing: border-box;
  }

  .timothy-pic {
    max-height: 45%; /* Max height within column-content */
    max-width: 100%;
    border-radius: 40px;
    width: auto;
    height: auto;
    object-fit: cover; /* Changed to cover */
  }

  .contact-panel {
    background-color: #16142A;
    width: 100%;
    border-radius: 40px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
    flex-shrink: 1;
    height: 50%; /* Approx. height for contact panel within column-content */
    min-height: 0;
  }

  .resume {
    background-color: #282450;
    width: 90%;
    height: auto;
    padding: 15px 0;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #D5B8E2;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .resume p {
    font-size: 36px;
    font-weight: 300;
    font-family: "Titan One";
    margin: 0;
  }

  .socials {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    align-items: center;
    height: auto;
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
    height: 90px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .linkedin img,
  .instagram img,
  .github img {
    height: 50px;
    width: auto;
    color: #D5B8E2;
  }

  .gallery {
    background-color: #0A091A;
    width: 100%;
    max-width: 1500px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 700px; /* Preferred width */
    min-width: 400px; /* Minimum width */
    border-radius: 40px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 830px; /* Fixed height for gallery as per screenshot */
    min-height: 0;
    gap: 30px;
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
    gap: 20px;
    height: auto;
    min-height: 0;
  }

  .side-button {
    background-color: #282450;
    width: 70px;
    height: 90%; /* Keep 90% of media-content height */
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
    height: 48px;
    width: 48px;
    fill: #D5B8E2;
    transform: translateX(5px);
  }

  .photo-image {
    width: 80%;
    /* max-width: 1100px;  REMOVE this fixed max-width for scaling */
    height: 100%; /* Fill 100% of media-content's height */
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #16142A;
  }

  .gallery-photo {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Fill and crop as per screenshot */
    border-radius: 32px;
  }

  .location {
    background-color: #282450;
    width: 90%;
    max-width: 500px;
    height: 80px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .location p {
    color: #D5B8E2;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px;
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

  footer {
    background-color: #0A081D;
    color: #D5B8E2;
    padding: 10px 0; /* Reduced padding */
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    font-size: 1.2em;
    flex-shrink: 0;
    width: 100%;
    height: var(--footer-height-desktop); /* Use variable */
  }

  footer p {
    margin: 5px 0;
  }

  @media (max-width: 1050px) {
    /* Navbar */
    nav {
      height: 70px;
    }
    nav ul {
      height: 70px;
    }
    nav li {
      height: 70px;
      padding: 0 15px;
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

    /* Main content padding-top adjusted */
    main {
      padding-top: calc(70px + var(--content-vertical-padding));
    }

    /* About content (main sections shrink proportionally) */
    .about-content {
      gap: 20px;
      padding: 15px;
      /* Removed max-height here, allow height to be driven by fixed children or scroll */
      height: auto;
    }

    .column-content {
      flex-basis: 300px;
      min-width: 180px;
      gap: 20px;
      padding: 15px;
      height: 500px; /* Maintained fixed height */
      max-height: 500px;
    }

    .timothy-pic {
      max-height: 250px;
    }

    .contact-panel {
      padding: 10px;
      gap: 10px;
    }

    .resume {
      font-size: 16px;
      padding: 10px 0;
    }
    .resume p {
      font-size: 28px;
    }
    .socials {
      height: 50px;
    }
    .linkedin,
    .instagram,
    .github {
      height: 40px;
    }
    .linkedin img,
    .instagram img,
    .github img {
      height: 25px;
    }

    .gallery {
      flex-basis: 400px;
      min-width: 250px;
      padding: 20px;
      gap: 15px;
      height: 650px; /* Maintained fixed height */
    }

    .media-content {
      max-height: 350px;
    }

    .photo-image {
      height: 250px; /* Fixed height for image frame */
    }

    .side-button {
      width: 40px;
    }

    .side-button svg {
      height: 28px;
      width: 28px;
    }

    .location {
      height: 45px;
    }

    .location p {
      font-size: 16px;
    }

    footer {
      font-size: 1em;
      padding: 15px 0;
    }
  }

  @media (max-width: 768px) {
    nav li {
      padding: 0 8px;
    }
    nav a {
      font-size: 18px;
      padding: 0 8px;
    }
    nav li:first-child a {
      font-size: 20px;
      padding: 0 5px;
    }
    .sidebar a {
      font-size: 18px;
      padding: 0 10px;
    }

    .about-content {
      flex-direction: column; /* Force stacking on smaller screens */
      align-items: center;
      gap: 15px;
      padding: 10px;
      height: auto; /* Allow height to adjust dynamically when stacked */
    }

    .column-content,
    .gallery {
      flex-basis: auto;
      min-width: unset;
      max-width: 90%;
      width: 100%;
      height: auto; /* Allow height to adjust dynamically when content stacks */
      margin: 0 auto;
    }

    .timothy-pic {
      max-height: 180px;
    }

    .contact-panel {
      padding: 8px;
      gap: 8px;
    }

    .resume {
      font-size: 14px;
      padding: 8px 0;
    }
    .resume p {
      font-size: 20px;
    }
    .socials {
      height: 40px;
    }
    .linkedin img,
    .instagram img,
    .github img {
      height: 20px;
    }

    .gallery {
      padding: 10px;
      gap: 10px;
    }

    .media-content {
      max-height: 250px;
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

    .location {
      height: 35px;
    }

    .location p {
      font-size: 14px;
    }

    footer {
      font-size: 0.8em;
      padding: 8px 0;
    }
  }

  @media (max-width: 500px) {
    /* Already stacked at 768px, just adjust sizes */
    .about-content {
      gap: 15px;
      padding: 8px;
    }

    .column-content {
      max-width: 280px;
    }

    .timothy-pic {
      max-height: 150px;
    }

    .contact-panel {
      padding: 6px;
      gap: 6px;
    }

    .resume {
      font-size: 12px;
      padding: 6px 0;
    }
    .resume p {
      font-size: 18px;
    }
    .socials {
      height: 35px;
    }
    .linkedin img,
    .instagram img,
    .github img {
      height: 16px;
    }

    .gallery {
      max-width: 300px;
      padding: 8px;
      gap: 8px;
    }

    .media-content {
      max-height: 180px;
    }

    .photo-image {
      height: 100px;
    }

    .side-button {
      width: 25px;
    }

    .side-button svg {
      height: 16px;
      width: 16px;
    }

    .location {
      height: 30px;
    }

    .location p {
      font-size: 11px;
    }

    footer {
      font-size: 0.7em;
      padding: 5px 0;
    }
  }

  @media (max-width: 350px) {
    .resume {
      font-size: 10px;
    }
    .resume p {
      font-size: 14px;
    }
    .socials {
      height: 28px;
    }
    .linkedin img,
    .instagram img,
    .github img {
      height: 14px;
    }
    .photo-image {
      height: 80px;
    }
    .side-button {
      width: 20px;
    }
    .side-button svg {
      height: 12px;
      width: 12px;
    }
    .location {
      height: 25px;
    }
    .location p {
      font-size: 9px;
    }
  }
</style>