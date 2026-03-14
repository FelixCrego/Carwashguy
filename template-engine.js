(function () {
  const cfg = window.TEMPLATE_CONFIG || {};
  const replacements = Object.entries(cfg.replacements || {}).sort((a, b) => b[0].length - a[0].length);

  const isPlaceholder = (value) => typeof value === 'string' && /^\{\{.+\}\}$/.test(value.trim());

  const replaceInString = (value) => {
    if (!value || typeof value !== 'string') return value;
    let output = value;
    for (const [from, to] of replacements) {
      if (!from) continue;
      output = output.split(from).join(to);
    }
    return output;
  };


  const applyTheme = () => {
    const root = document.documentElement;
    const primary = cfg.theme && cfg.theme.primaryColor;
    const secondary = cfg.theme && cfg.theme.secondaryColor;

    if (primary && !isPlaceholder(primary)) {
      root.style.setProperty('--primary-color', primary);
      root.style.setProperty('--accent', primary);
    }

    if (secondary && !isPlaceholder(secondary)) {
      root.style.setProperty('--secondary-color', secondary);
      root.style.setProperty('--gold-soft', secondary);
    }
  };

  const replaceAssets = () => {
    const assets = (cfg.media && cfg.media.assets) || {};
    const fallbackImage = (cfg.media && cfg.media.defaultImage) || '';
    const fallbackLogo = (cfg.media && cfg.media.defaultLogo) || '';

    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (!src || !src.includes('assets/')) return;

      const fileName = src.split('/').pop();
      const mapped = assets[fileName];
      const alt = (img.getAttribute('alt') || '').toLowerCase();
      const fallback = alt.includes('logo') ? fallbackLogo || fallbackImage : fallbackImage || fallbackLogo;
      const next = mapped || fallback || src;

      if (!isPlaceholder(next)) img.src = next;
    });
  };


  const replaceSiteConfigImages = () => {
    const siteCfg = window.siteConfig || {};
    document.querySelectorAll('img[data-site-config-image]').forEach((img) => {
      const key = img.getAttribute('data-site-config-image');
      const next = key ? siteCfg[key] : undefined;
      if (next && !isPlaceholder(next)) img.src = next;
    });
  };

  const replaceTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = replaceInString(node.nodeValue);
    });
  };

  const replaceAttributes = () => {
    document.querySelectorAll('*').forEach((el) => {
      for (const attr of el.getAttributeNames()) {
        const value = el.getAttribute(attr);
        const next = replaceInString(value);
        if (next !== value) el.setAttribute(attr, next);
      }
    });
  };



  const replaceStructuredData = () => {
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      const content = script.textContent;
      const next = replaceInString(content);
      if (next !== content) script.textContent = next;
    });
  };
  const replaceMetaAndTitle = () => {
    document.title = replaceInString(document.title);
    document.querySelectorAll('meta[name], meta[property]').forEach((meta) => {
      const content = meta.getAttribute('content');
      const next = replaceInString(content);
      if (next !== content) meta.setAttribute('content', next);
    });
  };

  applyTheme();
  replaceMetaAndTitle();
  replaceStructuredData();
  replaceAttributes();
  replaceTextNodes();
  replaceAssets();
  replaceSiteConfigImages();
})();
