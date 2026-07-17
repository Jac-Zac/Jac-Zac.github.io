let searchLoadPromise;

const loadSearchData = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

const loadSearch = () => {
  const ninjaKeys = document.querySelector("ninja-keys");
  if (!ninjaKeys) return Promise.reject(new Error("Search element not found"));

  if (!searchLoadPromise) {
    searchLoadPromise = import(ninjaKeys.dataset.moduleUrl)
      .then(() => loadSearchData(ninjaKeys.dataset.searchUrl))
      .then(() => {
        ninjaKeys.classList.toggle("dark", determineComputedTheme() === "dark");
        return ninjaKeys;
      });
  }

  return searchLoadPromise;
};

const openSearchModal = async () => {
  // collapse navbarNav if expanded on mobile
  const $navbarNav = $("#navbarNav");
  if ($navbarNav.hasClass("show")) {
    $navbarNav.collapse("hide");
  }

  const ninjaKeys = await loadSearch();
  ninjaKeys.open();
};

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearchModal();
  }
});
