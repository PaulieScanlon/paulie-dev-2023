import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import isNewContent from "../utils/is-new-content";

interface Props {
  date: Date;
}

const NewLabel = component$<Props>(({ date }) => {
  const isNew = useSignal(false);

  useTask$(() => {
    isNew.value = isNewContent(date);
  });

  return (
    <div class={`absolute right-0 top-0 h-16 w-16 ${isNew.value ? "block" : "hidden"}`}>
      <div class="absolute transform rotate-45 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary text-center text-brand-text font-bold shadow-lg right-[-60px] top-[16px] w-[170px] select-none">
        NEW
      </div>
    </div>
  );
});

export default NewLabel;
