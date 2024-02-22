export const rehypeExternalLinks = () => {
  const transformer = (tree) => {
    tree.children.forEach((node) => {
      if (node.tagName === 'p') {
        node.children.forEach((child) => {
          if (child.tagName === 'a') {
            if (child.properties.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/)) {
              child.properties.target = '_blank';
              child.properties.rel = 'noopener';
            }
          }
        });
      }
    });
  };

  return transformer;
};
