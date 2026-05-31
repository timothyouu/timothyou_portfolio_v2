'use client'

import { LINKS, TOP_TRACKS } from '@/data/v2/config'
import { ASCII_DATA } from '@/data/v2/ascii-data'
import AsciiImage from './AsciiImage'
import TopBar from './TopBar'

export default function About({ goTo, setSettingsOpen }: { goTo: (p: string) => void; setSettingsOpen: (fn: (o: boolean) => boolean) => void }) {
  const L = LINKS;
  return (
    <div className="shell">
      <TopBar current="about" goTo={goTo} setSettingsOpen={setSettingsOpen} />

      {/* HI */}
      <section id="about-top" className="about-section about-hi">
        <div className="bio">
          <h1>hi, i'm timmy.</h1>
          <p>
            I like building things end-to-end that solve a real problem and leave some kind of impact.
            My interests span full-stack engineering, AI/ML, and product thinking.
          </p>
          <p className="muted">
            Right now I'm deep in multi-agent orchestration and AI tooling, hitting hackathons,
            and side-questing on whatever catches my attention that week.
          </p>
          <p className="muted">
            I think the best software has a sense of humor. Usually 80% caffeinated with matcha.
          </p>
        </div>
        <div className="portrait">
          <AsciiImage
            ascii={ASCII_DATA.portrait}
            caption="me"
            label="profile photo"
            width={340}
            height={340}
            defaultUrl="/uploads/ChatGPT Image May 30, 2026, 10_08_52 PM.png"
            revealUrl="/uploads/timothy_ou_pfp_sqr.jpg" />

        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="about-section">
        <h3>experience</h3>
        <div className="timeline">
          <div className="exp">
            <div className="when">Jan 2026 to Present</div>
            <div className="what">
              <div className="role">Embedded Tutor</div>
              <div className="org">California State University, Fullerton</div>
              <div className="blurb">Helping intro CS and C++ students debug and figure things out in real time</div>
            </div>
          </div>
          <div className="exp">
            <div className="when">Jun 2025 to Aug 2025</div>
            <div className="what">
              <div className="role">Technical Research Assistant</div>
              <div className="org">California Institute of Technology</div>
              <div className="blurb">Volunteer tech support and data work at the research lab</div>
            </div>
          </div>
          <div className="exp">
            <div className="when">Aug 2025 to Present</div>
            <div className="what">
              <div className="role">Campus Leader</div>
              <div className="org">Figma</div>
              <div className="blurb">Growing the design and tech community on campus through events
</div>
            </div>
          </div>
          <div className="exp">
            <div className="when">Mar 2026 to Present</div>
            <div className="what">
              <div className="role">ChatGPT Student Lab Member</div>
              <div className="org">OpenAI</div>
              <div className="blurb">One of 50 students exploring how AI shows up in student workflows</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="about-section">
        <h3>community</h3>
        <div className="community">
          <div className="card">
            <div className="role">Open Source Officer &middot; Marketing Officer</div>
            <div className="org">ACM, CSUF Chapter</div>
            <div className="blurb">Open source workshops and marketing that got people to show up</div>
          </div>
          <div className="card">
            <div className="role">Marketing &amp; Operations Officer</div>
            <div className="org">FullyHacks, CSUF&apos;s annual hackathon</div>
            <div className="blurb">Sponsorships, logistics, and the brand identity people remember</div>
          </div>
        </div>
      </section>

      {/* RAM */}
      <section id="ram" className="about-section">
        <h3>ram</h3>
        <div className="ram">
          <div className="col">
            <h4>games</h4>
            <ul>
              <li><span className="t">VALORANT</span><span className="s">tactical 5v5 &middot; main grind</span></li>
              <li><span className="t">Aim Labs</span><span className="s">flick warmup &middot; nightly</span></li>
              <li><span className="t">Roblox</span><span className="s">infinite hours, no regrets</span></li>
            </ul>
          </div>
          <div className="col">
            <h4>music</h4>
            <ul>
              {TOP_TRACKS.map((t, i) => <li key={i}>
                  <span className="t">{t.name}</span>
                  <span className="s">{t.artist}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="col">
            <h4>peripherals</h4>
            <ul>
              <li><span className="t">ULX Aceu</span><span className="s">mouse &middot; Lion</span></li>
              <li><span className="t">Wooting 60HE</span><span className="s">keyboard &middot; Gateron Magnetic Jade</span></li>
              <li><span className="t">Artisan Hien</span><span className="s">mousepad &middot; large &middot; soft</span></li>
              <li><span className="t">Moondrop Aria 2</span><span className="s">iems</span></li>
              <li><span className="t">Dell G2723H</span><span className="s">monitor &middot; 280Hz</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* LORE */}
      <section id="lore" className="about-section">
        <h3>lore</h3>

        <div className="lore-grid">
          {/* Row 1: wide + 3 normal = 5 units */}
          <AsciiImage ascii={ASCII_DATA.lore_o} caption="seattle skyline" label="scenic" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 10_04_31 PM.png" revealUrl="/uploads/space_needle2-ebececc4.jpg" revealPosition="center 15%" className="wide" />
          <AsciiImage ascii={ASCII_DATA.lore_g} caption="taco trip" label="friends" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 10_02_12 PM.png" revealUrl="/uploads/IMG_9129-2314c628.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_n} caption="teamlabs balls" label="scenic" defaultUrl="/uploads/balls-b97af91c.png" revealUrl="/uploads/balls-e2e8a6fe.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_h} caption="heytea run" label="friends" defaultUrl="/uploads/heytea_run-206cc889.png" revealUrl="/uploads/IMG_9035-2ce0c16b.jpg" revealPosition="center 50%" />
          {/* Row 2: wide + 3 normal = 5 units */}
          <AsciiImage ascii={ASCII_DATA.lore_u} caption="lahacks" label="hackathon" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 09_58_42 PM.png" revealUrl="/uploads/IMG_8830-8458d277.JPG" revealPosition="center 50%" className="wide" />
          <AsciiImage ascii={ASCII_DATA.lore_i} caption="heytea selfie" label="friends" defaultUrl="/uploads/heytea_selfie-2552d041.png" revealUrl="/uploads/heytea_gang-b66fcda1.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_v} caption="diamondhacks" label="hackathon" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 09_53_06 PM.png" revealUrl="/uploads/diamondhacks-ea5635d3.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_j} caption="photomatica" label="friends" defaultUrl="/uploads/photomatica-5bfb79ec.png" revealUrl="/uploads/photomatic-c91e334f.jpg" revealPosition="center 50%" />
          {/* Row 3: wide + 3 normal = 5 units */}
          <AsciiImage ascii={ASCII_DATA.lore_p} caption="uw cherry blossoms" label="scenic" defaultUrl="/uploads/cherryblossom-5e9c97c7.png" revealUrl="/uploads/uw_cherry_blossom2-39d93bd4.jpg" revealPosition="center 50%" className="wide" />
          <AsciiImage ascii={ASCII_DATA.lore_q} caption="field of light" label="scenic" defaultUrl="/uploads/field_of_lights-ece446d2.png" revealUrl="/uploads/light_field-8d968858.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_z} caption="figma boba" label="community" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 09_42_25 PM.png" revealUrl="/uploads/figma_boba-d79270c6.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_k} caption="devfest la" label="friends" defaultUrl="/uploads/google_devfest-e7e44f60.png" revealUrl="/uploads/google_devfest-850e6b52.jpg" revealPosition="center 50%" />
          {/* Row 4: normal + wide + 2 normal = 5 units */}
          <AsciiImage ascii={ASCII_DATA.lore_r} caption="lone cypress" label="scenic" defaultUrl="/uploads/lonetree-d6cb89ac.png" revealUrl="/uploads/lone_cypress-2054df0d.JPEG" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_t} caption="snoqualmie falls" label="scenic" defaultUrl="/uploads/snoqualmie_fall_ultra_sparse.png" revealUrl="/uploads/snoqualmie_falls-24f9860d.jpg" revealPosition="center 50%" className="wide" />
          <AsciiImage ascii={ASCII_DATA.lore_w} caption="calhacks :: sf" label="hackathon" defaultUrl="/uploads/ChatGPT Image May 30, 2026, 09_33_03 PM.png" revealUrl="/uploads/calhacks_group-bc254ff6.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_l} caption="color me mine" label="friends" defaultUrl="/uploads/colormemine-461fd114.png" revealUrl="/uploads/color_me_mine-cb36f579.jpg" revealPosition="center 50%" />
          {/* Row 5: normal + wide + wide = 5 units */}
          <AsciiImage ascii={ASCII_DATA.lore_s} caption="palace of fine arts" label="scenic" defaultUrl="/uploads/palace-ed2d0035.png" revealUrl="/uploads/palace2-3032b520.jpg" revealPosition="center 50%" />
          <AsciiImage ascii={ASCII_DATA.lore_m} caption="on the bus" label="friends" defaultUrl="/uploads/colorado_trip-977d27d0.png" revealUrl="/uploads/colorado_friends-86b3b37d.jpg" revealPosition="center 50%" className="wide" />
          <AsciiImage ascii={ASCII_DATA.lore_aa} caption="openai workshop" label="community" defaultUrl="/uploads/openai-e7d52668.png" revealUrl="/uploads/workshop_openai-f9208a43.jpg" revealPosition="center 50%" className="wide" />
        </div>
      </section>

      <footer className="foot">
        <div className="webring">
          <a href="https://webring-1.vercel.app/?from=timothyouu&dir=prev" aria-label="Previous site in webring">←</a>
          <span>© 2026 Timothy Ou</span>
          <a href="https://webring-1.vercel.app/?from=timothyouu&dir=next" aria-label="Next site in webring">→</a>
        </div>
        <div className="socials">
          <a href={L.github} target="_blank" rel="noopener">github</a>
          <a href={L.linkedin} target="_blank" rel="noopener">linkedin</a>
          <a href={L.x} target="_blank" rel="noopener">x</a>
          <a href={L.email}>email</a>
        </div>
      </footer>
    </div>);

}
