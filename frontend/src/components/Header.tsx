import UnstyledLink from './links/UnstyledLink';

const links = [{ href: '/compose/', label: 'compose' }];

export default function Header() {
  return (
    <header className='flex flex-row gap-8 p-1'>
      <UnstyledLink href='/'>
        <h1 className='text-xl font-bold'>jigsaw</h1>
      </UnstyledLink>

      <nav className='flex flex-col justify-end pb-0.5'>
        <ul className='flex items-center gap-x-4'>
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <UnstyledLink href={href} className='hover:text-gray-600'>
                {label}
              </UnstyledLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
