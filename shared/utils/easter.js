export function setupEasterNodes({ selector = '.glitch-node', onTrigger }) {
  const nodes = Array.from(document.querySelectorAll(selector));
  nodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      onTrigger?.(node);
    });
    node.addEventListener('touchstart', (e) => {
      onTrigger?.(node);
    }, { passive: true });
  });
  return nodes;
}
