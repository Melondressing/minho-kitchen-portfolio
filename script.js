import { siteContent } from "./content.js";

const savedContent = window.localStorage.getItem("minhoPortfolioContent");
const content = savedContent ? JSON.parse(savedContent) : siteContent;
const app = document.querySelector("#app");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const richText = (value) => escapeHtml(value).replaceAll("&lt;br /&gt;", "<br />");

const sectionHeading = (kicker, title) => `
  <div class="section-heading">
    <p class="kicker">${escapeHtml(kicker)}</p>
    <h2>${escapeHtml(title)}</h2>
  </div>
`;

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="${escapeHtml(content.meta.name)} home">${escapeHtml(content.meta.name)}</a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="#experience">Experience</a>
      <a href="#capabilities">Capabilities</a>
      <a href="#work-style">Work Style</a>
      <a href="#contact">Contact</a>
      <a class="editor-link" href="./options.html">Edit</a>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="kicker">${escapeHtml(content.meta.location)}</p>
        <h1 id="hero-title">${richText(content.hero.title)}</h1>
        <p class="hero-lede">${escapeHtml(content.hero.intro)}</p>
        <div class="hero-actions" aria-label="Primary actions">
          <a class="button button-dark" href="#experience">View career</a>
          <a class="button button-light" href="mailto:${escapeHtml(content.meta.email)}">Contact</a>
          <a class="button button-light" href="${escapeHtml(content.meta.resumeUrl)}" download>Download Resume</a>
        </div>
      </div>

      <div class="hero-visual" aria-label="Kitchen portfolio visual">
        <div class="plate-mark">
          <span>${escapeHtml(content.hero.visualLabel)}</span>
          <strong>${escapeHtml(content.hero.visualTitle)}</strong>
        </div>
        <div class="service-strip">
          ${content.hero.serviceTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="profile section-band" aria-labelledby="profile-title">
      <p class="kicker">${escapeHtml(content.profile.kicker)}</p>
      <h2 id="profile-title">${escapeHtml(content.profile.title)}</h2>
    </section>

    <section class="experience section-band" id="experience" aria-labelledby="experience-title">
      ${sectionHeading(content.experience.kicker, content.experience.title)}
      <div class="timeline">
        ${content.experience.items
          .map(
            (item) => `
              <article class="timeline-item ${item.current ? "current" : ""}">
                <time>${escapeHtml(item.date)}</time>
                <div>
                  <h3>${escapeHtml(item.place)}</h3>
                  <p class="role">${escapeHtml(item.role)}</p>
                  <p>${escapeHtml(item.detail)}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="featured" aria-labelledby="featured-title">
      <div class="featured-copy">
        <p class="kicker">${escapeHtml(content.featured.kicker)}</p>
        <h2 id="featured-title">${escapeHtml(content.featured.title)}</h2>
        <p>${escapeHtml(content.featured.detail)}</p>
      </div>
      <div class="feature-grid">
        ${content.featured.items
          .map(
            (item) => `
              <article>
                <span>${escapeHtml(item.number)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.detail)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="capabilities section-band" id="capabilities" aria-labelledby="capabilities-title">
      ${sectionHeading(content.capabilities.kicker, content.capabilities.title)}
      <div class="capability-list">
        ${content.capabilities.items
          .map(
            (item) => `
              <article>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.detail)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="selected-work" aria-labelledby="selected-work-title">
      ${sectionHeading(content.selectedWork.kicker, content.selectedWork.title)}
      <div class="work-grid">
        ${content.selectedWork.items
          .map(
            (item) => `
              <article class="work-tile">
                <div class="tile-image ${escapeHtml(item.style)}" aria-hidden="true"></div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.detail)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="work-style section-band" id="work-style" aria-labelledby="work-style-title">
      <p class="kicker">${escapeHtml(content.workStyle.kicker)}</p>
      <h2 id="work-style-title">${escapeHtml(content.workStyle.title)}</h2>
      <div class="steps">
        ${content.workStyle.items
          .map(
            (item) => `
              <article>
                <span>${escapeHtml(item.number)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.detail)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="education section-band" aria-labelledby="education-title">
      <p class="kicker">${escapeHtml(content.education.kicker)}</p>
      <h2 id="education-title">${escapeHtml(content.education.title)}</h2>
      <p>${escapeHtml(content.education.detail)}</p>
    </section>
  </main>

  <footer class="footer" id="contact">
    <p class="kicker">${escapeHtml(content.footer.kicker)}</p>
    <h2>${escapeHtml(content.footer.title)}</h2>
    <div class="footer-links">
      <a href="mailto:${escapeHtml(content.meta.email)}">${escapeHtml(content.meta.email)}</a>
      <a href="${escapeHtml(content.meta.resumeUrl)}" download>Download Resume</a>
      <span>${escapeHtml(content.meta.region)}</span>
    </div>
  </footer>
`;

document.documentElement.classList.add("js-ready");
