const desktop = document.querySelector("#desktop");
const mainWindow = document.querySelector("#main-window");
const toast = document.querySelector("#toast");
const dialog = document.querySelector("#preview-dialog");
const previewBody = dialog.querySelector(".preview-body");
const sectionContent = mainWindow.querySelector(".window-content");
const homeContent = sectionContent.innerHTML;
let toastTimer;
let topZIndex = 5;
const explorerNavigation = { current: null, back: [], forward: [] };

const appContent = {
  brands: {
    title: "Markalar",
    eyebrow: "GÖRSEL PRODÜKSİYON / SEÇİLİ MARKA İŞLERİ",
    heading: "Markalarla<br><span>görsel hikâyeler.</span>",
    copy: "Berkin Üregen'in Behance portföyünde yayımlanan görsel projelerden seçkiler. Her klasörde proje görseli ve Behance sayfasına bağlantı var.",
    cards: ["LARA FABIAN", "GAME ZONE GAME ON", "AMAZON CONNECT 2025", "HEPSİBURADA ŞAHANE KASIM", "STELLA ARTOIS", "ESAS"],
  },
  about: {
    title: "DART hakkında",
    eyebrow: "DART MUSIC CO. / MÜZİK & GÖRÜNTÜ",
    heading: "Sanatçıya ve<br><span>hikâyeye alan aç.</span>",
    copy: "DART Music Co. çatısı altında sanatçı yönetimi, canlı müzik organizasyonu ve görüntü prodüksiyonu bir araya geliyor. Müzik tarafında Batuhan Kordel ve Melis Karaduman; görüntü tarafında Behance portföyü ve Melis Karaduman ile BizBize Live.",
    cards: ["Sanatçı yönetimi & müzik", "Konser ve canlı etkinlik", "Görüntü prodüksiyonu", "BizBize Live — YouTube"],
  },
};

const eventPoster = "https://cdn.bubilet.com.tr/files/Etkinlik/batuhan-kordel-konseri-14277.png";
const imageUrl = (id, width = 900) => id.startsWith("http")
  ? id
  : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const behanceProjects = [
  { id: "250031721", slug: "LARA-FABIAN", name: "LARA FABIAN", image: "https://mir-s3-cdn-cf.behance.net/projects/404/8f3994250031721.Y3JvcCwzNzg4LDI5NjMsODgxLDQ5Nw.jpg" },
  { id: "250026153", slug: "OD-BAND", name: "OD BAND", image: "https://mir-s3-cdn-cf.behance.net/projects/404/2f998d250026153.Y3JvcCwzNDczLDI3MTYsMCwxMzMy.jpg" },
  { id: "249937885", slug: "GAME-ZONE-GAME-ON", name: "GAME ZONE GAME ON", image: "https://mir-s3-cdn-cf.behance.net/projects/404/6d17c8249937885.Y3JvcCw1MTEzLDQwMDAsNTQ0LDA.jpg" },
  { id: "249937675", slug: "ESAS", name: "ESAS", image: "https://mir-s3-cdn-cf.behance.net/projects/404/191832249937675.Y3JvcCwzNzcxLDI5NDksMCw1MDQ.jpg" },
  { id: "249937105", slug: "AMAZON-CONNECT-2025", name: "AMAZON CONNECT 2025", image: "https://mir-s3-cdn-cf.behance.net/projects/404/331f7c249937105.Y3JvcCw1MTEzLDQwMDAsNDA1LDA.jpg" },
  { id: "249936743", slug: "HEPSBURADA-SAHANE-KASIM", name: "HEPSİBURADA ŞAHANE KASIM", image: "https://mir-s3-cdn-cf.behance.net/projects/404/2dbf9e249936743.Y3JvcCwzMTI4LDI0NDYsMTIwMCw1OTY.jpg" },
  { id: "249935993", slug: "STELLA-ARTOIS", name: "STELLA ARTOIS", image: "https://mir-s3-cdn-cf.behance.net/projects/404/4fed8e249935993.Y3JvcCwxODAwLDE0MDgsNTU3LDU3MA.jpg" },
  { id: "164174145", slug: "Halloween-Night-Portraits", name: "Halloween Night Portraits", image: "https://mir-s3-cdn-cf.behance.net/projects/404/62a766164174145.Y3JvcCwxMjQ2LDk3NCwxNTEsODM.jpg" },
];

const bizBizeVideo = {
  type: "youtube",
  name: "Akdeniz — Melis Karaduman & Erhan Güleryüz",
  kind: "BizBize Live · Canlı performans",
  videoId: "C2euJZxBJfg",
  image: "https://img.youtube.com/vi/C2euJZxBJfg/hqdefault.jpg",
};

