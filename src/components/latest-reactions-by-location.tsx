import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import Loading from "./loading";
import emojis from "../utils/emojis";
import { formatDateNumber } from "../utils/format-date";

interface Props {
  period: number;
}

const HappyAllCities = component$<Props>(({ period }) => {
  const data = useSignal(null);

  useVisibleTask$(async () => {
    try {
      const response = await fetch("/api/latest-reactions-by-location", {
        method: "POST",
        body: JSON.stringify({ period: period })
      });

      if (response.status !== 200) {
        throw new Error();
      }

      const result = await response.json();
      data.value = result.data;
    } catch (error) {
      data.value = [];
      console.error(error);
    }
  });

  return (
    <div class="m-0 p-0 border rounded border-brand-outline bg-brand-surface">
      <div class="p-4">
        <div class="rounded border border-brand-outline p-4 bg-brand-background h-[415px] overflow-y-hidden">
          {data.value && data.value.length > 0 ? (
            <div class="overflow-y-auto overflow-x-auto shadow-inner h-full">
              <table class="m-0 table-auto text-base">
                <thead class="font-medium border-b-2 border-b-brand-outline">
                  <tr>
                    <th class="p-4">Reaction</th>
                    <th class="p-4">Date</th>
                    <th class="p-4">Country</th>
                    <th class="p-4">City</th>
                    <th class="p-4">Title</th>
                  </tr>
                </thead>
                <tbody>
                  {data.value.map((row, index) => {
                    const { date, reaction, city, country, flag, title, slug } = row;

                    const svg = emojis.find((emoji) => emoji.name === reaction);

                    return (
                      <tr key={index} class="border-b-0 even:bg-brand-surface odd:bg-brand-background">
                        <td class="align-middle flex p-4 justify-center whitespace-nowrap">
                          <svg
                            role="img"
                            aria-label="reaction-happy"
                            xmlns="http://www.w3.org/2000/svg"
                            class={`not-prose mt-2 inline-block rounded-full w-5 h-5 fill-brand-${svg.color}`}
                            viewBox="0 0 32 32"
                            fill="currentColor"
                          >
                            <path d={svg.d} />
                          </svg>
                        </td>
                        <td class="align-middle p-4">{formatDateNumber(date)}</td>
                        <td class="align-middle flex items-center gap-2 p-4">
                          <span class="mt-1">{flag}</span>
                          {country}
                        </td>
                        <td class="align-middle p-4 whitespace-nowrap">{city}</td>
                        <td class="align-middle whitespace-nowrap p-4">
                          <a href={slug} class="text-sm">
                            {title}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div class="flex items-center justify-center text-center h-full">
              <div class="font-semibold text-lg text-center text-slate-500">No data</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HappyAllCities;
