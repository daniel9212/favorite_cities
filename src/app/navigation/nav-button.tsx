import Link from 'next/link';
import { Button } from '@chakra-ui/react';

interface NavButton {
  text: string;
  href: string;
}

export default function NavButton({ text, href }: NavButton) {
  return (
    <Link href={href}>
      <Button>{text}</Button>
    </Link>
  );
}