const bizBizeEpisodes = [["h7lUFCpnMX8", "Sattas - Eskitilmiş"], ["iQyO5rFCP4U", "Caner Karamukluoğlu (TNK) - Aşkı Harcamanın 80 Yolu"], ["vY8Z_BoGY14", "Sakinleştim"], ["1AJaz0kyHIE", "Göksu Taşçeviren (Sufle) - İçinde Aşk Var"], ["whdJ96NepD8", "Fikri Karayel - Hayal Edemezsin"], ["be-_0V_z5dw", "Ateşi Yak feat Canay Doğan"], ["isMRQKrl4h8", "Özgün - Zilli"], ["zgVUNfpMkHQ", "Özgün - Elveda"], ["FBDpF12DtZo", "Denedim (Lucid Dreams)"], ["HQBdTuZfUP4", "Canay Doğan - Durma"], ["zX6ASnhIFQA", "Kaçmalıyım Burdan"], ["b7Qfkxy6gRQ", "Yanlış Biriyle Doğru Hikaye"], ["71R9oe2Z5Dk", "Yalnızlık Senfonisi"], ["9AFaPci6szE", "Akif Alkan (Mavi Gri) - Dünyanın En Güzel Kızı"], ["EzwfB60ZBj8", "Akif Alkan (Mavi Gri) - Sebastian"], ["bJFWdlbgx_0", "Akif Alkan (Mavi Gri) - Sana En İyi Ben Bakarım"], ["8lvAHfUP6So", "Batuhan Kordel - Sıcak Şarap"], ["23pqiB_Kr7g", "Batuhan Kordel - Anıları Sakla"], ["KA4XRGReRUk", "Eksik"], ["ER4sDP9wDA4", "Maya Perest - Yok Bana Bu Cihanda"], ["MqBYkjD95yw", "Habibi"], ["yLASwTgTUvc", "Birkan Nasuhoğlu - Anlat Ona"], ["bVIDZzt8d5c", "Birkan Nasuhoğlu - Yollar Bitmez"], ["KIPud9kGKCo", "Gülçin Ergül - Hoşgeldin"], ["bFMg5t3kWG4", "Bu Sabahların Bir Anlamı Olmalı (VEGA)"], ["1Ph42VDl68A", "Eftalya Yağcı - İstanbul İstanbul Olalı (Sezen Aksu)"], ["UYYjUec-mGw", "İsa Özkocaman - İki Yabancı"], ["o0SF9PkMYoU", "Ben Nasıl Büyük Adam Olucam"], ["8VdvC1H7thA", "Anıl Erdem Cevizci - Sen Ya Da Hiç (Madrigal)"], ["nMq_CYvlnKg", "Köleler ve Kilitler (Peyk)"], ["WuRPuUGDU_U", "Kalbimden Tenime (Can Ozan)"], ["Yd-VSAaWOhw", "Gökçe - Ne Yapardım"], ["1oEahH0oXiU", "Sonum Ol"], ["XL308mtJ5qU", "Gökçe - Her Şey Bitmedi Bitemez"], ["_MlSzPonRUs", "Selin Genç - Kaçın Kurası"], ["NZ8vg0ACOd0", "Selin Genç - Sevdanın 4 Hali"], ["C2euJZxBJfg", "Erhan Güleryüz (AYNA) - Akdeniz"], ["G4XN9o1sTXU", "Umut Kaya - Mor Yazma"], ["Ukp3bt5_69A", "Erhan Güleryüz (AYNA) - Severek Ayrılanlar"]];

