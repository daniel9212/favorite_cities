'use client';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return `${error}`;
};

export const getServerErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, field] = error.message.split(': ')[2].split('.');
      return `The ${field} already exists. Please choose another.`;
    }

    if (error.message.includes('FOREIGN KEY constraint failed')) {
      return 'A related record is missing. Please check your data.';
    }

    if (error.message.includes('NOT NULL constraint failed')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, field] = error.message.split(': ')[2].split('.');
      return `The field ${field} cannot be empty.`;
    }
  }

  return getErrorMessage(error);
};
