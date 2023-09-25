import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export const createExcerpt = (markdown) => {
  return parser
    .render(markdown)
    .split('\n')
    .slice(0, 4)
    .map((str) => {
      return str.replace(/<\/?[^>]+(>|$)/g, '').split('\n');
    })
    .flat()
    .join(' ');
};
