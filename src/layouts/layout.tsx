import { Slot, component$, useSignal, $ } from '@builder.io/qwik';

import Logo from '../components/logo';
import NavLink from '../components/nav-link';
import SiteSearch from '../components/site-search';

import { siteLinks, socialLinks } from './nav-links';

interface Props {
  fullWidth: boolean;
  slug: string;
  site: string;
}

const Layout = component$<Props>(({ fullWidth, slug, site }) => {
  console.log('Layout: ', site);
  const isNavOpen = useSignal(false);

  const handleNav = $(() => {
    isNavOpen.value = !isNavOpen.value;
  });

  return (
    <>
      <header class='fixed top-0 z-40 w-full backdrop-blur border-b border-b-brand-outline flex-none bg-brand-background lg:bg-transparent'>
        <div class='max-w-8xl mx-auto'>
          <div class='py-4 mx-4 lg:px-8 lg:mx-0'>
            <div class='relative flex items-center gap-8'>
              <a class='flex items-center' href='/' aria-current='page'>
                <span class='sr-only'>Paul Scanlon's Site</span>
                <Logo />
              </a>
              <div class='relative flex lg:hidden items-center ml-auto'>
                <button
                  id='menu'
                  class='not-prose ml-auto flex items-center justify-center text-brand-text'
                  onClick$={handleNav}
                >
                  <span class='sr-only'>Navigation</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      id='menuPath'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d={isNavOpen.value ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class='relative'>
        <div
          id='lightbox'
          aria-label='lightbox'
          tab-index='0'
          role='button'
          class={`z-20 top-0 left-0 w-screen  h-screen bg-black opacity-80 ${
            isNavOpen.value ? 'fixed' : 'hidden'
          } lg:hidden`}
          onClick$={handleNav}
        ></div>

        <div class='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
          <div
            id='sidebar'
            class={`lg:block fixed z-30 inset-0 top-[3.8125rem] transition-all duration-300 right-auto w-[14.5rem] py-4 px-6 overflow-y-auto border-r border-brand-outline bg-brand-background lg:left-[max(0px,calc(50%-45rem))] ${
              isNavOpen.value ? 'left-[max(0px,calc(50%-45rem))]' : '-left-[240px]'
            }`}
          >
            <div class='relative pt-6'>
              <ul class='flex flex-col gap-2 m-0 p-0 list-none'>
                <li class='m-0 p-0'>
                  <SiteSearch site={site} />
                </li>
                {siteLinks.map((item, index) => {
                  const { title, icon, link } = item;
                  const s = slug.slice(1);
                  const l = link.slice(1);

                  const isActive = s.length <= 0 && s.startsWith(l) ? true : l.length > 0 && s.startsWith(l);

                  return (
                    <li key={index} class='m-0 p-0'>
                      <NavLink title={title} icon={icon} slug={link} isActive={isActive} />
                    </li>
                  );
                })}
              </ul>
              <hr class='border border-brand-outline my-8' />
              <ul class='flex flex-col gap-2 m-0 p-0 list-none'>
                {socialLinks.map((item, index) => {
                  const { url, title, icon, rel } = item;
                  return (
                    <li key={index} class='m-0 p-0'>
                      <a
                        href={url}
                        target='_blank'
                        rel={`noreferrer ${rel}`}
                        class='not-prose inline-flex items-center gap-3 rounded-full px-3 py-2 border-transparent hover:bg-brand-surface border hover:border-brand-outline transition-colors duration-300 text-slate-400 hover:text-brand-text'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
                          <path stroke-linecap='round' stroke-linejoin='round' d={icon} />
                        </svg>
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <main class='lg:pl-[12.5rem]'>
            <section
              class={`mx-auto px-0 py-6 lg:px-16 lg:py-10 mt-[72px] max-w-none xl:ml-0 ${
                fullWidth ? '' : 'xl:mr-[15.5rem]'
              }`}
            >
              <article class='max-w-none min-h-[calc(100vh-19rem)]'>
                <Slot />
              </article>
            </section>
          </main>
        </div>
      </div>
    </>
  );
});

export default Layout;
