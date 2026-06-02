import { component$ } from '@builder.io/qwik';

interface Props {
  handleModal: () => void;
}

const SearchTrigger = component$<Props>(({ handleModal }) => {
  return (
    <button
      onClick$={handleModal}
      type='button'
      aria-label='Search'
      class='not-prose group flex w-full items-center gap-3 rounded-lg border border-brand-outline bg-brand-surface px-3 py-1.5 text-sm font-light text-brand-muted transition-colors duration-200 hover:border-brand-muted/40 hover:text-brand-text'
    >
      <svg aria-hidden='true' class='h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
      </svg>
      <span class='flex-1 text-left'>Search</span>
      <kbd class='hidden items-center gap-0.5 rounded border border-brand-outline bg-brand-background px-1.5 py-0.5 font-sans text-[11px] leading-none text-brand-muted transition-colors duration-200 group-hover:border-brand-muted/40 lg:flex'>
        <abbr title='Command' class='no-underline'>
          ⌘
        </abbr>
        K
      </kbd>
    </button>
  );
});

export default SearchTrigger;
