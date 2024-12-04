import { Box, HStack } from '@chakra-ui/react';

import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';

export default function Navigation() {
  return (
    <Box bg="gray.300">
      <HStack as="nav" mx="auto" py="2.5" w="9/12" gap="6" top="0">
        <Box mr="auto">Logo</Box>
        <NavButton text="Home" href="/" />
        <NavButton text="Search" href="/search" />
        <NavButton text="Favorites" href="/favorites" />
        <ColorModeButton />
      </HStack>
    </Box>
  );
}
