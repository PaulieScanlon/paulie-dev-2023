import { component$, useVisibleTask$, useSignal, useStore, $ } from '@builder.io/qwik';

import emojis from '../utils/emojis';
import Loading from './loading';

interface Props {
  title: String;
  slug: String;
}

const Reactions = component$<Props>(({ title, slug }) => {
  const counts = useSignal(null);
  const status = useStore({ submitting: true, submitted: false, reaction: '' });

  const getReactions = $(async () => {
    try {
      const response = await fetch('/api/reactions-by-slug', {
        method: 'POST',
        body: JSON.stringify({ slug: slug }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const json = await response.json();

      counts.value = json.data.reduce((items, item) => {
        items[item.reaction] = parseInt(item.count);
        return items;
      }, {});
      status.submitting = false;
    } catch (error) {
      console.error(error);
    }
  });

  useVisibleTask$(() => {
    getReactions();
  });

  const handleReaction = $(async (reaction) => {
    status.submitting = true;
    status.reaction = reaction;

    try {
      const response = await fetch('/api/add-reaction', {
        method: 'POST',
        body: JSON.stringify({ title: title, slug: slug, reaction: reaction }),
      });

      if (!response.ok) {
        throw new Error('Bad response');
      }

      setTimeout(() => {
        getReactions();
        status.submitted = true;
        status.submitting = false;
        status.reaction = '';
      }, 500);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div class='flex flex-col gap-8 justify-center border rounded border-brand-outline bg-brand-surface px-4 py-8 mt-24 mb-8'>
      <div class='flex flex-col gap-2'>
        <strong class='block text-center text-4xl text-brand-secondary'>Hey!</strong>

        {status.submitted ? (
          <p class='m-0 text-center text-sm'>
            Splendid, thank you!{' '}
            <span role='img' aria-label='Victory Hand emoji'>
              ✌️
            </span>
          </p>
        ) : (
          <p class='m-0 text-center text-sm'>Leave a reaction and let me know how I'm doing.</p>
        )}
      </div>

      <ul class='list-none p-0 m-0 flex items-center justify-center gap-3 pb-4'>
        {emojis.map((emoji, index) => {
          const { name, d, color } = emoji;
          return (
            <li key={index} class='m-0 p-0 w-10 h-10'>
              <div class='relative group'>
                <button
                  class={`rounded-full transition-all duration-300 enabled:hover:scale-125 disabled:text-brand-guide text-brand-${color}`}
                  disabled={status.submitting || status.submitted}
                  onClick$={() => handleReaction(name)}
                >
                  {status.submitting && status.reaction === name ? (
                    <Loading />
                  ) : (
                    <>
                      <svg
                        role='img'
                        aria-label={`reaction-${name}`}
                        xmlns='http://www.w3.org/2000/svg'
                        class='not-prose rounded-full w-full h-full transition-colors duration-300'
                        viewBox='0 0 32 32'
                        fill='currentColor'
                      >
                        <path d={d} />
                      </svg>
                    </>
                  )}
                </button>
                {status.submitting || status.submitted ? null : (
                  <span class='absolute top-14 left-1/2 -translate-x-1/2 block text-center text-xs bg-brand-outline border border-brand-guide rounded px-2 py-0.5 duration-200 transition-opacity opacity-0 group-hover:opacity-100 capitalize'>
                    {name}
                  </span>
                )}
                <small class='block font-bold text-center text-brand-muted h-6'>
                  {counts.value && counts.value[name] ? counts.value[name] : 0}
                </small>
              </div>
            </li>
          );
        })}
      </ul>
      <div class='flex gap-1 justify-center'>
        <small class='text-brand-secondary text-xs'>Powered by</small>
        <a href='https://bit.ly/paulie-neon' target='_blank' rel='noopener' class='text-xs'>
          Neon
        </a>
      </div>
    </div>
  );
});

export default Reactions;
