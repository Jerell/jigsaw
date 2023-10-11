import UnderlineLink from './links/UnderlineLink';
import UnstyledLink from './links/UnstyledLink';

const links = [
  // { href: '/compose/', label: 'compose' },
  // { href: '/broken/', label: 'broken' },
  // { href: '/results/', label: 'results' },
  // { href: '/test/', label: 'test' },
  { href: '/pipe/', label: 'pipe' },
];

export default function Header() {
  return (
    <header className='flex flex-col items-center p-1 w-full' id='header'>
      <p className='text-xs self-start'>
        © {new Date().getFullYear()}{' '}
        <UnderlineLink href='https://paceccs.com/' openNewTab>
          Pace CCS
        </UnderlineLink>
      </p>

      <div className='flex-flex-col text-center 2xl:max-w-2xl w-full'>
        <UnstyledLink href='/'>
          <h1 className='text-xl'>CCSTwin</h1>
        </UnstyledLink>
      </div>

      <nav className='flex flex-col justify-end pb-0.5'>
        <ul className='flex items-center gap-x-4'>
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <UnstyledLink href={href}>{label}</UnstyledLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
