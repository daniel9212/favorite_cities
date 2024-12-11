import { Box, HStack } from '@chakra-ui/react';

import LogOutButton from '@/app/navigation/logout-button';
import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';
import { auth } from '@root/auth';

export default async function Navigation() {
  const session = await auth();
  return (
    <Box bg="gray.300">
      <HStack as="nav" mx="auto" py="2.5" w="9/12" gap="6" top="0">
        <Box mr="auto">Logo</Box>
        <NavButton text="Home" href="/" />
        <NavButton text="Search" href="/search" />
        {session && <NavButton text="Favorites" href="/favorites" />}
        <LogOutButton />
        <ColorModeButton />
      </HStack>
    </Box>
  );
}