const workFolders = [
  {
    id: "bizbize-live",
    name: "BizBize Live",
    kind: "Canlı performans serisi · YouTube",
    date: "Video prodüksiyonu",
    cover: bizBizeVideo.image,
    description: "Melis Karaduman ile BizBize Live; canlı müzik performanslarını ve konuk sanatçıları bir araya getiren YouTube serisi.",
    link: "https://www.youtube.com/playlist?list=PL4WjfUXEtNlcYg6IY8SNMAW0PLTAyAjWP",
    files: [
      ...bizBizeEpisodes.map(([videoId, name]) => ({ type: "youtube", name, kind: "BizBize Live · YouTube", videoId, image: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` })),
      { type: "link", name: "BizBize Live — Tüm bölümler ↗", kind: "YouTube oynatma listesi", image: bizBizeVideo.image, href: "https://www.youtube.com/playlist?list=PL4WjfUXEtNlcYg6IY8SNMAW0PLTAyAjWP" },
    ],
  },
  ...behanceProjects.map((project) => ({
    id: `behance-${project.id}`,
    name: project.name,
    kind: "Görsel portföy · Behance",
    date: "Portföy projesi",
    cover: project.image,
    description: `${project.name} — Berkin Üregen'in Behance portföyünde yayımlanan proje.`,
    link: `https://www.behance.net/gallery/${project.id}/${project.slug}`,
    files: [
      { type: "image", name: `${project.name} — Proje kapağı.jpg`, kind: "Behance proje görseli", image: project.image },
      ...(window.behanceMedia?.[project.id] || []).slice(0, 30).map((file, index) => ({
        type: "image",
        name: `${project.name} — ${String(index + 1).padStart(2, "0")}.jpg`,
        kind: "Behance proje görseli",
        image: `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/${file}`,
      })),
      { type: "link", name: `${project.name} — Behance projesini aç ↗`, kind: "Berkin Üregen · Behance", image: project.image, href: `https://www.behance.net/gallery/${project.id}/${project.slug}` },
    ],
  })),
];

const musicFolders = [
  {
    id: "batuhan-kordel",
    name: "Batuhan Kordel",
    kind: "Sanatçı · akustik konser serisi",
    date: "Sanatçı",
    cover: "https://img.youtube.com/vi/oCQMj4MleuQ/hqdefault.jpg",
    files: [
      { type: "youtube", name: "Anıları Sakla — Official Video", kind: "Müzik videosu · YouTube", videoId: "oCQMj4MleuQ", image: "https://img.youtube.com/vi/oCQMj4MleuQ/hqdefault.jpg" },
      { type: "youtube", name: "Dik Yokuşum", kind: "Müzik videosu · YouTube", videoId: "4HYXDJ2aHcI", image: "https://img.youtube.com/vi/4HYXDJ2aHcI/hqdefault.jpg" },
      { type: "youtube", name: "Teşekkür — Lyric Video", kind: "Lyric video · YouTube", videoId: "LTrzNNAuoDE", image: "https://img.youtube.com/vi/LTrzNNAuoDE/hqdefault.jpg" },
    ],
  },
  {
    id: "melis-karaduman",
    name: "Melis Karaduman",
    kind: "Sanatçı · pop",
    date: "Sanatçı",
    cover: "https://img.youtube.com/vi/Xxynykjepbs/hqdefault.jpg",
    files: [
      { type: "youtube", name: "Gece ve Gündüz — Official Music Video", kind: "Müzik videosu · YouTube", videoId: "Xxynykjepbs", image: "https://img.youtube.com/vi/Xxynykjepbs/hqdefault.jpg" },
      { type: "youtube", name: "Yanar — Official Music Video", kind: "Müzik videosu · YouTube", videoId: "4cZAihZqCVk", image: "https://img.youtube.com/vi/4cZAihZqCVk/hqdefault.jpg" },
      { type: "youtube", name: "bizdenbaşka. — Official Visualizer", kind: "Official visualizer · YouTube", videoId: "SteYqpvHF5U", image: "https://img.youtube.com/vi/SteYqpvHF5U/hqdefault.jpg" },
      { type: "youtube", name: bizBizeVideo.name, kind: bizBizeVideo.kind, videoId: bizBizeVideo.videoId, image: bizBizeVideo.image },
      { type: "link", name: "BizBize Live — Tüm bölümler ↗", kind: "YouTube oynatma listesi", image: bizBizeVideo.image, href: "https://www.youtube.com/playlist?list=PL4WjfUXEtNlcYg6IY8SNMAW0PLTAyAjWP" },
      { type: "link", name: "Melis Karaduman — Resmî YouTube kanalı ↗", kind: "Sanatçı kanalı", image: "https://img.youtube.com/vi/Xxynykjepbs/hqdefault.jpg", href: "https://www.youtube.com/@MelisKaraduman" },
    ],
  },
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function bringToFront() {
  mainWindow.style.zIndex = String(++topZIndex);
  mainWindow.classList.add("is-focused");
}

function resetMainContent() {
  sectionContent.innerHTML = homeContent;
  sectionContent.querySelectorAll(".filter-chip").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === "all");
  });
  sectionContent.querySelectorAll(".project-card").forEach((card) => { card.hidden = false; });
}

function openApp(appName) {
  if (appName === "home") {
    mainWindow.classList.remove("is-minimized", "is-hidden");
    resetMainContent();
    mainWindow.querySelector(".window-title").textContent = "DART®  /  studio.index";
    bringToFront();
    return;
  }
  if (appName === "work" || appName === "music") {
    explorerNavigation.current = { root: appName, folderId: null };
    explorerNavigation.back = [];
    explorerNavigation.forward = [];
    mainWindow.classList.remove("is-minimized", "is-hidden");
    renderExplorer();
    bringToFront();
    return;
  }

  const app = appContent[appName];
  if (!app) return;
  mainWindow.classList.remove("is-minimized", "is-hidden");
  sectionContent.innerHTML = `
    <section class="app-page">
      <div class="eyebrow"><span class="eyebrow-dot"></span> ${app.eyebrow}</div>
      <h1>${app.heading}</h1>
      <p class="intro-copy">${app.copy}</p>
      <div class="app-list">
        ${app.cards.map((item, index) => `
          <button class="app-list-item" type="button" data-item="${item}">
            <span class="app-list-number">0${index + 1}</span>
            <span>${item}</span>
            <span class="project-arrow">↗</span>
          </button>
        `).join("")}
      </div>
      <div class="app-note"><span class="eyebrow-dot"></span> PROTOTİP İÇERİĞİ — GERÇEK İSİMLER VE İŞLER YAKINDA</div>
      <button class="text-link app-back" type="button">← TÜM İŞLERİ GÖR</button>
    </section>
  `;
  mainWindow.querySelector(".window-title").textContent = `DART®  /  ${appName}.index`;
  mainWindow.querySelectorAll(".app-list-item").forEach((item) => {
    item.addEventListener("click", () => showToast(item.dataset.item));
  });
  mainWindow.querySelector(".app-back").addEventListener("click", () => openApp("home"));
  bringToFront();
}

