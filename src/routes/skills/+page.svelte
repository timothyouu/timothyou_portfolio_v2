<script>
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';

  let isSidebarOpen = false;
  let navCalculatedHeight = 136;
  let currentPath;

  const programmingLanguages = [
    'C++', 'Javascript', 'Python', 'HTML', 'CSS', 'R', 'Svelte', 'SvelteKit'
  ];
  const programmingTools = [
    'Git', 'GitHub', 'Linux', 'Visual Studio Code', 'SvelteKit', 'RStudio'
  ];
  const otherSkills = [
    'Problem Solving', 'Leadership', 'Teamwork', 'Communication', 'Collaboration', 'Adaptability', 'Mentoring', 'Marketing'
  ];

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
      G}
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
  <div class="skills-content">
    <div class="skill-category-section">
      <h1>Programming Languages & Frameworks</h1>
      <div class="skill-list-container">
        {#each programmingLanguages as skill (skill)}
          <div class="box-skill">
            <div class="inner-box">
              <p>{skill}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="skill-category-section">
      <h1>Programming Tools</h1>
      <div class="skill-list-container">
        {#each programmingTools as skill (skill)}
          <div class="box-skill">
            <div class="inner-box">
              <p>{skill}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="skill-category-section">
      <h1>Other Skills</h1>
      <div class="skill-list-container">
        {#each otherSkills as skill (skill)}
          <div class="box-skill">
            <div class="inner-box">
              <p>{skill}</p>
            </div>
          </div>
        {/each}
      </div>
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
    align-items: flex-start;
    width: 100%;
    flex-grow: 1;
    box-sizing: border-box;
    padding-top: var(--nav-height);
    padding-bottom: var(--footer-height);
    flex-direction: column; 
  }

  .menu-button {
    display: none;
  }

  .hide-on-desktop-nav {
    display: flex;
  }

  .skills-content {
    width: 90%; 
    max-width: 1200px; 
    margin: 40px auto; 
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .skill-category-section {
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: #BC95D1;
    font-family: "Titan One";
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 40px;
    flex-shrink: 0;
    text-align: center;
    margin-bottom: 40px;
  }

  .skill-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; 
    width: 100%;
    max-width: 1200px; 
  }

  .box-skill:hover {
    background-color: #0a081d75;
  }

  .box-skill {
    background-color: #0A081D;
    width: 225px;
    height: 225px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-box {
    background-color:#282450;
    width: 175px;
    height: 175px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    color: #BBB;
    font-family: "Titan One";
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin: 0;
    padding: 5px;
    word-break: break-word;
    box-sizing: border-box;
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

    h1 {
      font-size: 36px;
      height: auto;
      max-width: 90%;
      line-height: 1.2;
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

    .skills-content {
      width: 95%;
    }
  }
  
  @media (max-width: 500px) {
    h1 {
      font-size: 28px;
    }

    .box-skill {
      width: 180px;
      height: 180px;
    }

    .inner-box {
      width: 140px;
      height: 140px;
    }

    p {
      font-size: 20px;
    }

    .skill-list-container {
      gap: 10px;
    }
  }

  @media (max-width: 350px) {
    .box-skill {
        width: 150px;
        height: 150px;
    }
    .inner-box {
        width: 120px;
        height: 120px;
    }
    p {
        font-size: 18px;
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