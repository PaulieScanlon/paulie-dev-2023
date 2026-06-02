import { Slot, component$, useSignal, $, useOnDocument } from "@builder.io/qwik";

import TopNav from "../components/top-nav";
import SiteFooter from "../components/site-footer";
import SearchModal from "../components/search-modal";

import isNewContent from "../utils/is-new-content";

interface Props {
  fullWidth: boolean;
  wide?: boolean;
  slug: string;
  search: any;
}

const Layout = component$<Props>(({ fullWidth, wide, slug, search }) => {
  // Content width: full-bleed landing pages > posts (needs room for the TOC rail) > default reading column.
  const widthClass = fullWidth ? "max-w-8xl" : wide ? "max-w-6xl" : "max-w-5xl";
  const isModalOpen = useSignal(false);

  const newItems = search
    .map((item) => {
      const { date, base } = item;

      return {
        base: base,
        date: new Date(date)
      };
    })
    .filter((item) => {
      const { date } = item;
      if (isNewContent(date)) {
        return item;
      }
    })
    .reduce((items, item) => {
      const base = item.base;
      items[base] = (items[base] || 0) + 1;
      return items;
    }, {});

  const handleModal = $(() => {
    isModalOpen.value = !isModalOpen.value;
  });

  useOnDocument(
    "keydown",
    $((event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        handleModal();
      }
      if (event.key === "Escape" && isModalOpen.value) {
        handleModal();
      }
    })
  );

  return (
    <>
      <TopNav slug={slug} newItems={newItems} handleModal={handleModal} />
      <SearchModal search={search} isModalOpen={isModalOpen.value} handleModal={handleModal} />

      <div class="max-w-8xl mx-auto px-4 pt-[80px] sm:px-6 md:px-8">
        <main>
          <section class={`mx-auto px-0 pt-6 lg:px-16 lg:pt-10 ${widthClass}`}>
            <article class="max-w-none min-h-[calc(100vh-19rem)]">
              <Slot />
            </article>
          </section>
        </main>
      </div>

      <SiteFooter />
    </>
  );
});

export default Layout;
