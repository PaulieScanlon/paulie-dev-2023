import { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';

const icons = [
  {
    reaction: 'neutral',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M20,24h-8v-2h8V24z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z"/>',
    ],
  },

  {
    reaction: 'happy',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,1.3,2,3s-0.9,3-2,3s-2-1.3-2-3S20.9,8,22,8z M10,8c1.1,0,2,1.3,2,3s-0.9,3-2,3s-2-1.3-2-3S8.9,8,10,8z M16,28c-5.2,0-9.5-4.4-10-9.9c2.9,1.7,6.4,2.7,10,2.7s7.1-1,10-2.7C25.5,23.6,21.2,28,16,28L16,28z" />',
    ],
  },
  {
    reaction: 'cool',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M16,26c-1.5,0-2.9-0.3-4.2-0.9l1-1.7c1,0.4,2.1,0.7,3.2,0.7c2.9,0,5.5-1.6,6.9-3.9l1.7,1C22.8,24.1,19.6,26,16,26L16,26z M26,12c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2h-4c0,1.1-0.9,2-2,2H8c-1.1,0-2-0.9-2-2V9c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v1h4V9c0-0.6,0.5-1,1-1h6c0.5,0,1,0.4,1,1V12z"/>',
    ],
  },
  {
    reaction: 'tongue',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z M24,20h-2v3c0,1.7-1.3,3-3,3s-3-1.3-3-3v-3H8v-2h16V20z M22,12c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S23.1,12,22,12z"/>',
    ],
  },
  {
    reaction: 'sad',
    paths: [
      '<path d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M22,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S20.9,8,22,8z M10,8c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S8.9,8,10,8z M22,24.4c-1.2-2-3.5-3.4-6-3.4s-4.8,1.4-6,3.4l-2.6-1.5C9.2,19.9,12.4,18,16,18s6.8,1.9,8.6,4.9L22,24.4z"/>',
    ],
  },
];

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
        {icons.map((icon, index) => {
          const { reaction, paths } = icon;

          return (
            <li key={index} className='m-0 p-0 w-10 h-10'>
              <button
                className='group rounded-full border-2 border-brand-secondary transition-all duration-300 enabled:hover:scale-125 enabled:hover:border-brand-salmon disabled:text-brand-guide disabled:border-brand-outline'
                disabled={status.submitting || status.submitted}
                onClick={() => handleReaction(reaction)}
              >
                {status.submitting && status.reaction === reaction ? (
                  <Loading />
                ) : (
                  <svg
                    aria-labelledby={`reaction-${reaction}`}
                    xmlns='http://www.w3.org/2000/svg'
                    className='not-prose rounded-full w-full h-full transition-colors duration-300'
                    viewBox='0 0 32 32'
                    fill='currentColor'
                  >
                    <g key={index} dangerouslySetInnerHTML={{ __html: paths.map((path) => path) }} />
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
