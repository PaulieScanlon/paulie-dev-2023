import { component$, useSignal, $ } from '@builder.io/qwik';

interface Props {
  search: any;
}
const SiteSearch = component$<Props>(({ search }) => {
  const isListOpen = useSignal(false);
  const all = useSignal(search);
  const filtered = useSignal(search);

  const handleList = $(() => {
    isListOpen.value = !isListOpen.value;
  });

  const handleChange = $((event) => {
    const {
      target: { value },
    } = event;

    const results = all.value.filter((item) => {
      const { title } = item;

      if (title.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
    });

    if (value) {
      filtered.value = results;
    } else {
      filtered.value = all.value;
    }
  });

  return (
    <div class='relative'>
      <div class=' w-full flex justify-between items-center font-medium transition-all duration-300 rounded border border-brand-outline bg-surface px-3 py-2 hover:text-white hover:bg-brand-muted/20'>
        <input
          type='search'
          placeholder='Search'
          class='basis-full bg-transparent text-white placeholder:text-brand-tertiary focus:outline-none bg-surface'
          onInput$={handleChange}
          onFocusIn$={handleList}
          onFocusOut$={handleList}
        />
      </div>
      <div class='absolute top-12'>
        {isListOpen.value && filtered.value.length > 0 ? (
          <ul class='list-none m-0 p-0 bg-brand-surface border border-brand-outline overflow-auto h-[300px]'>
            {filtered.value.map((item, index) => {
              const { title } = item;

              return (
                <li key={index} class='text-xs p-2'>
                  {title}
                </li>
              );
            })}
          </ul>
        ) : (
          <div class='bg-brand-surface border border-brand-outline p-2'>No Results.</div>
        )}
      </div>
    </div>
  );
});

export default SiteSearch;
