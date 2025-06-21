<script>
</script>

<main>
  <div class= "home-content">
    <div class = "text-box">
      <h1 class = "home-title">Hello, I'm Timothy!!</h1>
      <h2 class = "home-subtitle">Computer Science Student @CSUF</h2>
      <h3 class = "list">List of Stuff I am</h3>
      <div class= "fun-facts">
        <h4 class = "fun-fact">🤝 I'm an Open Source and Marketing Board member @acmcsuf</h4>
        <h4 class = "fun-fact">🖥️ I play Valorant and Roblox in my free time</h4>
        <h4 class = "fun-fact">📸 I love taking pictures</h4>
      </div>
    </div>
    <img src="/timothyou1.png" alt="Timothy Ou">
  </div>
</main>

<style>
:global(html),
:global(body) {
  height: 100%;
  margin: 0;
  padding: 0;
}

:global(body) {
  background-color: #16142A;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.home-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  gap: 120px;
  padding: 20px;
  box-sizing: border-box;
}

.text-box {
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  flex-grow: 1;
  flex-shrink: 1;
  gap: 20px;
  min-width: 280px;
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
}

.home-title {
  color: #7D73EC;
  font-size: 72px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgba(0, 0, 0, 0.5);
}

.home-subtitle {
  color: #BC95D1;
  font-family: "Titan One";
  font-size: 56px;
  flex-shrink: 0;
  width: 680px;
  margin-top: -20px;
}

.list {
  color: #E0E1DD;
  font-family: Kanit;
  font-size: 48px;
  font-weight: 600;
  flex-shrink: 0;
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
  font-family: Kanit;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.2em;
  flex-shrink: 0;
}

img {
  width: 532px;
  aspect-ratio: 1 / 1;
  min-width: 250px;
  max-width: 100%;
  
  
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;
  
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

@media (max-width: 900px) {
  .home-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text-box {
    order: 1;
    flex-basis: auto;
    min-width: 100%;
    padding: 0 10px;
  }

  img {
    order: 2;
    flex-basis: auto;
    min-width: 250px;
    width: 100%;
    height: auto;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .home-title {
    font-size: 56px;
  }
  .home-subtitle {
    font-size: 40px;
    width: auto;
    margin-top: -10px;
  }
  .list, .fun-fact {
    font-size: 32px;
  }
}

@media (max-width: 500px) {
  .home-title {
    font-size: 40px;
  }
  .home-subtitle {
    font-size: 30px;
    margin-top: -5px;
  }
  .list, .fun-fact {
    font-size: 24px;
  }
  img {
    min-width: 180px;
  }
}
</style>