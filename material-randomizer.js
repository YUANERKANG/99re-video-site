(function () {
  const images = Array.isArray(window.MATERIAL_IMAGES) ? window.MATERIAL_IMAGES : [];
  if (!images.length) return;

  const shuffled = images.slice().sort(() => Math.random() - 0.5);
  let cursor = 0;

  function nextImage() {
    if (cursor >= shuffled.length) {
      shuffled.sort(() => Math.random() - 0.5);
      cursor = 0;
    }
    const image = shuffled[cursor];
    cursor += 1;
    return image;
  }

  function viewerUrl(image) {
    return `./material-viewer.html?img=${encodeURIComponent(image)}`;
  }

  function replaceImage(img, image, alt) {
    img.src = image;
    img.alt = alt;
  }

  function wireAdImage(img) {
    const image = nextImage();
    replaceImage(img, image, "随机素材广告");

    const link = img.closest("a");
    if (link) {
      link.href = viewerUrl(image);
      link.target = "_blank";
      link.rel = "noopener";
    }
  }

  const adImages = [
    ...document.querySelectorAll(".dmcenter a img"),
    ...document.querySelectorAll(".block.spots .spot a img"),
    ...document.querySelectorAll(".main-container a img.half-img")
  ];

  adImages.forEach(wireAdImage);

  document.querySelectorAll(".list-videos img.thumb").forEach((img) => {
    replaceImage(img, nextImage(), "精彩封面");
  });
})();
