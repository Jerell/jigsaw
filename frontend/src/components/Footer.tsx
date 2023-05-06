import UnderlineLink from './links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='flex flex-row p-1'>
      <p>
        © {new Date().getFullYear()}{' '}
        <UnderlineLink href='https://jerell.me' openNewTab>
          Jerell James
        </UnderlineLink>
      </p>
    </footer>
  );
}
