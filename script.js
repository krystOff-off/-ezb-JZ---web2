const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".dot"));
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const heroCta = document.querySelector(".hero-cta");

const galleryProducts = [
  {
    title: "Stojan na brýle",
    description:
      "Originální stojan z ručně opracovaného dřeva, který spojuje praktické využití s figurální řezbou a osobitým výrazem.",
    price: "Cena na dotaz",
    images: [
      { src: "assets/produkt-1.jpeg", alt: "Stojan na brýle z profilu" },
      { src: "assets/produkt-2.jpeg", alt: "Stojan na brýle z bočního pohledu" },
      { src: "assets/produkt-3.jpeg", alt: "Stojan na brýle z čelního pohledu" }
    ]
  },
  {
    title: "Autorský detail",
    description:
      "Ukázka autorského přístupu, kde i drobný užitkový předmět dokáže působit jako malá plastika s vlastním charakterem.",
    price: "Cena na dotaz",
    images: [
      { src: "assets/produkt-2.jpeg", alt: "Stojan s brýlemi z boku" },
      { src: "assets/produkt-3.jpeg", alt: "Stojan s brýlemi zepředu" },
      { src: "assets/produkt-1.jpeg", alt: "Samotný dřevěný stojan" }
    ]
  },
  {
    title: "Dárek s osobitostí",
    description:
      "Příklad předmětu, který zaujme jako originální dárek a zároveň zůstává praktický pro každodenní používání.",
    price: "Cena na dotaz",
    images: [
      { src: "assets/produkt-3.jpeg", alt: "Stojan s brýlemi z čelního pohledu" },
      { src: "assets/produkt-1.jpeg", alt: "Profil dřevěného stojanu" },
      { src: "assets/produkt-2.jpeg", alt: "Stojan s brýlemi z bočního pohledu" }
    ]
  }
];

const offerProducts = [
  {
    title: "Zakázkové dárky",
    description: "Osobní dárky k narozeninám, svatbám, výročím nebo významným rodinným událostem.",
    price: "Od 890 Kč",
    images: [
      { src: "assets/produkt-1.jpeg", alt: "Zakázkový dřevěný dárek" },
      { src: "assets/o-mne-nova-fotka.jpeg", alt: "Ukázka zakázkového rytí" }
    ]
  },
  {
    title: "Dekorace a doplňky",
    description: "Stylové stojany, dekorativní objekty, interiérové prvky a originální předměty pro každý den.",
    price: "Od 650 Kč",
    images: [
      { src: "assets/produkt-2.jpeg", alt: "Dřevěný doplněk" },
      { src: "assets/produkt-3.jpeg", alt: "Dekorativní stojan" }
    ]
  },
  {
    title: "Plastiky a figurální tvorba",
    description: "Autorské plastiky, portrétní motivy a stylizované postavy s výrazem a charakterem.",
    price: "Od 1 500 Kč",
    images: [
      { src: "assets/produkt-3.jpeg", alt: "Figurální tvorba" },
      { src: "assets/produkt-1.jpeg", alt: "Autorská plastika" }
    ]
  },
  {
    title: "Sochy do interiéru i exteriéru",
    description: "Výrazné dřevěné solitéry, které vyniknou doma, na chalupě, v zahradě nebo ve firemním prostoru.",
    price: "Od 3 900 Kč",
    images: [
      { src: "assets/produkt-1.jpeg", alt: "Dřevěná socha" },
      { src: "assets/o-mne-nova-fotka.jpeg", alt: "Ruční řezbářská práce" }
    ]
  },
  {
    title: "Spolupráce na míru",
    description: "Od prvního nápadu přes návrh až po hotový výrobek, který odpovídá vašemu stylu a účelu.",
    price: "Cena dle zadání",
    images: [
      { src: "assets/produkt-2.jpeg", alt: "Výroba na míru" },
      { src: "assets/o-mne-nova-fotka.jpeg", alt: "Ukázka detailu výrobku" }
    ]
  },
  {
    title: "Renovace a úpravy",
    description: "Citlivé opravy vybraných dřevěných prvků a dopracování detailů tam, kde záleží na ruční práci.",
    price: "Od 700 Kč",
    images: [
      { src: "assets/produkt-3.jpeg", alt: "Renovace dřevěného předmětu" },
      { src: "assets/produkt-2.jpeg", alt: "Detail renovovaného výrobku" }
    ]
  }
];

