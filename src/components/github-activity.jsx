import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { octokit } from '../clients/octokit';

import Loading from './loading';
import { formatDate } from '../utils/format-date';

const GitHubActivity = component$(() => {
  const data = useSignal(null);

  useVisibleTask$(async () => {
    try {
      const response = await octokit.request('GET /users/{username}/events/public', {
        username: 'PaulieScanlon',
        per_page: 20,
      });

      if (response.status !== 200) {
        throw new Error();
      }

      data.value = response.data;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className='m-0 p-0 border rounded border-brand-outline bg-brand-surface'>
      <div className='p-4'>
        <div className='rounded border border-brand-outline p-4 bg-brand-background h-96 overflow-y-hidden'>
          {data.value ? (
            <>
              <ul className='flex flex-col gap-4 list-none m-0 p-0 overflow-y-auto overflow-x-hidden h-[355px]'>
                {data.value.map((item, index) => {
                  const cleanRepoUrl = (url) => {
                    url = url.replace('https://api.', 'https://');
                    url = url.replace('/repos', '');
                    return url;
                  };
                  const {
                    type,
                    actor: { login },
                    repo: { name, url },
                    payload: { commits },
                    created_at,
                  } = item;
                  return (
                    <li
                      key={index}
                      className='flex flex-col gap-4 m-0 p-4 rounded border border-brand-outline bg-brand-surface'
                    >
                      <div>
                        <strong className='text-lg flex items-center gap-2 leading-tight'>
                          <span className={`block event-color-${type} rounded-full w-3 h-3`} />
                          Event: <small>{type}</small>
                        </strong>
                        <time className='text-sm font-medium text-brand-secondary'>{formatDate(created_at, true)}</time>
                      </div>

                      <div>
                        <strong className='text-lg flex items-center gap-2 leading-tight'>
                          User: <small>{login}</small>
                        </strong>
                        <strong className='text-lg flex items-center gap-2 leading-tight'>
                          Repo:
                          <a href={cleanRepoUrl(url)} target='_blank' rel='noopener' className='text-sm'>
                            {name}
                          </a>
                        </strong>
                      </div>

                      {commits ? (
                        <div className='flex flex-col gap-1'>
                          <div className='flex gap-2'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5 stroke-brand-salmon'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                              />
                            </svg>
                            <strong className='text-base'>{`Message${commits.length > 1 ? 's' : ''}`}</strong>
                          </div>
                          <ul className='my-0'>
                            {commits?.map((commit, index) => {
                              const { message } = commit;
                              return (
                                <li key={index} className='text-sm my-1'>
                                  {message}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default GitHubActivity;
