type Props = {
  content: string;
};

const LLMAnswer = ({ content }: Props) => {
  return <div className="mb-8">{content}</div>;
};

export default LLMAnswer;
