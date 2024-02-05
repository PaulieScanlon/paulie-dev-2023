import { getCollection } from 'astro:content';

import { component$, useSignal, useStore, $, useVisibleTask$ } from '@builder.io/qwik';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';

const siteSearch = component$(() => {
  const isModalOpen = useSignal(false);
  const links = useStore([]);

  const handleModal = $(() => {
    isModalOpen.value = !isModalOpen.value;
  });

  useVisibleTask$(async () => {
    const articles = await getCollection('articles');
    const demos = await getCollection('demos');
    const opensource = await getCollection('opensource');
    const posts = await getCollection('posts');
    const streams = await getCollection('streams');

    const collections = [...articles, ...demos, ...opensource, ...posts, ...streams].map((link) => {
      const { slug, data } = link;

      console.log(slug, data);
    });

    // console.log(collections);
    // links.push(['test']);
    // links.push(collections);
  });

  return (
    <>
      <button
        onClick$={handleModal}
        class='not-prose flex items-center gap-3 no-underline text-brand-tertiary text-sm text-center px-3 py-3 transition-all duration-300 rounded-full border border-brand-outline bg-surface bg-brand-surface/70 hover:bg-brand-muted/10 w-full'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='2'
          class='stroke-brand-tertiary w-4 h-4'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
        <span class='text-inherit'>Search</span>
      </button>
      <Modal
        bind:show={isModalOpen}
        class='shadow-dark-medium bg-brand-surface text-foreground w-full max-w-3xl rounded-md backdrop:backdrop-blur backdrop:backdrop-brightness-50'
      >
        <ModalHeader>
          <h2>Header</h2>
        </ModalHeader>
        <ModalContent class='mb-2 pb-4 pt-2'>
          <p>content.</p>
        </ModalContent>

        <button onClick$={handleModal} class='absolute right-6 top-[26px]'>
          close
        </button>
      </Modal>
    </>
  );
});

export default siteSearch;
