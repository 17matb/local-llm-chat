import Button from './components/ui/Button';
import Nav from './components/Nav';
import { ChevronDown, Flag, SquarePen } from 'lucide-react';
import UserMessageBubble from './components/UserMessageBubble';
import LLMAnswer from './components/LLMAnswer';
import ChatInput from './components/ChatInput';

const Chat = () => {
  const mainControls = [
    {
      label: 'Nouvelle conversation',
      icon: SquarePen,
      path: '/new-chat',
    },
    {
      label: 'Faire un signalement',
      icon: Flag,
      path: '/report',
    },
  ];
  const conversations = [
    'Précédente conversation avec un titre beaucoup trop long',
    'Encore une autre conversation avec un titre beaucoup trop long',
  ];

  return (
    <div className="h-dvh w-full flex">
      <Nav
        mainControls={mainControls}
        conversations={conversations}
        adminButton={{ label: 'Dashboard', path: '/admin' }}
      />
      <div className="w-full">
        <header className="flex items-center h-12 px-2 border-b border-dark/10 dark:border-light/10">
          <Button variant="ghostText">
            Titre de la conversation <ChevronDown size={16} />
          </Button>
        </header>
        <main className="flex flex-col h-[calc(100dvh-3rem)] w-full">
          <div className="flex-1 w-full overflow-y-scroll py-4">
            <div className="flex flex-col max-w-[800px] px-4 mx-auto">
              <UserMessageBubble />
              <LLMAnswer />
              <UserMessageBubble />
              <LLMAnswer />
            </div>
          </div>
          <ChatInput />
        </main>
      </div>
    </div>
  );
};

export default Chat;
