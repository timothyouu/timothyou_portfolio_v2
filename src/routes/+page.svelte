<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let isSidebarOpen = false;
  let navCalculatedHeight = 136;

  let whatIAmList = [
    "Timmy!",
    "2nd Year",
    "Aspiring SWE",
    "Open Source Board",
    "Marketing Board",
    "Eagle Scout",
    "Leetcoder",
    "Valorant Player",
    "Arsenal Sweat",
    "GAG Gardener",
    "Peripheral Enthusiast",
    "Photographer",
    "Smiski Collector 🤓",
    "Matcha Enjoyer ☕",
    "Silly 🪿",
    "Shrimp 🦐",
    "Famirry 🫶"
  ];
  let currentWhatIAmIndex = 0;
  let currentWhatIAm = whatIAmList[currentWhatIAmIndex];
  let intervalId;

  const textOpacity = tweened(1, {
    duration: 500,
    easing: cubicOut
  });

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


    intervalId = setInterval(() => {
      textOpacity.set(0, { duration: 200 }).then(() => { 
        currentWhatIAmIndex = (currentWhatIAmIndex + 1) % whatIAmList.length;
        currentWhatIAm = whatIAmList[currentWhatIAmIndex];
        textOpacity.set(1, { duration: 400 });
      });
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  onDestroy(() => {
    clearInterval(intervalId);
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
    <li><a href="#">Timothy Ou</a></li>
    <li class="hide-on-desktop-nav"><a href="#">Home</a></li>
    <li class="hide-on-desktop-nav"><a href="#">About</a></li>
    <li class="hide-on-desktop-nav"><a href="#">Projects</a></li>
    <li class="hide-on-desktop-nav"><a href="#">Skills</a></li>
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
  <div class="home-content">
    <div class="text-box">
      <h1 class="home-title">Hello, I'm Timothy!!</h1>
      <h2 class="home-subtitle"><span class="nowrap-phrase">Computer Science</span><br>Student @CSUF</h2>
      <h3 class="list" style="opacity: {$textOpacity};">{currentWhatIAm}</h3>
      <div class="fun-facts">
        <h4 class="fun-fact">🤝 I'm an Open Source and Marketing Board member @acmcsuf</h4>
        <h4 class="fun-fact">🖥️ I play Valorant and Roblox in my free time</h4>
        <h4 class="fun-fact">📸 I love taking pictures</h4>
      </div>
    </div>
    <img src="/timothyou1.png" alt="Timothy Ou" class="responsive-image-align">
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

  .home-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    padding: 20px;
    box-sizing: border-box;
    gap: 120px;
    flex: 1;
    height: auto;
  }

  .text-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 280px;
    max-width: 500px;
    gap: 20px;
    box-sizing: border-box;
  }

  .home-title,
  .home-subtitle,
  .list,
  .fun-fact {
    font-family: "Titan One";
    font-style: normal;
    font-weight: 400;
    line-height: 1.2em;
    margin: 0;
    max-width: 100%;
    box-sizing: border-box;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .home-title {
    color: #7D73EC;
    font-size: 72px;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  .home-subtitle {
    color: #BC95D1;
    font-family: "Titan One";
    font-size: 56px;
    margin-top: -20px;
    white-space: normal;
  }

  .home-subtitle .nowrap-phrase {
    white-space: nowrap;
    display: inline-block;
  }

  .list {
    color: #e0cbff;
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .fun-facts {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  .fun-fact {
    color: #E0E1DD;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    font-size: 48px;
    line-height: 1.2em;
  }

  img {
    flex: 1;
    min-width: 250px;
    max-width: 532px;
    aspect-ratio: 1 / 1;
    border: 10px solid #0A081D;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    background: url('/timothyou1.png') lightgray;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
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

    .home-content {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 60px;
      padding: 20px;
    }

    .text-box {
      order: 1;
      flex: unset;
      width: 100%;
      max-width: 600px;
      min-width: unset;
      padding: 0 10px;
    }

    .home-title {
      font-size: 56px;
    }

    .home-subtitle {
      font-size: 40px;
      margin-top: -10px;
    }

    .list {
      font-size: 32px;
      height: 70px;
    }

    img {
      order: 2;
      flex: unset;
      width: 80%;
      max-width: 400px;
      min-width: 250px;
      height: auto;
      align-self: center;
      margin-left: auto;
      margin-right: auto;
    }

    .list,
    .fun-fact {
      font-size: 32px;
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

    .home-content .responsive-image-align {
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  @media (max-height: 950px) {
    .home-title {
      font-size: 68px;
    }
    .home-subtitle {
      font-size: 52px;
    }
    .list,
    .fun-fact {
      font-size: 44px;
    }
    .home-content {
      gap: 100px;
    }
    img {
      max-width: 500px;
    }
  }

  @media (max-height: 850px) {
    .home-title {
      font-size: 60px;
    }
    .home-subtitle {
      font-size: 46px;
    }
    .list,
    .fun-fact {
      font-size: 38px;
    }
    .home-content {
      gap: 80px;
    }
    img {
      max-width: 420px;
    }
  }

  @media (max-height: 750px) {
    .home-title {
      font-size: 52px;
    }
    .home-subtitle {
      font-size: 40px;
      margin-top: -10px;
    }
    .list,
    .fun-fact {
      font-size: 32px;
    }
    .home-content {
      gap: 60px;
    }
    img {
      max-width: 350px;
    }
  }

  @media (max-height: 650px) {
    .home-content {
      gap: 40px;
      padding: 15px;
    }
    .home-title {
      font-size: 44px;
    }
    .home-subtitle {
      font-size: 32px;
      margin-top: -8px;
    }
    .list,
    .fun-fact {
      font-size: 26px;
    }
    img {
      max-width: 280px;
    }
    .text-box {
      gap: 15px;
    }
  }

  @media (max-height: 550px) {
    .home-content {
      gap: 25px;
      padding: 10px;
    }
    .home-title {
      font-size: 36px;
    }
    .home-subtitle {
      font-size: 26px;
      margin-top: -5px;
    }
    .list,
    .fun-fact {
      font-size: 20px;
    }
    img {
      max-width: 220px;
    }
    .text-box {
      gap: 10px;
    }
  }

  @media (max-height: 450px) {
    .home-content {
      gap: 10px;
      padding: 5px;
    }
    .home-title {
      font-size: 28px;
    }
    .home-subtitle {
      font-size: 20px;
      margin-top: -3px;
    }
    .list,
    .fun-fact {
      font-size: 16px;
    }
    img {
      max-width: 180px;
    }
    .text-box {
      gap: 5px;
    }
  }

  @media (max-width: 500px) {
    .home-title {
      font-size: 40px;
      white-space: normal;
      overflow: unset; 
      text-overflow: unset;
    }

    .home-subtitle {
      font-size: 30px;
      margin-top: -5px;
    }

    .list,
    .fun-fact {
      font-size: 24px;
    }

    img {
      min-width: 180px;
      width: 90%;
    }
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