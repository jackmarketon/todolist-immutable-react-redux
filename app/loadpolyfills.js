export function browserSupportsAllFeatures() {
  return window.fetch &&
    Object.assign &&
    Array.prototype.some &&
    Array.prototype.every;
}

export function loadScript(src, done) {
  const js = document.createElement('script');
  js.src = src;
  js.onload = () => done();
  js.onerror = () =>
    done(new Error(`Failed to load script ${src}`));
  document.head.appendChild(js);
}
