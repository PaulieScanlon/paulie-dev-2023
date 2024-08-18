import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import SearchInput from './search-input';

interface tagProps {
  name: string;
  slug: string;
  count: number;
}

interface Props {
  tags: tagProps[];
}

const SearchTags = component$<Props>(({ tags }) => {
  const all = tags;
  const filtered = useSignal(tags);

  const handleInput = $(async (event) => {
    const FuseModule = await import('fuse.js');
    const Fuse = FuseModule.default;
    const {
      target: { value },
    } = event;
    const fuse = new Fuse(all, {
      threshold: 0.5,
      keys: ['name'],
    });
    const results = fuse.search(value).map((data: any) => {
      const {
        item: { name, slug, count },
      } = data;
      return {
        name,
        slug,
        count,
      };
    });
    if (value) {
      filtered.value = results;
    } else {
      filtered.value = all;
    }
  });

  useVisibleTask$(() => {
    document.getElementById('input').focus();
  });

  return (
    <div class='mt-8'>
      <SearchInput handleInput={handleInput} />
      <ul class='items-baseline list-none m-0 p-0 mt-8 columns-1 sm:columns-2 md:columns-3'>
        {filtered.value
          .sort((a: tagProps, b: tagProps) => b.count - a.count)
          .map((item) => {
            const { name, slug, count } = item;
            return (
              <li class='m-0 mb-2 p-0 rounded text-sm text-brand-salmon border border-brand-outline bg-brand-surface'>
                <a
                  href={`/tags/${slug}`}
                  class='group relative flex items-center justify-between no-underline px-2 py-1 text-inherit font-medium duration-300 transition-colors'
                >
                  <span class='text-inherit'>{`${name}`}</span>
                  <span class='block shrink-0 text-xs text-right text-brand-muted group-hover:text-inherit duration-100 transition-colors'>{`x${count}`}</span>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default SearchTags;
