import { PanelLeftClose, PanelLeftOpen, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

type Props = {
  mainControls: Array<{
    label: string;
    icon: LucideIcon;
    path?: string;
  }>;
  conversations?: Array<string>;
  adminButton: { label: string; path: string };
};

const Nav = ({ mainControls, conversations, adminButton }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sideBarWidth = 260;

  const user = { first_name: 'john', last_name: 'doe' };

  return (
    <nav
      style={{ width: isCollapsed ? '3rem' : `${sideBarWidth}px` }}
      className="duration-200 ease-in-out shrink-0 border-r border-dark/10 dark:border-light/10 bg-darker-light dark:bg-darker-dark flex flex-col overflow-hidden"
    >
      <div className="border-b border-dark/10 dark:border-light/10">
        <div className="flex shrink-0 justify-between items-center border-bx border-dark/10 dark:border-light/10 h-12 px-2 relative">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <Link to={{ pathname: '/' }}>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="font-bold text-nowrap pl-2 select-none"
                >
                  Local LLM Chat
                </motion.p>
              </Link>
            )}
          </AnimatePresence>
          <Button
            variant="ghostIcon"
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
        <div className={`py-2 px-2 ${isCollapsed && ''}`}>
          {mainControls.map((item, index) => (
            <Link key={`main-controls-${index}`} to={{ pathname: item.path }}>
              <Button
                variant="ghostText"
                className={`w-full ${isCollapsed && 'px-0 justify-center aspect-square'}`}
              >
                <item.icon size={16} className="shrink-0" />
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-nowrap"
                    >
                      {item.label}
                    </motion.p>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="overflow-y-scroll h-full px-2 py-2">
        <AnimatePresence initial={false}>
          {!isCollapsed && conversations && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xs px-2 opacity-60 text-nowrap">
                Conversations récentes
              </p>
              {conversations.map((item, index) => (
                <Button
                  key={`conversations-${index}`}
                  variant="ghostText"
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
        className={`flex shrink-0 items-center justify-between w-[${sideBarWidth.toString()}px] gap-2 h-12 px-2 border-t border-dark/10 dark:border-light/10`}
      >
        <button className="flex items-center px-1 -ml-1 rounded-xl squircle py-1 gap-2 hover:bg-dark/10 dark:hover:bg-light/10 active:bg-dark/15 dark:active:bg-light/15 duration-100 cursor-pointer text-sm text-nowrap">
          <div className="flex shrink-0 uppercase items-center justify-center rounded-full bg-dark dark:bg-light text-light dark:text-dark font-semibold text-sm h-8 aspect-square select-none">
            {user!.first_name.charAt(0)}
            {user!.last_name.charAt(0)}
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="capitalize">{user!.first_name}</span>{' '}
                <span className="capitalize">{user!.last_name}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </button>
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link to={{ pathname: adminButton.path }}>
                <Button variant="smallClassicPrimary">
                  {adminButton.label}
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