function getExplorerRoot(root) {
  return root === "music"
    ? { name: "Dart Music Co", items: musicFolders, description: "SANATÇI · RESMİ VİDEOLAR" }
    : { name: "Dart Media Co", items: workFolders, description: "VİDEO · GÖRSEL PRODÜKSİYON" };
}

function renderExplorer() {
  const { root, folderId } = explorerNavigation.current;
  const rootData = getExplorerRoot(root);
  const folder = folderId ? rootData.items.find((item) => item.id === folderId) : null;
  const items = folder ? folder.files : rootData.items;
  const locationName = folder ? folder.name : rootData.name;
  const itemCount = items.length;
  const sourceLabel = root === "music"
    ? "KAYNAK: SANATÇI YOUTUBE KANALLARI"
    : folder?.id.startsWith("behance-")
      ? "KAYNAK: BEHANCE · BERKİN ÜREGEN"
      : folder?.id === "bizbize-live"
        ? "KAYNAK: MELİS KARADUMAN · YOUTUBE"
        : "KAYNAK: BEHANCE · YOUTUBE";

  const breadcrumbs = `
    <button class="path-crumb" type="button" data-path-root="${root}">${rootData.name}</button>
    ${folder ? `<span class="path-separator">/</span><span class="path-crumb is-current">${folder.name}</span>` : ""}
  `;
  const content = items.map((item, index) => folder
    ? renderMediaItem(item, index)
    : renderFolderItem(item, root)).join("");

  sectionContent.innerHTML = `
    <section class="explorer" aria-label="${locationName} klasör içeriği">
      <div class="explorer-toolbar">
        <div class="explorer-nav">
          <button class="explorer-control" type="button" data-history="back" aria-label="Geri" ${explorerNavigation.back.length ? "" : "disabled"}>←</button>
          <button class="explorer-control" type="button" data-history="forward" aria-label="İleri" ${explorerNavigation.forward.length ? "" : "disabled"}>→</button>
          <button class="explorer-control explorer-up" type="button" data-history="up" aria-label="Üst klasöre git" ${folder ? "" : "disabled"}>↑</button>
        </div>
        <div class="explorer-path" aria-label="Klasör yolu">${breadcrumbs}</div>
        <label class="explorer-search">
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Bu klasörde ara" aria-label="Bu klasörde ara" />
        </label>
        <button class="explorer-control view-toggle" type="button" data-view-toggle aria-label="Liste görünümüne geç" title="Görünümü değiştir">☷</button>
      </div>

      <div class="explorer-heading">
        <div>
          <div class="eyebrow"><span class="eyebrow-dot"></span> DART DRIVE / ${rootData.description}</div>
          <h2>${locationName}<span class="explorer-heading-count">${String(itemCount).padStart(2, "0")}</span></h2>
        </div>
        <span class="explorer-folder-label">${folder ? folder.kind : `${itemCount} KLASÖR`}</span>
      </div>

      ${folder ? `
        <div class="folder-summary">
          <span class="folder-summary-icon">${root === "music" ? "♫" : "▧"}</span>
          <span><strong>${folder.name}</strong><small>${folder.kind} · ${folder.date}${folder.description ? ` · ${folder.description}` : ""}</small></span>
          <span class="folder-summary-status"><span></span> DART MUSIC CO.</span>
        </div>
      ` : ""}

      <div class="file-grid${folder ? " is-media-grid" : ""}">
        ${content}
      </div>
      <footer class="explorer-status">
        <span>${itemCount} öğe</span>
        <span><span class="eyebrow-dot"></span> ${sourceLabel}</span>
      </footer>
    </section>
  `;
  mainWindow.querySelector(".window-title").textContent = `DART®  /  ${root}${folder ? `/${folder.id}` : ""}`;
}

function renderFolderItem(folder, root) {
  return `
    <button class="file-item folder-item" type="button" data-folder-id="${folder.id}" data-search="${`${folder.name} ${folder.kind}`.toLocaleLowerCase("tr")}">
      <span class="file-preview folder-preview">
        <img src="${imageUrl(folder.cover, 560)}" alt="" loading="lazy" />
        <span class="folder-preview-icon"><span></span></span>
        <span class="folder-preview-count">${folder.files.length} ÖĞE</span>
      </span>
      <span class="file-name">${folder.name}</span>
      <span class="file-meta">${root === "music" ? "SANATÇI" : folder.kind.toLocaleUpperCase("tr")} <span>${folder.date}</span></span>
    </button>
  `;
}

