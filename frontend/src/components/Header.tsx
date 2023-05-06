import UnstyledLink from './links/UnstyledLink';

export default function Header() {
  return (
    <header className='flex flex-row gap-2 p-1'>
      <UnstyledLink href='/'>
        <h1 className='text-xl font-bold'>jigsaw</h1>
      </UnstyledLink>
    </header>
  );
}
