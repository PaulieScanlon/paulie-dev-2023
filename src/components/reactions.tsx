import { useState } from 'react';
import PropTypes from 'prop-types';
import reactions from '../utils/reactions';
import Loading from './loading';

const Reactions = ({ slug }) => {
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    reaction: '',
  });

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
    <div className='flex flex-col gap-8 justify-center border rounded border-brand-outline bg-brand-surface px-4 pt-8 pb-4'>
      <div className='flex flex-col gap-2'>
        <strong className='block text-center text-4xl text-brand-salmon'>Hey!</strong>

        {status.submitted ? (
          <p className='m-0 text-center text-sm'>
            Thanks!{' '}
            <span role='img' aria-label='Victory Hand emoji'>
              ✌️
            </span>
          </p>
        ) : (
          <p className='m-0 text-center text-sm'>Leave a reaction and let me know how I'm doing.</p>
        )}
      </div>

      <ul className='list-none p-0 m-0 flex items-center justify-center gap-3'>
        {reactions.map((reaction, index) => {
          const { name, d } = reaction;
          console.log(d);
          return (
            <li key={index} className='m-0 p-0 w-10 h-10'>
              <button
                className='group rounded-full border-2 border-brand-secondary transition-all duration-300 enabled:hover:scale-125 enabled:hover:border-brand-salmon disabled:text-brand-guide disabled:border-brand-outline'
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
            </li>
          );
        })}
      </ul>
      <div className='flex gap-1 justify-center'>
        <small className='text-brand-secondary text-xs'>Powered by</small>
        <a href='https://neon.tech/' target='_blank' rel='noreferrer' className='text-xs'>
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