function renderMediaItem(item, index) {
  const imageId = item.image || item.poster;
  const preview = item.type === "audio"
    ? `<span class="audio-art"><img src="${imageUrl(imageId, 560)}" alt="" loading="lazy" /><span>♫</span></span>`
    : `<span class="file-preview"><img src="${imageUrl(imageId, 560)}" alt="" loading="lazy" />${["video", "youtube"].includes(item.type) ? '<span class="media-play">▶</span>' : '<span class="image-zoom">↗</span>'}</span>`;
  const extension = ["video", "youtube"].includes(item.type) ? "VIDEO" : item.type === "audio" ? "AUDIO" : item.type === "link" ? "LINK" : "IMAGE";
  return `
    <button class="file-item media-item ${item.type}-item" type="button" data-media-index="${index}" data-search="${`${item.name} ${item.kind}`.toLocaleLowerCase("tr")}">
      ${preview}
      <span class="file-name">${item.name}</span>
      <span class="file-meta">${extension} <span>${item.kind.split("·").at(-1).trim()}</span></span>
    </button>
  `;
}

function navigateExplorer(nextLocation, addToHistory = true) {
  if (addToHistory && explorerNavigation.current) {
    explorerNavigation.back.push(explorerNavigation.current);
    explorerNavigation.forward = [];
  }
  explorerNavigation.current = nextLocation;
  renderExplorer();
}

function handleExplorerClick(event) {
  const folderButton = event.target.closest("[data-folder-id]");
  if (folderButton) {
    navigateExplorer({ root: explorerNavigation.current.root, folderId: folderButton.dataset.folderId });
    return;
  }

  const pathButton = event.target.closest("[data-path-root]");
  if (pathButton) {
    navigateExplorer({ root: pathButton.dataset.pathRoot, folderId: null });
    return;
  }

  const mediaButton = event.target.closest("[data-media-index]");
  if (mediaButton) {
    const { root, folderId } = explorerNavigation.current;
    const folder = getExplorerRoot(root).items.find((item) => item.id === folderId);
    const item = folder.files[Number(mediaButton.dataset.mediaIndex)];
    if (item.type === "image") openMediaPreview(item, folder.files.filter((file) => file.type === "image"));
    else openMediaPreview(item);
    return;
  }

  if (event.target.closest("[data-view-toggle]")) {
    const grid = sectionContent.querySelector(".file-grid");
    grid.classList.toggle("is-list");
    event.target.closest("[data-view-toggle]").setAttribute(
      "aria-label",
      grid.classList.contains("is-list") ? "Izgara görünümüne geç" : "Liste görünümüne geç",
    );
    return;
  }

  const historyButton = event.target.closest("[data-history]");
  if (!historyButton || historyButton.disabled) return;
  const direction = historyButton.dataset.history;
  if (direction === "up") {
    navigateExplorer({ root: explorerNavigation.current.root, folderId: null });
    return;
  }
  const from = direction === "back" ? explorerNavigation.back : explorerNavigation.forward;
  const to = direction === "back" ? explorerNavigation.forward : explorerNavigation.back;
  const previous = from.pop();
  if (previous) {
    to.push(explorerNavigation.current);
    navigateExplorer(previous, false);
  }
}

function filterProjects(event) {
  const selectedFilter = event.currentTarget.dataset.filter;
  mainWindow.querySelectorAll(".filter-chip").forEach((button) => {
    button.classList.toggle("is-active", button === event.currentTarget);
  });
  mainWindow.querySelectorAll(".project-card").forEach((card) => {
    card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
  });
}

function openPreview(card) {
  openMediaPreview({
    type: card.dataset.youtube ? "youtube" : card.dataset.video ? "video" : "image",
    name: card.dataset.project,
    kind: card.dataset.kind,
    src: card.dataset.video,
    videoId: card.dataset.videoId,
    image: card.dataset.image,
    poster: card.dataset.image,
    href: card.dataset.link,
  });
}

let previewGallery = [];
let previewIndex = 0;

function stepGallery(direction) {
  if (previewGallery.length < 2) return;
  previewIndex = (previewIndex + direction + previewGallery.length) % previewGallery.length;
  openMediaPreview(previewGallery[previewIndex], previewGallery, true);
}

