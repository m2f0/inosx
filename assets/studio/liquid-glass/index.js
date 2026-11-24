const mountedElements = new WeakMap();
const readNumber = (element, name, fallback) => {
    const value = element.dataset[name];
    if (!value) {
        return fallback;
    }
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};
const readChannel = (element, name, fallback) => {
    const value = element.dataset[name];
    return value === "R" || value === "G" || value === "B" ? value : fallback;
};
export const readLiquidGlassConfig = (element) => ({
    radius: readNumber(element, "radius", 16),
    border: readNumber(element, "border", 0.07),
    lightness: readNumber(element, "lightness", 50),
    blend: element.dataset.blend || "difference",
    xChannel: readChannel(element, "xChannel", "R"),
    yChannel: readChannel(element, "yChannel", "B"),
    alpha: readNumber(element, "alpha", 0.93),
    blur: readNumber(element, "blur", 11),
    rOffset: readNumber(element, "rOffset", 0),
    gOffset: readNumber(element, "gOffset", 10),
    bOffset: readNumber(element, "bOffset", 20),
    scale: readNumber(element, "scale", -180),
});
export const buildLiquidGlassDisplacementImage = (width, height, config) => {
    const border = Math.min(width, height) * (config.border * 0.5);
    const innerWidth = Math.max(1, width - border * 2);
    const innerHeight = Math.max(1, height - border * 2);
    return `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.radius}" fill="url(#red)"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${config.radius}" fill="url(#blue)" style="mix-blend-mode:${config.blend}"></rect>
      <rect
        x="${border}"
        y="${border}"
        width="${innerWidth}"
        height="${innerHeight}"
        rx="${config.radius}"
        fill="hsl(0 0% ${config.lightness}% / ${config.alpha})"
        style="filter:blur(${config.blur}px)"
      ></rect>
    </svg>
  `;
};
export const renderLiquidGlass = (element) => {
    const filterId = element.dataset.filterId;
    const filter = filterId
        ? element.querySelector(`#${CSS.escape(filterId)}`)
        : null;
    if (!filter) {
        return;
    }
    const rect = element.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const config = readLiquidGlassConfig(element);
    const displacementImage = buildLiquidGlassDisplacementImage(width, height, config);
    const displacementDataUri = `data:image/svg+xml,${encodeURIComponent(displacementImage)}`;
    filter.innerHTML = `
    <feImage
      x="0"
      y="0"
      width="100%"
      height="100%"
      href="${displacementDataUri}"
      result="map"
    ></feImage>
    <feDisplacementMap
      in="SourceGraphic"
      in2="map"
      xChannelSelector="${config.xChannel}"
      yChannelSelector="${config.yChannel}"
      scale="${config.scale + config.rOffset}"
      result="dispRed"
    ></feDisplacementMap>
    <feColorMatrix
      in="dispRed"
      type="matrix"
      values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
      result="red"
    ></feColorMatrix>
    <feDisplacementMap
      in="SourceGraphic"
      in2="map"
      xChannelSelector="${config.xChannel}"
      yChannelSelector="${config.yChannel}"
      scale="${config.scale + config.gOffset}"
      result="dispGreen"
    ></feDisplacementMap>
    <feColorMatrix
      in="dispGreen"
      type="matrix"
      values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
      result="green"
    ></feColorMatrix>
    <feDisplacementMap
      in="SourceGraphic"
      in2="map"
      xChannelSelector="${config.xChannel}"
      yChannelSelector="${config.yChannel}"
      scale="${config.scale + config.bOffset}"
      result="dispBlue"
    ></feDisplacementMap>
    <feColorMatrix
      in="dispBlue"
      type="matrix"
      values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
      result="blue"
    ></feColorMatrix>
    <feBlend in="red" in2="green" mode="screen" result="rg"></feBlend>
    <feBlend in="rg" in2="blue" mode="screen" result="output"></feBlend>
    <feGaussianBlur></feGaussianBlur>
  `;
    element.style.setProperty("--liquid-glass-filter", `url("#${filterId}")`);
};
export const mountLiquidGlass = (element) => {
    renderLiquidGlass(element);
    if (mountedElements.has(element) || typeof ResizeObserver === "undefined") {
        return;
    }
    const observer = new ResizeObserver(() => {
        renderLiquidGlass(element);
    });
    observer.observe(element);
    mountedElements.set(element, observer);
};
export const unmountLiquidGlass = (element) => {
    const observer = mountedElements.get(element);
    if (!observer) {
        return;
    }
    observer.disconnect();
    mountedElements.delete(element);
};
export const setupLiquidGlass = (root = document) => {
    const elements = Array.from(root.querySelectorAll("[data-liquid-glass]"));
    elements.forEach(mountLiquidGlass);
    return () => {
        elements.forEach(unmountLiquidGlass);
    };
};
