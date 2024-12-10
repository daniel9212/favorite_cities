import { IconButton } from '@chakra-ui/react';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { logout } from '@/app/account/actions/logout';

export default function LogOutButton() {
  return (
    <form action={logout}>
      <IconButton
        type="submit"
        minW="8"
        h="8"
        borderRadius="50%"
        aria-label="Search database"
      >
        <LiaSignOutAltSolid />
      </IconButton>
    </form>
  );
}
