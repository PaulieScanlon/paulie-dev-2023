import { component$ } from '@builder.io/qwik';

interface Props {
  title: string;
  icon: string;
  slug: string;
  isActive: boolean;
}

const NavLink = component$<Props>(({ title, icon, slug, isActive }) => {
  return (
    <a
      href={slug}
      class={`not-prose inline-flex items-center gap-3 rounded-full px-3 pr-4 py-2 border-transparent hover:bg-brand-surface border hover:border-brand-outline transition-colors duration-300 ${
        isActive ? 'text-brand-primary' : 'hover:text-brand-text text-slate-300'
      }`}
    >
      <svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
        <path stroke-linecap='round' stroke-linejoin='round' d={icon}></path>
      </svg>
      {title}
    </a>
  );
});

export default NavLink;
