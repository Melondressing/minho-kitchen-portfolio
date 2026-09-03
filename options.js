import { siteContent } from "./content.js";

const storageKey = "minhoPortfolioContent";
const form = document.querySelector("#contentForm");
const status = document.querySelector("#editorStatus");
const saved = window.localStorage.getItem(storageKey);
let content = saved ? JSON.parse(saved) : structuredClone(siteContent);

const fields = [
  ["meta.name", "Name", "input"],
  ["meta.location", "Location", "input"],
  ["meta.email", "Email", "input"],
  ["meta.region", "Footer region", "input"],
  ["meta.resumeUrl", "Resume file path", "input"],
  ["hero.title", "Hero title", "input"],
  ["hero.intro", "Hero intro", "textarea"],
  ["hero.visualLabel", "Hero visual label", "input"],
  ["hero.visualTitle", "Hero visual title", "input"],
  ["hero.media.type", "Hero media type: graphic, image, or video", "select"],
  ["hero.media.src", "Hero media path or URL", "input"],
  ["hero.media.poster", "Hero video poster path", "input"],
  ["hero.media.alt", "Hero media alt text", "input"],
  ["profile.title", "Profile statement", "textarea"],
  ["experience.title", "Experience heading", "input"],
  ["featured.title", "Featured title", "input"],
  ["featured.detail", "Featured detail", "textarea"],
  ["capabilities.title", "Capabilities heading", "input"],
  ["selectedWork.title", "Selected work heading", "input"],
  ["workStyle.title", "Work style heading", "input"],
  ["education.title", "Education title", "input"],
  ["education.detail", "Education detail", "input"],
  ["footer.title", "Footer headline", "textarea"]
];

content.experience.items.forEach((_, index) => {
  fields.push([`experience.items.${index}.date`, `Experience ${index + 1} date`, "input"]);
  fields.push([`experience.items.${index}.place`, `Experience ${index + 1} place`, "input"]);
  fields.push([`experience.items.${index}.role`, `Experience ${index + 1} role`, "input"]);
  fields.push([`experience.items.${index}.detail`, `Experience ${index + 1} detail`, "textarea"]);
});

content.capabilities.items.forEach((_, index) => {
  fields.push([`capabilities.items.${index}.title`, `Capability ${index + 1} title`, "input"]);
  fields.push([`capabilities.items.${index}.detail`, `Capability ${index + 1} detail`, "textarea"]);
});

content.workStyle.items.forEach((_, index) => {
  fields.push([`workStyle.items.${index}.title`, `Work style ${index + 1} title`, "input"]);
  fields.push([`workStyle.items.${index}.detail`, `Work style ${index + 1} detail`, "textarea"]);
});

content.selectedWork.items.forEach((_, index) => {
  fields.push([`selectedWork.items.${index}.title`, `Selected work ${index + 1} title`, "input"]);
  fields.push([`selectedWork.items.${index}.detail`, `Selected work ${index + 1} detail`, "textarea"]);
  fields.push([`selectedWork.items.${index}.media.type`, `Selected work ${index + 1} media type`, "select"]);
  fields.push([`selectedWork.items.${index}.media.src`, `Selected work ${index + 1} media path or URL`, "input"]);
  fields.push([`selectedWork.items.${index}.media.poster`, `Selected work ${index + 1} video poster path`, "input"]);
  fields.push([`selectedWork.items.${index}.media.alt`, `Selected work ${index + 1} media alt text`, "input"]);
});

const keyFor = (key) => (Number.isNaN(Number(key)) ? key : Number(key));

const getValue = (path) => path.split(".").reduce((value, key) => value?.[keyFor(key)], content);

const setValue = (path, nextValue) => {
  const keys = path.split(".");
  const finalKey = keyFor(keys.pop());
  const target = keys.reduce((value, key) => value[keyFor(key)], content);
  target[finalKey] = nextValue;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const fieldMarkup = ([path, label, type]) => `
  <label class="editor-field">
    <span>${escapeHtml(label)}</span>
    ${
      type === "textarea"
        ? `<textarea name="${escapeHtml(path)}" rows="4">${escapeHtml(getValue(path))}</textarea>`
        : type === "select"
          ? `<select name="${escapeHtml(path)}">
              ${["graphic", "image", "video"]
                .map((option) => `<option value="${option}" ${getValue(path) === option ? "selected" : ""}>${option}</option>`)
                .join("")}
            </select>`
        : `<input name="${escapeHtml(path)}" value="${escapeHtml(getValue(path))}" />`
    }
  </label>
`;

const renderForm = () => {
  form.innerHTML = fields.map(fieldMarkup).join("");
};

const readForm = () => {
  const formData = new FormData(form);
  fields.forEach(([path]) => setValue(path, formData.get(path) ?? ""));
};

document.querySelector("#saveButton").addEventListener("click", () => {
  readForm();
  window.localStorage.setItem(storageKey, JSON.stringify(content));
  status.textContent = "Saved. Open the site again to preview your edits.";
});

document.querySelector("#exportButton").addEventListener("click", () => {
  readForm();
  const fileBody = `export const siteContent = ${JSON.stringify(content, null, 2)};\n`;
  const blob = new Blob([fileBody], { type: "text/javascript" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "content.js";
  link.click();
  URL.revokeObjectURL(link.href);
  status.textContent = "Exported content.js. Replace the project content.js file with it before rebuilding.";
});

document.querySelector("#resetButton").addEventListener("click", () => {
  window.localStorage.removeItem(storageKey);
  content = structuredClone(siteContent);
  renderForm();
  status.textContent = "Reset to the original project content.";
});

renderForm();
