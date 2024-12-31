import { IconButton } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Box, HStack } from '@chakra-ui/react';

import { ColorModeButton } from '@/app/components/color-mode';
import NavButton from '@/app/navigation/nav-button';
import UserSection from '@/app/navigation/user-section';

export default async function Navigation() {
  return (
    <Box bg="gray.300">
      <HStack as="nav" mx="auto" py="2.5" w="10/12" gap="6" top="0">
        <Box mr="auto">Logo</Box>
        <NavButton text="Home" href="/" />
        <NavButton text="Search" href="/search" />
        <Suspense
          fallback={
            <IconButton w="10" h="10" fontSize="xl" borderRadius="50%" />
          }
        >
          <UserSection />
        </Suspense>
        <ColorModeButton />
      </HStack>
    </Box>
  );
}
