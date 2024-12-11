'use client';

import { useState } from 'react';
import { IconButton, Button } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@/app/components/popover';
import { logout } from '@/app/account/actions/logout';

export default function ProfilePopover({ name }: { name?: string }) {
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!name;

  const onAuthClick = async () => {
    setOpen(false);

    if (isLoggedIn) {
      return await logout();
    }

    return redirect('/account/login');
  };

  return (
    <PopoverRoot
      positioning={{ placement: 'bottom-end' }}
      open={open}
      onOpenChange={e => setOpen(e.open)}
    >
      <PopoverTrigger asChild>
        <IconButton w="10" h="10" fontSize="xl" borderRadius="50%">
          {isLoggedIn && name.toLocaleUpperCase().at(0)}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent w="36">
        <PopoverBody p="0">
          <Button onClick={onAuthClick} justifyContent="left" w="full">
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
