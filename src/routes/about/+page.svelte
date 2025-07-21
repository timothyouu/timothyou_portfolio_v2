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
          <a href="/timothy_resume.pdf" target="_blank" rel="noopener noreferrer">
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
    height: 136px;
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
    align-items: center;
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    padding-top: calc(var(--nav-height, 136px) + var(--content-vertical-padding));
    padding-bottom: var(--content-vertical-padding);
    min-height: calc(100vh - var(--nav-height, 136px) - var(--footer-height, 100px) - (var(--content-vertical-padding) * 2));
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
    height: auto;
    box-sizing: border-box;
  }

  .column-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 30px;
    flex-shrink: 0;
    width: 100%;
    max-width: 500px;
  }

  .timothy-pic {
    max-height: 500px;
    max-width: 500px;
    border-radius: 48px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .contact-panel {
    background-color: #0A091A;
    height: 300px;
    width: 100%;
    max-width: 500px;
    border-radius: 48px;
    padding: 20px;
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
    font-size: 50px;
    font-weight: 300;
    font-family: "Titan One";
    text-align: center;
    margin: 0;
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
    border-radius: 48px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 830px;
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
    max-height: 80%;
  }

  .side-button {
    background-color: #282450;
    width: 70px;
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
    height: 48px;
    width: 48px;
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
    padding: 20px 0;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    font-size: 1.2em;
    flex-shrink: 0;
    width: 100%;
  }

  footer p {
    margin: 5px 0;
  }

  @media (max-width: 1050px) {
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

    .about-content {
      flex-direction: column;
      align-items: center;
      gap: 25px;
      padding: 15px;
    }

    .column-content {
      width: 100%;
      max-width: 500px;
      gap: 25px;
    }

    .timothy-pic {
      max-width: 350px;
      max-height: 350px;
    }

    .contact-panel {
      width: 90%;
      max-width: 350px;
      height: auto;
      padding: 15px;
      gap: 15px;
    }

    .resume {
      height: 100px;
    }

    .resume p {
      font-size: 36px;
    }

    .socials {
      height: 80px;
    }

    .linkedin,
    .instagram,
    .github {
      height: 60px;
    }

    .linkedin img,
    .instagram img,
    .github img {
      height: 40px;
    }

    .gallery {
      width: 100%;
      height: auto;
      max-width: 500px;
      padding: 20px;
      gap: 20px;
    }

    .media-content {
      height: auto;
      max-height: none;
    }

    .photo-image {
      height: 300px;
      width: 100%;
      max-width: none;
    }

    .side-button {
      width: 50px;
      height: 100%;
    }

    .side-button svg {
      height: 36px;
      width: 36px;
      transform: translateX(0); 
    }

    .location {
      height: 60px;
    }

    .location p {
      font-size: 20px;
    }

    footer {
      font-size: 1em;
      padding: 15px 0;
    }
  }

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

    .about-content {
      padding: 10px;
      gap: 20px;
    }

    .column-content {
      max-width: 400px;
      gap: 20px;
    }

    .timothy-pic {
      max-width: 280px;
      max-height: 280px;
    }

    .contact-panel {
      max-width: 280px;
      padding: 10px;
      gap: 10px;
    }

    .resume {
      height: 80px;
    }

    .resume p {
      font-size: 30px;
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

    .gallery {
      max-width: 400px;
      padding: 15px;
      gap: 15px;
    }

    .photo-image {
      height: 250px;
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
      font-size: 18px;
    }

    footer {
      font-size: 0.9em;
      padding: 10px 0;
    }
  }

  @media (max-width: 500px) {
    .about-content {
      flex-direction: column;
      align-items: center;
      padding: 10px;
      gap: 15px;
    }

    .column-content {
      width: 95%;
      max-width: 280px; 
      gap: 15px;
    }

    .timothy-pic {
      max-width: 200px;
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

    .gallery {
      width: 95%;
      max-width: 300px; 
      padding: 10px;
      gap: 10px;
    }

    .photo-image {
      height: 180px; 
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

  @media (max-width: 350px) {
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