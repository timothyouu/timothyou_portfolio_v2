<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  let isSidebarOpen = false;
  let navCalculatedHeight = 136;
  let currentPath;

  let galleryItems = [
    { path: '/os_stats.png', project: 'Open Source Stats', date: 'October 2024 - Present', tech: 'Python, GitHub API', description: 'Contributed to Python CLI tool that retrieves commits and pull requests from acmcsufoss GitHub organization' },
    { path: '/global_city_explorer.png', project: 'Global City Explorer - FullyHacks Project', date: 'April 2025 - April 2025', tech: 'Javascript, HTML, CSS, SvelteKit', description: 'Developed a real-time global city information app using SvelteKit, Enabling users to search and view key data' },
    { path: '/geometric_calculator.png', project: 'Geometric Shapes Calculator', date: 'March 2024 - May 2024', tech: 'JavaScript, HTML, CSS', description: 'Developed a web application to calculate the area and volume of 2D and 3D geometric shapes' },
    { path: '/password.png', project: 'Secure Password Generator', date: 'February 2024 - April 2024', tech: 'JavaScript, HTML, CSS', description: 'Developed a robust JavaScript application for generating secure passwords based on user-defined strength levels' }
  ];

  let currentImageIndex = 0;

  $: currentPhoto = galleryItems[currentImageIndex];
  $: currentproject = currentPhoto.project;
  $: currentdate = currentPhoto.date;
  $: currenttech = currentPhoto.tech;
  $: currentdescription = currentPhoto.description;


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

  onMount(() => {
    const unsubscribe = page.subscribe($page => {
      currentPath = $page.url.pathname;
    });

    function handleResize() {
      if (window.innerWidth > 1050 && isSidebarOpen) {
        isSidebarOpen = false;
      }

      const navElement = document.querySelector('nav');
      if (navElement) {
        navCalculatedHeight = navElement.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${navCalculatedHeight}px`);
      }
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        document.documentElement.style.setProperty('--footer-height', `${footerElement.offsetHeight}px`);
      }
    }

    const navElement = document.querySelector('nav');
    if (navElement) {
      navCalculatedHeight = navElement.offsetHeight;
      document.documentElement.style.setProperty('--nav-height', `${navCalculatedHeight}px`);
    }
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      document.documentElement.style.setProperty('--footer-height', `${footerElement.offsetHeight}px`);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  });
</script>

<nav>
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

<main>
    <div class = "projects-content">
      <div class = "project-gallery">
        <button type="button" class="side-button left-arrow" on:click={prevPhoto} aria-label="Previous photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
          </svg>
        </button>
        <div class = "column-content">
          <div class="project-image">
            <img src= {currentPhoto.path} alt={currentPhoto.project} class="gallery-photo">
          </div>
          <div class = "description">
            <h1>{currentPhoto.project}</h1>
            <p class="date">{currentPhoto.date}</p>
            <h2>Technologies Used:</h2>
            <p class="tech-description">{currentPhoto.tech}</p>
            <h2>Description</h2>
            <p class="project-description">{currentPhoto.description}</p>
          </div>
        </div>
        <button type="button" class="side-button right-arrow" on:click={nextPhoto} aria-label="Next photo">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="#D5B8E2">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400-400 400Z"/>
          </svg>
        </button>
    </div>
  </div>
</main>

<footer>
  <p>Made with Timmy’s ❤️</p>
  <p>&copy; 2025 Timothy Ou</p>
</footer>

<style>
  :root {
    --nav-height: 136px;
    --footer-height: 100px;
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
    color:#7D73EC;
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
    padding-top: var(--nav-height);
    /* Set min-height to allow content to push footer down, 
       but not force scroll if content is short */
    min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  }

  .menu-button {
    display: none;
  }

  .hide-on-desktop-nav {
    display: flex;
  }

  .projects-content {
    flex-direction: row;
    align-items: center; /* Changed back to center for vertical alignment */
    justify-content: center;
    gap: 30px;
    padding: 20px;
    width: 100%;
    max-width: 1800px;
    /* Keeping original sizes as per your request */
    height: 100%;
    max-height: 950px; /* Keep this max-height */
    box-sizing: border-box;
  }

  .project-gallery {
    display: flex;
    width: 100%;
    height: 100%; /* Make it fill projects-content */
    background-color: #0A081D;
    border-radius: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .column-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:85%;
    /* Keeping original sizes as per your request */
    height: 95%; /* This means 95% of project-gallery's height (which is 100% of projects-content) */
    padding: 20px;
    box-sizing: border-box;
    border-radius: 40px;
    gap: 30px;
    /* Removed overflow: hidden from here */
  }

  .project-image {
    width: 100%;
    max-width: 1600px;
    /* Reduced image height slightly to make more room for text */
    height: 55%; 
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #E0E1DD;
    flex-shrink: 0;
  }

  .gallery-photo {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure image fits */
    border-radius: 32px;
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
    align-content: center;
    transform: translateX(5px);
  }

  .side-button:hover {
    background-color: #3f3b79;
  }

  .side-button svg {
    height: 48px;
    width: 48px;
    fill: #D5B8E2;
  }

  .description {
    width:100%;
    /* Increased description height slightly to give more room */
    height: 45%; 
    background-color: #16142A;
    border-radius: 32px;
    padding: 10px 20px;
    box-sizing: border-box;
    align-content: center;
    overflow-y: hidden; /* Ensure no scrollbar appears here */
  }

  /* --- Text size adjustments for desktop (no media query) --- */
  h1 {
    color: #BC95D1;
    font-family: "Titan One";
    font-size: 36px; /* Reduced from 40px */
    font-style: normal;
    font-weight: 400;
    line-height: 1.1; /* Reduced line height */
    margin-top: 0;
    margin-bottom: 0.1em; /* Reduced margin */
  }

  h2 {
    color: #D5B8E2;
    font-family: "Titan One";
    font-size: 28px; /* Reduced from 32px */
    font-style: normal;
    font-weight: 400;
    line-height: 1.1; /* Reduced line height */
    margin-top: 0.3em; /* Reduced margin */
    margin-bottom: 0.1em; /* Reduced margin */
  }

  p {
    color: #E0E1DD;
    font-weight: 600;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    line-height: 1.3; /* Reduced line height */
    margin-top: 0.3em; /* Reduced margin */
    margin-bottom: 0.4em; /* Reduced margin */
  }

  p.date {
    font-size: 20px; /* Reduced from 24px */
  }

  p.tech-description {
    font-size: 20px; /* Reduced from 24px */
  }

  p.project-description {
    font-size: 20px; /* Reduced from 24px */
  }

  @media (max-width: 1050px) {
    :root {
      --nav-height: 70px;
    }

    .hide-on-desktop-nav {
      display: none;
    }

    .menu-button {
      display: list-item;
    }

    .sidebar {
      display: flex;
      opacity: 95%;
      backdrop-filter: blur(10px);
    }

    nav ul {
      height: 70px;
    }

    nav li {
      height: 70px;
    }

    main {
      padding-top: var(--nav-height);
    }

    .projects-content {
      flex-direction: row;
      align-items: center;
      max-height: unset;
      height: auto;
      padding: 10px;
    }

    .project-gallery {
      flex-direction: row;
      height: auto;
      padding: 10px;
      gap: 10px;
    }

    .column-content {
      width: calc(100% - 140px);
      height: auto;
      padding: 10px;
      gap: 15px;
    }

    .project-image {
        height: auto;
    }

    .side-button {
      width: 50px;
      height: calc(100% - 20px);
      margin-bottom: 0;
      transform: translateX(0);
    }

    .side-button.left-arrow, .side-button.right-arrow {
      order: unset;
    }

    .side-button svg {
        height: 36px;
        width: 36px;
    }
  }

  @media (max-width: 768px) {
    nav li {
      padding: 0 10px;
    }

    nav a {
      font-size: 24px;
      padding: 0 15px;
    }

    nav li:first-child a {
      font-size: 26px;
      padding: 0 10px;
    }

    .sidebar li {
      width: 100%;
    }

    .sidebar a {
      font-size: 24px;
      padding: 0 20px;
    }

    h1 {
      font-size: 28px;
    }

    h2 {
      font-size: 22px;
    }

    p.date, p.tech-description, p.project-description {
      font-size: 18px;
    }

    .description {
      padding: 10px;
    }

    .column-content {
      width: calc(100% - 120px);
    }

    .side-button {
        width: 40px;
    }
  }

  @media (max-width: 500px) {
    nav li:first-child a {
      font-size: 20px;
    }

    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 18px;
    }

    p.date, p.tech-description {
      font-size: 15px;
    }

    p.project-description {
      font-size: 14px;
      line-height: 1.3;
    }

    .side-button {
      width: 35px;
      height: calc(100% - 10px);
    }
    .side-button svg {
        height: 30px;
        width: 30px;
    }

    .description {
      padding: 5px 10px;
    }
    .column-content {
      width: calc(100% - 90px);
      gap: 10px;
    }
  }

  @media (max-width: 350px) {
    h1 {
      font-size: 20px;
    }

    h2 {
      font-size: 16px;
    }

    p.date, p.tech-description {
      font-size: 13px;
    }

    p.project-description {
      font-size: 12px;
      line-height: 1.2;
    }
    .column-content {
      width: calc(100% - 80px);
    }
      .side-button {
      width: 30px;
    }
    .side-button svg {
        height: 24px;
        width: 24px;
    }
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

  @media (max-width: 768px) {
    footer {
      font-size: 1em;
      padding: 15px 0;
    }
  }

  @media (max-width: 500px) {
    footer {
      font-size: 0.9em;
      padding: 10px 0;
    }
  }
</style>