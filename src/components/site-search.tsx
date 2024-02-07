import { component$, useSignal, $, useOnDocument } from '@builder.io/qwik';
import { Modal, ModalContent } from '@qwik-ui/headless';

import { formatDate } from '../utils/format-date';

interface Props {
  search: any;
}
const SiteSearch = component$<Props>(({ search }) => {
  const isModalOpen = useSignal(false);
  const all = useSignal(search);
  const filtered = useSignal(search);

  const handleModal = $(() => {
    isModalOpen.value = !isModalOpen.value;
  });

  const handleChange = $(async (event) => {
    const FuseModule = await import('fuse.js');
    const Fuse = FuseModule.default;

    const {
      target: { value },
    } = event;

    const fuse = new Fuse(all.value, {
      threshold: 0.5,
      keys: ['title', 'date'],
    });

    const results = fuse.search(value).map((data: any) => {
      const {
        item: { base, path, title, date },
      } = data;

      return {
        title,
        date,
        path,
        base,
      };
    });

    if (value) {
      filtered.value = results;
    } else {
      filtered.value = all.value;
    }
  });

  useOnDocument(
    'keydown',
    $((event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        handleModal();
      }
    })
  );

  return (
    <>
      <button
        onClick$={handleModal}
        type='button'
        class='not-prose w-full flex justify-between items-center font-medium text-brand-tertiary transition-all duration-300 rounded border border-brand-outline bg-surface px-3 py-2 hover:text-white hover:bg-brand-muted/20'
      >
        <span class='flex items-center gap-x-3'>
          <svg aria-hidden='true' class='h-4 w-4 stroke-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          Search
        </span>

        <kbd class='flex gap-1 font-sans font-semibold'>
          <abbr title='Command' class='no-underline mt-[1px]'>
            ⌘
          </abbr>
          K
        </kbd>
      </button>
      <Modal
        bind:show={isModalOpen}
        class='bg-transparent backdrop:backdrop-blur backdrop:backdrop-brightness-50 w-full max-w-3xl p-4'
      >
        <ModalContent class='p-4 rounded bg-brand-surface'>
          <div class='flex items-center gap-2 pb-4 border-brand-outline border-b-[1px]'>
            <svg aria-hidden='true' class='h-4 w-4 stroke-2 stroke-slate-400' fill='none' viewBox='0 0 24 24'>
              <path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              type='text'
              placeholder='Search'
              class='basis-full bg-transparent text-white focus:outline-none bg-surface'
              onInput$={handleChange}
            />
            <button
              class='text-xs uppercase bg-brand-outline rounded px-2 py-1 transition-all duration-300 hover:bg-brand-muted/20'
              aria-label='esc'
              value='esc'
              onClick$={handleModal}
            >
              esc
            </button>
          </div>
          <div class='text-brand-muted text-xs pt-2 pb-4'>{`${
            filtered.value.length > 0 ? filtered.value.length : 0
          } results`}</div>
          <ul class='h-[300px] overflow-auto list-none p-0 m-0'>
            {filtered.value.length > 0 ? (
              filtered.value.map((data, index) => {
                const { path, title, date, base } = data;
                return (
                  <li
                    key={index}
                    class='cursor-pointer m-0 p-0 border-b-[1px] border-brand-outline hover:bg-brand-fuchsia'
                  >
                    <a href={path} class='group no-underline'>
                      <div class=' px-4 py-3 text-slate-300 hover:text-white'>
                        <div class='flex items-end pb-4 justify-between'>
                          <time class='text-brand-primary group-hover:text-white text-[0.6rem]'>
                            {formatDate(date)}
                          </time>
                          <span class='text-[0.65rem] uppercase bg-brand-outline rounded px-1 py-0.5 -mt-2'>
                            {base}
                          </span>
                        </div>
                        {title}
                      </div>
                    </a>
                  </li>
                );
              })
            ) : (
              <div class='flex items-center justify-center text-center h-full'>
                <div class='font-semibold text-lg text-center text-slate-500 -mt-8'>No results found.</div>
              </div>
            )}
          </ul>
        </ModalContent>
      </Modal>
    </>
  );
});

export default SiteSearch;
