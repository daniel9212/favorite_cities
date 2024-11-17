import { Box, HStack } from '@chakra-ui/react';

import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';

export default function Navigation() {
  return (
    <HStack
      bg="gray.300"
      as="nav"
      px="10"
      py="2.5"
      w="full"
      gap="6"
      position="fixed"
      top="0"
    >
      <Box mr="auto">Logo</Box>
      <NavButton text="Home" href="/" />
      <NavButton text="Search" href="/search" />
      <NavButton text="Favorites" href="/favorites" />
      <ColorModeButton />
    </HStack>
  );
}
