import React from 'react';

type Props = {
  title: string | null,
};

export const TodoInfo: React.FC<Props> = ({ title }) => {
  return (
    <h2 className="TodoInfo__title">
      {title}
    </h2>
  );
};
