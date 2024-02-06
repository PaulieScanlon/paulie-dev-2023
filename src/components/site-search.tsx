import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { Modal, ModalContent } from '@qwik-ui/headless';
import Fuse from 'fuse.js';

import { formatDate } from '../utils/format-date';

const SiteSearch = component$(() => {
  const isModalOpen = useSignal(false);
  const links = useSignal<any[]>();
  const results = useSignal<any[]>([]);

  const handleModal = $(() => {
    isModalOpen.value = !isModalOpen.value;
  });

  const handleChange = $((event) => {
    const {
      target: { value },
    } = event;

    const fuse = new Fuse(links.value, {
      threshold: 0.5,
      keys: ['title', 'date'],
    });

    if (value) {
      results.value = fuse
        .search(value)
        .map((data) => {
          const {
            item: { path, title, date },
          } = data;
          return {
            title,
            date,
            path,
          };
        })
        .sort((a: any, b: any) => b.date - a.date);
    } else {
      results.value = links.value;
    }
  });

  useVisibleTask$(async () => {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        console.log('Cmd + K pressed!');

        event.preventDefault();
        handleModal();
      }
    });

    console.log('import.meta.env.SITE: ', import.meta.env.SITE);

    try {
      const content = await fetch(`${import.meta.env.SITE}/all-content.json`);
      const { search } = await content.json();

      console.log('search: ', search);

      links.value = search;
      results.value = search;
    } catch (error) {
      console.error('Failed to fetch from static endpoint');
    }
  });

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
          <ul class='h-[300px] overflow-auto list-none p-0 m-0'>
            {results.value.length > 0 ? (
              results.value.map((data, index) => {
                const { path, title, date } = data;
                return (
                  <li
                    key={index}
                    class='cursor-pointer m-0 p-0 border-b-[1px] border-brand-outline hover:bg-brand-fuchsia'
                  >
                    <a href={path} class='not-prose group flex flex-col px-4 py-3 text-slate-300 hover:text-white'>
                      <span class='text-brand-primary group-hover:text-white text-[0.6rem]'>{formatDate(date)}</span>
                      {title}
                    </a>
                  </li>
                );
              })
            ) : (
              <div class='flex items-center justify-center text-center h-full'>
                <span class='font-semibold text-lg text-slate-500 -mt-8'>No results found.</span>
              </div>
            )}
          </ul>
        </ModalContent>
      </Modal>
    </>
  );
});

export default SiteSearch;
