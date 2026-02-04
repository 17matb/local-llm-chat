import {
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

type Props = {
  mainControls: Array<{
    label: string;
    icon: LucideIcon;
    path?: string;
  }>;
  conversations?: Array<string>;
};

const Nav = ({ mainControls, conversations }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sideBarWidth = 260;
  const collapseDuration = 200;

  const user = {
    first_name: 'john',
    last_name: 'doe',
  };

  return (
    <nav
      style={{
        width: isCollapsed ? '3rem' : `${sideBarWidth}px`,
        transitionDuration: collapseDuration + 'ms',
      }}
      className="ease-in-out shrink-0 border-r border-fg-subtle/10 bg-bg-surface flex flex-col overflow-hidden"
    >
      <div className="border-b border-fg-subtle/10">
        <div className="flex shrink-0 justify-between items-center border-b border-fg-subtle/10 h-12 px-2 relative">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <Link to={{ pathname: '/' }}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: collapseDuration / 1000 }}
                  className="font-bold text-nowrap pl-2 select-none"
                >
                  Local LLM Chat
                </motion.p>
              </Link>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute right-2"
          >
            {isCollapsed ? (
              <PanelLeftOpen size={16} opacity={0.75} />
            ) : (
              <PanelLeftClose size={16} opacity={0.75} />
            )}
          </Button>
        </div>
        <div className={`py-2 px-2`}>
          {mainControls.map((item, index) => (
            <Link key={`main-controls-${index}`} to={{ pathname: item.path }}>
              <Button
                variant="ghost"
                size={isCollapsed ? 'icon-sm' : 'sm'}
                className={`w-full justify-start`}
              >
                <item.icon size={16} className="shrink-0" />
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: collapseDuration / 1000 }}
                      className="text-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden h-full px-2 py-2">
        <AnimatePresence initial={false}>
          {!isCollapsed && conversations && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: collapseDuration / 1000 }}
            >
              <p className="text-xs px-2 opacity-60 text-nowrap">
                Conversations récentes
              </p>
              {conversations.map((item, index) => (
                <Button
                  key={`conversations-${index}`}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  <span className="truncate">{item}</span>
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className={`flex shrink-0 w-full items-center justify-between gap-1 h-12 px-2 border-t border-fg-subtle/10 overflow-x-hidden`}
      >
        <Button
          variant="ghost"
          size={isCollapsed ? 'icon-sm' : 'sm'}
          className="w-full justify-start"
          style={{ paddingLeft: 4, paddingRight: 4 }}
        >
          <div className="flex shrink-0 uppercase items-center justify-center rounded-full bg-accent text-fg-on-accent font-semibold text-xs h-6 aspect-square select-none">
            {user!.first_name.charAt(0)}
            {user!.last_name.charAt(0)}
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: collapseDuration / 1000 }}
                className="flex flex-1 items-center justify-between min-w-0"
              >
                <p className="overflow-hidden text-nowrap min-w-0 truncate">
                  <span className="capitalize">{user!.first_name}</span>{' '}
                  <span className="capitalize">{user!.last_name[0]}.</span>
                </p>
                <ChevronsUpDown size={16} className="shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
