import type { ReactNode } from 'react';
import { Container, Stack } from '@chakra-ui/react';

import Navigation from '@/app/navigation/navigation';

export default function LayoutWithNavigation({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Stack h="full" display="flex">
      <Navigation />
      <Container maxW="full" p="0" flex="1">
        {children}
      </Container>
    </Stack>
  );
}
