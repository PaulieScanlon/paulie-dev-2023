import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '@radix-ui/react-tooltip';

import colors from '../utils/colors';
import emojis from '../utils/emojis';
import Loading from './loading';

const Reactions = ({ slug }) => {
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    reaction: '',
  });
  const [counts, setCounts] = useState(null);

  const getReactions = async () => {
    try {
      const response = await fetch('/api/get-reactions', {
        method: 'POST',
        body: JSON.stringify({ slug: slug }),
      });

      if (!response.ok) {
        throw new Error('Bad response');
      }

      const json = await response.json();

      setCounts(
        json.data.reduce((acc, item) => {
          acc[item.reaction] = parseInt(item.count);
          return acc;
        }, {})
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReactions();
  }, []);

  const handleReaction = async (reaction: string) => {
    setStatus((prevState) => ({
      ...prevState,
      submitting: true,
      reaction: reaction,
    }));

    try {
      const response = await fetch('/api/add-reaction', {
        method: 'POST',
        body: JSON.stringify({ slug: slug, reaction: reaction }),
      });

      if (!response.ok) {
        throw new Error('Bad response');
      }

      setTimeout(() => {
        getReactions();
        setStatus({
          submitted: true,
          submitting: false,
          reaction: '',
        });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-8 justify-center border rounded border-brand-outline bg-brand-surface px-4 py-8'>
      <div className='flex flex-col gap-2'>
        <strong className='block text-center text-4xl text-brand-secondary'>Hey!</strong>

        {status.submitted ? (
          <p className='m-0 text-center text-sm'>
            Splendid, thank you!{' '}
            <span role='img' aria-label='Victory Hand emoji'>
              ✌️
            </span>
          </p>
        ) : (
          <p className='m-0 text-center text-sm'>Leave a reaction and let me know how I'm doing.</p>
        )}
      </div>

      <ul className='list-none p-0 m-0 flex items-center justify-center gap-3 pb-4'>
        {emojis.map((emoji, index) => {
          const { name, d } = emoji;
          return (
            <li key={index} className='m-0 p-0 w-10 h-10'>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <button
                        className={`group rounded-full transition-all duration-300 enabled:hover:scale-125 disabled:text-brand-guide text-brand-${emoji.color}`}
                        disabled={status.submitting || status.submitted}
                        onClick={() => handleReaction(name)}
                      >
                        {status.submitting && status.reaction === name ? (
                          <Loading />
                        ) : (
                          <svg
                            aria-labelledby={`reaction-${name}`}
                            xmlns='http://www.w3.org/2000/svg'
                            className='not-prose rounded-full w-full h-full transition-colors duration-300'
                            viewBox='0 0 32 32'
                            fill='currentColor'
                          >
                            <path d={d} />
                          </svg>
                        )}
                      </button>
                      <small className='block font-bold text-center text-brand-muted leading-4'>
                        {counts && counts[name] ? counts[name] : 0}
                      </small>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='border border-brand-guide bg-brand-background rounded px-2 py-1 text-xs capitalize shadow-lg select-none'
                      side='bottom'
                      sideOffset={-12}
                    >
                      {name}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </li>
          );
        })}
      </ul>
      <div className='flex gap-1 justify-center'>
        <small className='text-brand-secondary text-xs'>Powered by</small>
        <a href='https://bit.ly/paulie-neon' target='_blank' rel='noreferrer' className='text-xs'>
          Neon
        </a>
      </div>
    </div>
  );
};

Reactions.propTypes = {
  /** The slug to use when POSTing reaction */
  slug: PropTypes.string,
};

export default Reactions;
