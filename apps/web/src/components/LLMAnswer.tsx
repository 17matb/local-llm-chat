import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const LLMAnswer = ({ children }: Props) => {
  return <div className="mb-8">{children}</div>;
};

export default LLMAnswer;
