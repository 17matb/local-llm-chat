import { Copy, Pencil } from 'lucide-react';
import { Button } from './ui/Button';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const UserMessageBubble = ({ children }: Props) => {
  return (
    <div className="w-full flex justify-end mb-4">
      <div className="flex flex-col gap-1 max-w-[500px] items-end group">
        <div className="bg-bg-surface border border-fg-subtle/10 p-4 squircle rounded-3xl ">
          {children}
        </div>
        <div className="flex">
          <Button variant="ghost" size="sm">
            <Copy size={16} opacity={0.75} />
          </Button>
          <Button variant="ghost" size="sm">
            <Pencil size={16} opacity={0.75} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserMessageBubble;
