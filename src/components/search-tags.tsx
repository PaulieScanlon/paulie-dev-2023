import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import SearchInput from './search-input';

interface tagProps {
  name: string;
  slug: string;
}

interface Props {
  tags: tagProps[];
}

const SearchTags = component$<Props>(({ tags }) => {
  const all = useSignal(tags);
  const filtered = useSignal(tags);

  const handleInput = $(async (event) => {
    const FuseModule = await import('fuse.js');
    const Fuse = FuseModule.default;

    const {
      target: { value },
    } = event;

    const fuse = new Fuse(all.value, {
      threshold: 0.5,
      keys: ['name'],
    });

    const results = fuse.search(value).map((data: any) => {
      const {
        item: { name, slug },
      } = data;

      return {
        name,
        slug,
      };
    });

    if (value) {
      filtered.value = results;
    } else {
      filtered.value = all.value;
    }
  });

  useVisibleTask$(() => {
    document.getElementById('input').focus();
  });

  return (
    <>
      <SearchInput handleInput={handleInput} />

      <ul class='flex flex-wrap items-baseline gap-4 list-none m-0 p-0 mt-8'>
        {filtered.value.map((item) => {
          const { name, slug } = item;
          return (
            <li class='m-0 p-0 rounded text-sm text-brand-salmon border border-brand-outline bg-brand-surface'>
              <a
                href={`/tags/${slug}`}
                class='block no-underline px-2 py-1 text-inherit font-medium duration-300 transition-colors'
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
});

export default SearchTags;
