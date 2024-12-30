import { auth } from '@root/auth';
import ProfilePopover from '@/app/navigation/profile-popover';
import NavButton from '@/app/navigation/nav-button';

export default async function UserSection() {
  const session = await auth();
  const { user: { id: userId, name } = {} } = session ?? {};

  return (
    <>
      {userId && <NavButton text="Favorites" href="/favorites" />}
      <ProfilePopover name={name} />
    </>
  );
}
