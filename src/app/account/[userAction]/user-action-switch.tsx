import { Text } from '@chakra-ui/react';
import Link from 'next/link';

import { LinkButton } from '@/components/ui/link-button';

interface UserActionSwitchProps {
  beforeMessage: string;
  switchToURL: string;
  switchToMessage: string;
}

export default function UserActionSwitch({
  beforeMessage,
  switchToURL,
  switchToMessage,
}: UserActionSwitchProps) {
  return (
    <Text textAlign="center" fontSize="0.75rem">
      {beforeMessage}
      <LinkButton
        bg="white"
        fontSize="0.75rem"
        h="fit-content"
        color="blue.500"
        fontWeight="bolder"
        px="0.5rem"
        mt="-0.125rem"
        as={Link}
        href={switchToURL}
      >
        {switchToMessage}
      </LinkButton>
    </Text>
  );
}
