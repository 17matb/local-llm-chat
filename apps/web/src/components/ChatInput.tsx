import { useRef, useState } from 'react';
import Button from './ui/Button';
import { Send } from 'lucide-react';

const ChatInput = () => {
  const [content, setContent] = useState<string>('');
  const editableRef = useRef(null);

  const handleInput: React.FormEventHandler<HTMLDivElement> = (e) => {
    const text = e.currentTarget.innerText;
    if (e.currentTarget.textContent === '') {
      setContent('');
    } else {
      setContent(text);
    }
  };

  const handleSubmit = () => {
    if (content) {
      console.log(content);
    }
    if (editableRef.current) {
      editableRef.current.innerText = '';
      setContent('');
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] px-4 mx-auto mb-2 flex-none">
      <div className="flex gap-2 w-full mb-2">
        <div className="flex flex-col flex-1 justify-center bg-dark/5 dark:bg-light/5 rounded-3xl squircle min-h-12 px-4 py-2 border border-dark/10 dark:border-light/10 focus-within:border-dark/30 focus-within:dark:border-light/30 duration-100">
          {!content && (
            <div className="h-6 flex items-center absolute pointer-events-none opacity-50">
              Poser une question
            </div>
          )}
          <div
            ref={editableRef}
            contentEditable
            onInput={handleInput}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="min-h-6 max-h-60 w-full flex flex-col wrap-break-word overflow-y-scroll focus:outline-none"
          ></div>
        </div>
        <Button
          variant="largeClassicPrimaryIcon"
          onClick={handleSubmit}
          className="aspect-square px-2"
        >
          <Send size={20} className="-ml-0.5" />
        </Button>
      </div>
      <p className="text-center text-xs opacity-50">
        Local LLM Chat permet d'échanger avec une IA pouvant faire des erreurs.
        Veuillez vérifier les réponses.
      </p>
    </div>
  );
};

export default ChatInput;
