import { Box, HStack } from '@chakra-ui/react';

import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';

export default function Navigation() {
  return (
    <HStack as="nav" px="10" w="full" position="fixed">
      <Box mr="auto">Logo</Box>
      <NavButton text="Home" href="/" />
      <NavButton text="Search" href="/search" />
      <NavButton text="Favorites" href="/favorites" />
      <ColorModeButton />
    </HStack>
  );
}
