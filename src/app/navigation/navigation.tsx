import { Box, HStack } from '@chakra-ui/react';

import ProfilePopover from '@/app/navigation/profile-popover';
import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';
import { auth } from '@root/auth';

export default async function Navigation() {
  const session = await auth();
  const { user: { id: userId, name } = {} } = session ?? {};

  return (
    <Box bg="gray.300">
      <HStack as="nav" mx="auto" py="2.5" w="9/12" gap="6" top="0">
        <Box mr="auto">Logo</Box>
        <NavButton text="Home" href="/" />
        <NavButton text="Search" href="/search" />
        {userId && <NavButton text="Favorites" href="/favorites" />}
        <ProfilePopover name={name} />
        <ColorModeButton />
      </HStack>
    </Box>
  );
}
