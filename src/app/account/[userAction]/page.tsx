'use client';

import { use } from 'react';
import { type FormEvent, type FormEventHandler, useState } from 'react';
import { Button, Card, Input, Stack } from '@chakra-ui/react';

import { Field } from '@/app/components/field';
import { PasswordInput } from '@/app/components/password-input';
import {
  type UserAction,
  LogInPayloadKeys,
  SignUpPayloadKeys,
  logInFields,
  signUpFields,
  generateUserSchema,
  applyAppropriateActionByUserAction,
} from '@/app/account/utils.ts';
import { logIn } from '@/app/account/actions/logIn';
import { signUp } from '@/app/account/actions/signup';
import UserActionSwitch from '@/app/account/[userAction]/user-action-switch';

interface UserFormProps {
  params: Promise<{
    userAction: UserAction;
  }>;
}

type formFieldKeys = LogInPayloadKeys | SignUpPayloadKeys;

export default function UserForm({ params }: UserFormProps) {
  const { userAction } = use(params);
  const [errors, setErrors] = useState<
    Record<formFieldKeys, string[]> | Record<string, never[]>
  >({});

  // TODO: Redirect if userAction is different from "login" or "signup"

  const applyAppropriateAction = applyAppropriateActionByUserAction(userAction);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formDataEntries = new FormData(ev.currentTarget);
    const formData = Object.fromEntries(formDataEntries);

    const { error, success } =
      generateUserSchema(userAction).safeParse(formData);

    if (!success) {
      setErrors(error.flatten().fieldErrors as Record<formFieldKeys, string[]>);
      return;
    }

    const hasPreviousErrors = Object.keys(errors).length !== 0;
    if (hasPreviousErrors) {
      setErrors({});
    }

    try {
      if (userAction === 'login') {
        await logIn(formData as Record<LogInPayloadKeys, string>);
      } else {
        await signUp(formData as Record<SignUpPayloadKeys, string>);
      }
    } catch (error) {
      // TODO: Add notification for displaying error
      console.error(error);
    }
  };

  return (
    <Card.Root
      key={userAction}
      maxW="sm"
      as="form"
      onSubmit={onSubmit as unknown as FormEventHandler<HTMLDivElement>}
    >
      <Card.Header minW="80">
        <Card.Title
          as="h3"
          textAlign="center"
          fontWeight="bold"
          textStyle="2xl"
        >
          {applyAppropriateAction('Log In', 'Sign up')}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          {applyAppropriateAction(logInFields, signUpFields).map(
            ({ name, label, type, inputProps }) => {
              const currentTextError = (
                errors as Record<string, string[]> | Record<string, never[]>
              )[name]?.[0];
              return (
                <Field
                  errorText={currentTextError}
                  invalid={!!currentTextError}
                  key={name}
                  label={label}
                >
                  {type === 'password' ? (
                    <PasswordInput name={name} {...inputProps} />
                  ) : (
                    <Input name={name} {...inputProps} />
                  )}
                </Field>
              );
            },
          )}
        </Stack>
      </Card.Body>
      <Card.Footer flexWrap="wrap" justifyContent="center">
        <Button
          type="submit"
          w="full"
          bgColor="blue.900"
          color="white"
          variant="solid"
        >
          {applyAppropriateAction('Log In', 'Sign up')}
        </Button>
        <UserActionSwitch
          {...applyAppropriateAction(
            {
              beforeMessage: "Don't have an account yet?",
              switchToURL: '/account/signup',
              switchToMessage: 'Sign Up',
            },
            {
              beforeMessage: 'Already have an account?',
              switchToURL: '/account/login',
              switchToMessage: 'Log In',
            },
          )}
        />
      </Card.Footer>
    </Card.Root>
  );
}