function openMediaPreview(item, gallery = [], keepOpen = false) {
  previewGallery = gallery.length > 1 ? gallery : [];
  previewIndex = Math.max(0, gallery.indexOf(item));
  dialog.classList.toggle("has-gallery", previewGallery.length > 1);
  const counter = dialog.querySelector("#preview-counter");
  if (counter) counter.textContent = previewGallery.length ? `${previewIndex + 1} / ${previewGallery.length}` : "";
  const imageId = item.image || item.poster;
  const image = imageUrl(imageId, 1600);
  dialog.querySelector("#preview-title").textContent = item.name;
  dialog.querySelector("#preview-kind").textContent = item.kind;
  const description = dialog.querySelector("#preview-caption-copy");
  const link = dialog.querySelector("#preview-link");
  description.textContent = item.type === "youtube"
    ? "Sanatçının resmî YouTube kanalındaki video. Oynatılmazsa YouTube'da izle düğmesini kullan."
    : item.type === "link"
      ? "Etkinlik ve duyuru ayrıntıları için dış bağlantıyı aç."
      : item.kind.includes("KONSER") || item.kind.includes("TURNESİ")
        ? "Etkinlik bilgileri ve afişi. Tarihler ve bilet bilgileri organizatör sayfasında."
        : "DART Music Co. arşivinden içerik.";
  link.hidden = !item.href && item.type !== "youtube";
  link.href = item.type === "youtube" ? `https://www.youtube.com/watch?v=${item.videoId}` : item.href || "#";
  link.textContent = item.type === "youtube"
    ? "YOUTUBE'DA İZLE ↗"
    : item.type === "link"
      ? "KAYNAK SAYFASINI AÇ ↗"
      : "ETKİNLİK SAYFASINI AÇ ↗";
  previewBody.replaceChildren();

  if (item.type === "youtube") {
    const iframe = document.createElement("iframe");
    iframe.title = item.name;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.videoId)}?autoplay=1&rel=0&playsinline=1`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    previewBody.append(iframe);
  } else if (item.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.poster = image;
    video.src = item.src;
    previewBody.append(video);
  } else if (item.type === "audio") {
    const player = document.createElement("div");
    player.className = "audio-player";
    player.innerHTML = `<span class="audio-player-art"><img src="${image}" alt="" /></span><span class="audio-player-copy"><strong>${item.name}</strong><small>${item.kind}</small></span>`;
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.autoplay = true;
    audio.src = item.src;
    player.append(audio);
    previewBody.append(player);
  } else {
    const imageElement = document.createElement("img");
    imageElement.src = image;
    imageElement.alt = `${item.name} — örnek görsel`;
    previewBody.append(imageElement);
  }
  if (!keepOpen) dialog.showModal();
}

dialog.querySelector(".preview-prev").addEventListener("click", () => stepGallery(-1));
dialog.querySelector(".preview-next").addEventListener("click", () => stepGallery(1));
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") { event.preventDefault(); stepGallery(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); stepGallery(1); }
});

const workspace = desktop.querySelector(".workspace");
const iconLayer = desktop.querySelector(".desktop-icons");
const selectionBox = desktop.querySelector(".selection-box");
const desktopIcons = [...desktop.querySelectorAll(".desktop-icon")];
const isDesktopLayout = () => window.matchMedia("(min-width: 641px)").matches;
let suppressIconClick = false;
let lastPointerType = "mouse";

desktopIcons.forEach((icon, index) => {
  icon.style.left = "36px";
  icon.style.top = `${28 + index * 112}px`;
});

const clampIcon = (icon, x, y) => {
  const bounds = workspace.getBoundingClientRect();
  icon.style.left = `${Math.min(Math.max(0, x), bounds.width - icon.offsetWidth)}px`;
  icon.style.top = `${Math.min(Math.max(0, y), bounds.height - icon.offsetHeight)}px`;
};
const clearSelection = () => desktopIcons.forEach((icon) => icon.classList.remove("is-selected"));

window.addEventListener("resize", () => {
  desktopIcons.forEach((icon) => clampIcon(icon, parseFloat(icon.style.left), parseFloat(icon.style.top)));
});

iconLayer.addEventListener("pointerdown", (event) => {
  lastPointerType = event.pointerType;
  const icon = event.target.closest(".desktop-icon");
  if (!icon || event.button !== 0 || !isDesktopLayout()) return;
  if (event.shiftKey || event.metaKey || event.ctrlKey) icon.classList.toggle("is-selected");
  else if (!icon.classList.contains("is-selected")) {
    clearSelection();
    icon.classList.add("is-selected");
  }
  const group = desktopIcons.filter((item) => item.classList.contains("is-selected"));
  const origins = group.map((item) => ({ item, x: parseFloat(item.style.left), y: parseFloat(item.style.top) }));
  const startX = event.clientX;
  const startY = event.clientY;
  let moved = false;

  const onMove = (moveEvent) => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    moved = true;
    origins.forEach(({ item, x, y }) => {
      item.classList.add("is-dragging");
      clampIcon(item, x + dx, y + dy);
    });
  };
  const onUp = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    origins.forEach(({ item }) => item.classList.remove("is-dragging"));
    if (moved) {
      suppressIconClick = true;
      window.setTimeout(() => { suppressIconClick = false; }, 0);
    }
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
});

workspace.addEventListener("pointerdown", (event) => {
  lastPointerType = event.pointerType;
  const onBackground = event.target === workspace || event.target.classList.contains("wallpaper-note");
  if (!onBackground || event.button !== 0 || event.pointerType !== "mouse" || !isDesktopLayout()) return;
  event.preventDefault();
  const bounds = workspace.getBoundingClientRect();
  const startX = event.clientX - bounds.left;
  const startY = event.clientY - bounds.top;
  const additive = event.shiftKey || event.metaKey || event.ctrlKey;
  const previous = new Set(desktopIcons.filter((icon) => icon.classList.contains("is-selected")));
  if (!additive) clearSelection();
  workspace.classList.add("is-selecting");

  const onMove = (moveEvent) => {
    const x = Math.min(Math.max(0, moveEvent.clientX - bounds.left), bounds.width);
    const y = Math.min(Math.max(0, moveEvent.clientY - bounds.top), bounds.height);
    const left = Math.min(startX, x);
    const top = Math.min(startY, y);
    const width = Math.abs(x - startX);
    const height = Math.abs(y - startY);
    if (width + height < 4) return;
    selectionBox.hidden = false;
    Object.assign(selectionBox.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
    desktopIcons.forEach((icon) => {
      const r = icon.getBoundingClientRect();
      const hit = r.left - bounds.left < left + width && r.right - bounds.left > left
        && r.top - bounds.top < top + height && r.bottom - bounds.top > top;
      icon.classList.toggle("is-selected", hit || (additive && previous.has(icon)));
    });
  };
  const onUp = () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    selectionBox.hidden = true;
    workspace.classList.remove("is-selecting");
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
});

desktop.addEventListener("click", (event) => {
  const appButton = event.target.closest("[data-open]");
  if (!appButton) return;
  if (suppressIconClick) return;
  const isIcon = appButton.classList.contains("desktop-icon");
  // Masaüstünde fareyle tek tık seçer, çift tık (veya klavye/dokunma) açar.
  if (isIcon && isDesktopLayout() && lastPointerType === "mouse" && event.detail === 1) return;
  openApp(appButton.dataset.open);
});

sectionContent.addEventListener("click", (event) => {
  if (sectionContent.querySelector(".explorer")) {
    handleExplorerClick(event);
    return;
  }
  const filterButton = event.target.closest(".filter-chip");
  if (filterButton) {
    filterProjects({ currentTarget: filterButton });
    return;
  }
  const projectCard = event.target.closest(".project-card");
  if (projectCard) openPreview(projectCard);
});
sectionContent.addEventListener("input", (event) => {
  if (!event.target.matches(".explorer-search input")) return;
  const query = event.target.value.trim().toLocaleLowerCase("tr");
  sectionContent.querySelectorAll(".file-item").forEach((item) => {
    item.hidden = query !== "" && !item.dataset.search.includes(query);
  });
});

mainWindow.querySelector(".close-control").addEventListener("click", () => {
  mainWindow.classList.add("is-hidden");
  window.setTimeout(() => {
    mainWindow.classList.add("is-minimized");
    mainWindow.classList.remove("is-hidden");
  }, 180);
});
mainWindow.querySelector(".minimize-control").addEventListener("click", () => {
  mainWindow.classList.add("is-minimized");
});
mainWindow.querySelector(".maximize-control").addEventListener("click", () => {
  mainWindow.classList.toggle("is-maximized");
  bringToFront();
});
mainWindow.addEventListener("pointerdown", bringToFront);

dialog.querySelector(".preview-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  previewBody.querySelectorAll("video, audio").forEach((media) => media.pause());
  previewBody.replaceChildren();
});

const dragHandle = mainWindow.querySelector("[data-drag-handle]");
let dragStart = null;
dragHandle.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".window-control") || window.matchMedia("(max-width: 640px)").matches || mainWindow.classList.contains("is-maximized")) return;
  const rect = mainWindow.getBoundingClientRect();
  const workspaceRect = mainWindow.parentElement.getBoundingClientRect();
  mainWindow.style.transform = "none";
  mainWindow.style.left = `${rect.left - workspaceRect.left}px`;
  mainWindow.style.top = `${rect.top - workspaceRect.top}px`;
  dragStart = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  dragHandle.setPointerCapture(event.pointerId);
});
dragHandle.addEventListener("pointermove", (event) => {
  if (!dragStart) return;
  const workspaceRect = mainWindow.parentElement.getBoundingClientRect();
  const left = Math.max(12, Math.min(event.clientX - workspaceRect.left - dragStart.x, workspaceRect.width - mainWindow.offsetWidth - 12));
  const top = Math.max(8, Math.min(event.clientY - workspaceRect.top - dragStart.y, workspaceRect.height - mainWindow.offsetHeight - 8));
  mainWindow.style.left = `${left}px`;
  mainWindow.style.top = `${top}px`;
});
dragHandle.addEventListener("pointerup", () => { dragStart = null; });
dragHandle.addEventListener("pointercancel", () => { dragStart = null; });

function updateClock() {
  const currentTime = new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
  document.querySelector("#clock").textContent = currentTime;
}

updateClock();
window.setInterval(updateClock, 30_000);

if (window.matchMedia("(max-width: 640px)").matches) mainWindow.classList.add("is-minimized");

(function runLogin() {
  const login = document.querySelector("#login");
  const dots = login.querySelector("#login-dots");
  const button = login.querySelector("#login-button");
  const cursor = login.querySelector("#login-cursor");
  const place = (x, y) => { cursor.style.transform = `translate(${x}px, ${y}px)`; };
  place(window.innerWidth * 0.75, window.innerHeight * 0.8);
  const target = button.getBoundingClientRect();
  const tx = target.left + target.width / 2 - 4;
  const ty = target.top + target.height / 2 - 2;
  const finish = () => {
    login.classList.add("is-done");
    window.setTimeout(() => login.remove(), 380);
  };

  for (let i = 1; i <= 8; i += 1) window.setTimeout(() => { dots.textContent = "•".repeat(i); }, 150 + i * 50);
  window.setTimeout(() => {
    cursor.style.transition = "transform .4s cubic-bezier(.4, 0, .2, 1)";
    place(tx, ty);
  }, 600);
  window.setTimeout(() => button.classList.add("is-pressed"), 1030);
  window.setTimeout(finish, 1100);
})();

(function setupSpotify() {
  const panel = document.querySelector("#spotify-panel");
  const $ = (id) => panel.querySelector(id);
  const toggle = $("#spotify-toggle");
  const list = $("#sp-list");
  const playBtn = $("#sp-play");
  const fmt = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, "0")}`;
  let key = "batuhan";
  let index = 0;
  let controller = null;
  let ready = false;
  let wantPlay = false;
  let paused = true;
  let lastLoad = 0;
  let pending = null;

  const data = () => window.spotifyPlaylists[key];
  const uri = (i) => `spotify:track:${data().tracks[i].u}`;

  function renderTrack() {
    const track = data().tracks[index];
    $("#sp-cover").src = data().cover;
    $("#sp-title").textContent = track.t;
    $("#sp-artist").textContent = track.a;
    $("#sp-cur").textContent = "0:00";
    $("#sp-dur").textContent = fmt(track.d);
    $("#sp-fill").style.width = "0%";
    list.querySelectorAll("li").forEach((li, i) => li.classList.toggle("is-active", i === index));
  }
  function renderList() {
    list.innerHTML = data().tracks.map((t, i) => `<li data-i="${i}"><span>${String(i + 1).padStart(2, "0")}</span><b>${t.t}</b><em>${fmt(t.d)}</em></li>`).join("");
  }
  function setPlayIcon() {
    playBtn.textContent = paused ? "▶" : "❚❚";
    playBtn.setAttribute("aria-label", paused ? "Çal" : "Duraklat");
    panel.classList.toggle("is-playing", !paused);
  }
  function load(i, autoplay) {
    index = (i + data().tracks.length) % data().tracks.length;
    renderTrack();
    wantPlay = autoplay;
    lastLoad = Date.now();
    if (!ready) return;
    controller.loadUri(uri(index));
    if (autoplay) controller.play();
  }
  function step(dir) { load(index + dir, !paused || wantPlay); }

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    IFrameAPI.createController($("#sp-embed"), { uri: uri(index), width: 200, height: 152 }, (c) => {
      controller = c;
      c.addListener("ready", () => {
        ready = true;
        if (pending !== null) { const p = pending; pending = null; load(p.i, p.play); }
      });
      c.addListener("playback_update", ({ data: s }) => {
        paused = s.isPaused;
        setPlayIcon();
        if (!s.duration) return;
        $("#sp-fill").style.width = `${Math.min(100, (s.position / s.duration) * 100)}%`;
        $("#sp-cur").textContent = fmt(s.position);
        $("#sp-dur").textContent = fmt(s.duration);
        if (s.position >= s.duration - 800 && Date.now() - lastLoad > 3000) step(1);
      });
    });
  };
  if (window.__spotifyApi) window.onSpotifyIframeApiReady(window.__spotifyApi);

  playBtn.addEventListener("click", () => {
    if (!ready) { pending = { i: index, play: true }; wantPlay = true; paused = false; setPlayIcon(); return; }
    controller.togglePlay();
  });
  $("#sp-prev").addEventListener("click", () => step(-1));
  $("#sp-next").addEventListener("click", () => step(1));
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    if (!ready) { index = Number(li.dataset.i); renderTrack(); pending = { i: index, play: true }; paused = false; setPlayIcon(); return; }
    load(Number(li.dataset.i), true);
  });
  $("#sp-bar").addEventListener("click", (e) => {
    if (!ready) return;
    const r = e.currentTarget.getBoundingClientRect();
    controller.seek(Math.floor(((e.clientX - r.left) / r.width) * (data().tracks[index].d / 1000)));
  });
  panel.querySelectorAll("[data-playlist]").forEach((tab) => {
    tab.addEventListener("click", () => {
      panel.querySelectorAll("[data-playlist]").forEach((t) => t.classList.toggle("is-active", t === tab));
      key = tab.dataset.playlist;
      renderList();
      load(0, !paused);
    });
  });
  toggle.addEventListener("click", () => {
    const collapsed = panel.classList.toggle("is-collapsed");
    toggle.textContent = collapsed ? "+" : "–";
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Çalma listesini aç" : "Çalma listesini küçült");
  });
  renderList();
  renderTrack();
})();
