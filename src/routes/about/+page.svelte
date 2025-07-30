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
    --content-vertical-padding: 20px;
  }

  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
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
    height: var(--nav-height-desktop);
  }

  nav ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  nav li {
    height: 100%;
    line-height: 1;
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
    padding-top: calc(var(--nav-height, 0px) + var(--content-vertical-padding));
    padding-bottom: var(--content-vertical-padding);
    min-height: calc(100vh - var(--nav-height, 0px) - var(--footer-height, 0px));
    overflow-y: auto; 
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
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 30px;
    width: 100%;
    max-width: 2000px;
    height: auto;
    max-height: calc(100vh - var(--nav-height, 0px) - var(--footer-height, 0px) - (var(--content-vertical-padding) * 2));
    box-sizing: border-box;
    flex-shrink: 1;
    min-width: 0;
    min-height: 0;
  }

  .column-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 40px;
    flex-shrink: 1;
    flex-basis: 500px;
    min-width: 300px; 
    width: auto;
    height: 550px;
    max-height: 100%; 
    background-color: #0A091A;
    border-radius: 40px;
    padding: 30px;
    box-sizing: border-box;
  }

  .timothy-pic {
    max-height: 45%;
    max-width: 100%;
    border-radius: 40px;
    width: auto;
    height: auto;
    object-fit: cover;
    flex-shrink: 1;
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
    gap: 10px;
    flex-shrink: 1;
    height: 50%;
    max-height: 100%;
  }

  .resume {
    background-color: #282450;
    width: 90%;
    height: auto;
    padding: 20px 0;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: #D5B8E2;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }

  .resume p {
    font-size: 42px;
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
    height: 110px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .resume:hover {
    background-color: #3f3b79;
  }

  .linkedin:hover {
    background-color: #3f3b79;
  }

  .instagram:hover {
    background-color: #3f3b79;
  }

  .github:hover {
    background-color: #3f3b79;
  }

  .linkedin img,
  .instagram img,
  .github img {
    height: 60px;
    width: auto;
    color: #D5B8E2;
  }

  .gallery {
    background-color: #0A091A;
    width: 100%;
    max-width: 1800px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 900px;
    min-width: 500px;
    border-radius: 40px;
    padding: 40px; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 650px;
    max-height: 100%;
    gap: 40px;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }

  .media-content {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    height: 450px;
    min-height: 0;
  }

  .side-button {
    background-color: #282450;
    width: 90px;
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
    height: 58px;
    width: 58px;
    fill: #D5B8E2;
    transform: translateX(5px);
  }

  .photo-image {
    width: 80%;
    height: 100%;
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
    object-fit: cover;
    border-radius: 32px;
  }

  .location {
    background-color: #282450;
    width: 90%;
    max-width: 600px;
    height: 100px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .location p {
    color: #D5B8E2;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 30px;
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
    padding: 10px 0;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    font-size: 1.2em;
    flex-shrink: 0;
    width: 100%;
    height: var(--footer-height-desktop);
    margin-top: auto;
  }

  footer p {
    margin: 5px 0;
  }

  @media (max-width: 1050px) {
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

    main {
      padding-top: calc(var(--nav-height) + var(--content-vertical-padding));
      padding-bottom: var(--content-vertical-padding);
      min-height: calc(100vh - var(--nav-height) - var(--footer-height, var(--footer-height-desktop)));
      align-items: center;
    }

    .about-content {
      gap: 20px;
      padding: 15px;
      height: auto;
      max-height: calc(100vh - var(--nav-height) - var(--footer-height, var(--footer-height-desktop)) - (var(--content-vertical-padding) * 2));
    }

    .column-content {
      flex-basis: 300px;
      min-width: 180px;
      gap: 20px;
      padding: 15px;
      height: 480px;
      max-height: 100%;
    }

    .timothy-pic {
      max-height: 250px;
    }

    .contact-panel {
      padding: 10px;
      gap: 10px;
      height: 50%;
      max-height: 100%;
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
      height: 600px;
      max-height: 100%;
      overflow-y: auto;
    }

    .media-content {
      height: 350px;
      max-height: 100%;
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
      font-size: 16px;
    }

    footer {
      font-size: 1em;
      padding: 15px 0;
    }
  }

  @media (max-width: 768px) {
    main {
      align-items: flex-start;
    }

    .about-content {
      flex-direction: column;
      align-items: center;
      gap: 15px;
      padding: 10px;
      height: auto;
      max-height: calc(100vh - var(--nav-height) - var(--footer-height, var(--footer-height-desktop)) - (var(--content-vertical-padding) * 2));
    }

    .column-content,
    .gallery {
      flex-basis: auto;
      min-width: unset;
      max-width: 90%;
      width: 100%;
      height: auto;
      margin: 0 auto;
      max-height: 100%;
      overflow-y: auto;
    }

    .timothy-pic {
      max-height: 180px;
    }

    .contact-panel {
      padding: 8px;
      gap: 8px;
      height: auto;
      max-height: 100%;
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
      height: auto;
      max-height: 100%;
      overflow-y: auto;
    }

    .media-content {
      height: 250px;
      max-height: 100%;
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
      font-size: 1em;
      padding: 15px 0;
    }
  }

  @media (max-width: 500px) {
    .about-content {
      gap: 15px;
      padding: 8px;
    }

    .column-content {
      max-width: 280px;
      height: auto;
      max-height: 100%;
    }

    .timothy-pic {
      max-height: 150px;
    }

    .contact-panel {
      padding: 6px;
      gap: 6px;
      height: auto;
      max-height: 100%;
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
      height: auto;
      max-height: 100%;
      overflow-y: auto;
    }

    .media-content {
      height: 180px;
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