import zod from 'zod';

const inputProps = {
  borderWidth: '2px',
  px: '0.75rem',
  outline: 'none',
};

export const logInFields = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    inputProps,
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    inputProps,
  },
];

export const signUpFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    inputProps,
  },
  ...logInFields,
];

export type UserAction = 'login' | 'signup';

const MIN_PASSWORD_LEN = 5;
const REQUIRED_ERROR = { message: 'This field is required!' };

const logInValidation = {
  email: zod.string().min(1, REQUIRED_ERROR).email('Email must be valid!'),
  password: zod
    .string()
    .min(MIN_PASSWORD_LEN, {
      message: `Password must be at least ${MIN_PASSWORD_LEN} characters long!`,
    }),
};

export type LogInPayloadKeys = keyof typeof logInValidation;

const signUpValidation = {
  name: zod.string().min(1, REQUIRED_ERROR),
  ...logInValidation,
};

export type SignUpPayloadKeys = keyof typeof signUpValidation;

export const generateUserSchema = (userAction: UserAction) => {
  if (userAction === 'login') {
    return zod.object(logInValidation);
  }

  return zod.object(signUpValidation);
};

export const applyAppropriateActionByUserAction = (userAction: UserAction) => {
  return <T>(login: T, signUp: T) => {
    switch (userAction) {
      case 'login':
        return login;
      case 'signup':
        return signUp;
    }
  };
};
