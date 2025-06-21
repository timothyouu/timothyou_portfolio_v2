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
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px dashed green;
}

.home-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 2px solid red;
}

.text-box {
  display: flex;
  flex-direction: column;
  border: 2px solid red;
}

.home-title {
  color: #7D73EC;
  font-family: "Titan One";
  font-size: 72px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  -webkit-text-stroke-width: 200px;
  -webkit-text-stroke-color: rgba(0, 0, 0, 0.00);
  width: 750px;
  align-items: center;
  border: 2px solid red;
  margin: 0;
}

.home-subtitle {
  color: #BC95D1;
  font-family: "Titan One";
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 641px;
  height: 130px;
  flex-shrink: 0;
  align-items: center;
  border: 2px solid red;
  margin: 0;
}

.list {
  color: #E0E1DD;
  font-family: Kanit;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 374px;
  height: 60px;
  flex-shrink: 0;
  align-items: center;
  border: 2px solid red;
  margin-bottom: 35px;
  margin-top: 20px;
}

.fun-facts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid red;
  width: fit-content;
}

.fun-fact {
  color: #E0E1DD;
  font-family: Kanit;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2em;
  width: 850px;
  flex-shrink: 0;
  border: 2px solid red;
  margin: 0;
}

img {
  width: 532px;
  height: 532px;
  flex-shrink: 0;
  border: 10px solid #0A081D;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: url(/timothyou1.png) lightgray;
  background-position: -116.252px -37.747px;
  background-size: 166.98% 111.086%;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
}
</style>