let currentHeroIndex = 0;
let heroIntervalId = null;
let currentProductIndex = 0;
let currentImageIndex = 0;
let currentCollection = galleryProducts;

const modal = document.getElementById("gallery-modal");
const modalMainImage = document.getElementById("modal-main-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalThumbs = document.getElementById("modal-thumbs");
const openLightboxButton = document.getElementById("open-lightbox");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

function applyNonBreakingSpaces(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      const parentTag = node.parentElement?.tagName;
      if (parentTag && ["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME"].includes(parentTag)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    node.nodeValue = node.nodeValue.replace(/(^|[\s\u00A0])([AaEeIiOoUuKkSsVvZz])\s+/g, "$1$2\u00A0");
  });
}

function setHeroSlide(index) {
  currentHeroIndex = index;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });
  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
}

function startHeroSlider() {
  heroIntervalId = window.setInterval(() => {
    const nextIndex = (currentHeroIndex + 1) % heroSlides.length;
    setHeroSlide(nextIndex);
  }, 4200);
}

function resetHeroSlider() {
  if (heroIntervalId) {
    window.clearInterval(heroIntervalId);
  }
  startHeroSlider();
}

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setHeroSlide(Number(dot.dataset.target));
    resetHeroSlider();
  });
});

function renderModalImage(productIndex, imageIndex) {
  const product = currentCollection[productIndex];
  const image = product.images[imageIndex];

  currentProductIndex = productIndex;
  currentImageIndex = imageIndex;

  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = product.price ? `Cena: ${product.price}` : "";
  modalMainImage.src = image.src;
  modalMainImage.alt = image.alt;

  const thumbs = Array.from(modalThumbs.querySelectorAll(".modal-thumb"));
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("is-active", index === imageIndex);
  });
}

function openModal(productIndex, collection = galleryProducts) {
  currentCollection = collection;
  const product = currentCollection[productIndex];

  modalThumbs.innerHTML = "";
  product.images.forEach((image, index) => {
    const thumb = document.createElement("button");
    thumb.className = "modal-thumb";
    thumb.type = "button";
    thumb.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
    thumb.addEventListener("click", () => renderModalImage(productIndex, index));
    modalThumbs.appendChild(thumb);
  });

  renderModalImage(productIndex, 0);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  if (!lightbox.classList.contains("is-open")) {
    document.body.style.overflow = "";
  }
}

function renderLightbox() {
  const product = currentCollection[currentProductIndex];
  const image = product.images[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

function openLightbox() {
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  if (!modal.classList.contains("is-open")) {
    document.body.style.overflow = "";
  }
}

function stepLightbox(direction) {
  const product = currentCollection[currentProductIndex];
  const total = product.images.length;
  currentImageIndex = (currentImageIndex + direction + total) % total;
  renderModalImage(currentProductIndex, currentImageIndex);
  renderLightbox();
}

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => openModal(Number(card.dataset.product), galleryProducts));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(Number(card.dataset.product), galleryProducts);
    }
  });
});

document.querySelectorAll(".offer-card").forEach((card) => {
  card.addEventListener("click", () => openModal(Number(card.dataset.offer), offerProducts));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(Number(card.dataset.offer), offerProducts);
    }
  });
});

document.querySelectorAll("[data-close='modal']").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.querySelectorAll("[data-close='lightbox']").forEach((element) => {
  element.addEventListener("click", closeLightbox);
});

openLightboxButton.addEventListener("click", openLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));

heroCta?.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("ukazka")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav?.classList.toggle("is-open", !expanded);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox.classList.contains("is-open")) {
      closeLightbox();
      return;
    }

    if (modal.classList.contains("is-open")) {
      closeModal();
    }
  }

  if (lightbox.classList.contains("is-open")) {
    if (event.key === "ArrowLeft") {
      stepLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      stepLightbox(1);
    }
  }
});

setHeroSlide(0);
applyNonBreakingSpaces();
startHeroSlider();
