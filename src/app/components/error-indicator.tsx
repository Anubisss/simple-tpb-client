'use client';

import React, { FC } from 'react';

interface Props {
  message: string;
}

const ErrorIndicator: FC<Props> = ({ message }) => {
  return <div className="text-xl text-red-500 text-center mt-10">{message}</div>;
};

export default ErrorIndicator;
