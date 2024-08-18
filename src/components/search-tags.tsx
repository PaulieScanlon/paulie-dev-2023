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
      <ul class='flex flex-wrap items-baseline gap-4 list-none m-0 p-0 mt-8'>
        {filtered.value.map((item) => {
          const { name, slug, count } = item;
          return (
            <li class='relative m-0 p-0 rounded text-sm text-brand-salmon border border-brand-outline bg-brand-surface'>
              <a
                href={`/tags/${slug}`}
                class='block no-underline px-2 py-1 text-inherit font-medium duration-300 transition-colors'
              >
                <span class='text-inherit'>{`${name}`}</span>
                <span class='absolute -top-2 -right-2 flex items-center justify-center text-[0.45rem] text-brand-text text-center font-bold rounded-full border border-brand-outline w-5 h-5 bg-brand-surface'>
                  {`x${count}`}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default SearchTags;
