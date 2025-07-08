<script>
  import { onMount } from 'svelte';

  let isSidebarOpen = false;
  let navCalculatedHeight = 136;

  function toggleSidebar(event) {
    if (event) {
      event.preventDefault();
    }
    isSidebarOpen = !isSidebarOpen;
  }

  onMount(() => {
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
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Skills</a></li>
    </ul>
  {/if}

  <ul>
    <li><a href="/">Timothy Ou</a></li>
    <li class="hide-on-desktop-nav"><a href="/">Home</a></li>
    <li class="hide-on-desktop-nav"><a href="/about">About</a></li>
    <li class="hide-on-desktop-nav"><a href="/project">Projects</a></li>
    <li class="hide-on-desktop-nav"><a href="/skills">Skills</a></li>
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
  }

  nav a:hover {
    background-color: #16142A;
  }

  nav li:first-child {
    margin-right: auto;
  }

  nav li:first-child a {
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
    opacity: 95%;
    box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
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
  }

  .menu-button {
    display: none;
  }

  .hide-on-desktop-nav {
    display: flex;
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

    nav ul {
      height: 70px;
    }

    nav li {
      height: 70px;
    }

    main {
      padding-top: var(--nav-height);
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

    .sidebar {
      display: flex;
    }

    .sidebar li {
      width: 100%;
    }

    .sidebar a {
      font-size: 24px;
      padding: 0 20px;
    }
  }
  
  @media (max-height: 950px) {

  }

  @media (max-height: 850px) {
  
  }

  @media (max-height: 750px) {
    
  }

  @media (max-height: 650px) {
    
  }

  @media (max-height: 550px) {
    
  }

  @media (max-height: 450px) {
    
  }

  @media (max-width: 500px) {
    
  }

  @media (max-width: 350px) {
    .home-title {
      font-size: 32px;
    }

    .home-subtitle {
      font-size: 24px;
    }

    .list,
    .fun-fact {
      font-size: 20px;
    }

    .text-box {
      min-width: unset;
      padding: 0 5px;
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