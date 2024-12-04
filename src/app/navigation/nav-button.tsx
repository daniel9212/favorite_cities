import Link from 'next/link';
import { type ButtonProps, Button } from '@chakra-ui/react';

interface NavButton extends ButtonProps {
  text: string;
  href:
    | string
    | {
        pathname: string;
        query: Record<string, string>;
      };
}

export default function NavButton({ text, href, ...buttonProps }: NavButton) {
  return (
    <Link href={href}>
      <Button {...buttonProps}>{text}</Button>
    </Link>
  );
}
