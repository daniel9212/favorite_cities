import { Text } from '@chakra-ui/react';
import Link from 'next/link';

import { LinkButton } from '@/app/components/link-button';

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
        bg="transparent"
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
