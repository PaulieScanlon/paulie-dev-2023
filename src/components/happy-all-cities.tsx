import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { formatNumber } from '../utils/format-number';

import Loading from './loading';
import emojis from '../utils/emojis';

interface Props {
  period: number;
}

const HappyAllCities = component$<Props>(({ period }) => {
  const data = useSignal(null);
  const happy = emojis.find((emoji) => emoji.name === 'happy');

  useVisibleTask$(async () => {
    try {
      const response = await fetch('/api/happy-by-city', {
        method: 'POST',
        body: JSON.stringify({ period: period }),
      });

      if (response.status !== 200) {
        throw new Error();
      }

      const result = await response.json();

      data.value = result.data;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div class='m-0 p-0 border rounded border-brand-outline bg-brand-surface'>
      <div class='p-4'>
        <div class='rounded border border-brand-outline p-4 bg-brand-background h-96 overflow-y-hidden'>
          {data.value ? (
            <div class='overflow-y-auto overflow-x-hidden h-[355px]'>
              <table class='m-0 table-auto text-base'>
                <thead class='font-medium border-b-2 border-b-brand-outline'>
                  <tr>
                    <th class='p-4'>City</th>
                    <th class='px-0 py-4'>Country</th>
                    <th class='p-4 text-right'>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {data.value.map((row, index) => {
                    const { city, country, flag, count } = row;
                    return (
                      <tr key={index} class='border-b-0 even:bg-brand-surface odd:bg-brand-background'>
                        <td class='align-middle p-4 whitespace-nowrap'>
                          <svg
                            aria-labelledby={`reaction-${name}`}
                            xmlns='http://www.w3.org/2000/svg'
                            class='not-prose mr-2 inline-block rounded-full w-5 h-5 transition-colors duration-300 fill-brand-tertiary'
                            viewBox='0 0 32 32'
                            fill='currentColor'
                          >
                            <path d={happy.d} />
                          </svg>
                          {city}
                        </td>

                        <td class='px-0 py-4'>{`${country} ${flag}`}</td>
                        <td class='text-right font-bold p-4'>{`x${formatNumber(count)}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div class='flex items-center justify-center h-full'>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HappyAllCities;
