import { Flag, PanelLeftClose, PanelLeftOpen, SquarePen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import Button from './Button';

const Nav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainControls = [
    {
      label: 'Nouvelle conversation',
      icon: <SquarePen size={16} className="shrink-0" />,
    },
    {
      label: 'Faire un signalement',
      icon: <Flag size={16} className="shrink-0" />,
    },
  ];
  const conversations = [
    'Précédente conversation avec un titre beaucoup trop long',
    'Encore une autre conversation avec un titre beaucoup trop long',
  ];
  const sideBarWidth = 260;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  return (
    <nav
      className={`${isCollapsed ? 'w-12' : `w-[${sideBarWidth.toString()}px]`} duration-200 ease-in-out shrink-0 border-r border-dark/10 dark:border-light/10 bg-darker-light dark:bg-darker-dark flex flex-col overflow-hidden`}
    >
      <div className="border-b border-dark/10 dark:border-light/10">
        <div className="flex shrink-0 justify-between items-center border-bx border-dark/10 dark:border-light/10 h-12 px-2 relative">
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="font-bold text-nowrap pl-2 select-none"
              >
                Local LLM Chat
              </motion.p>
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
          {mainControls.map((item) => (
            <Button
              variant="ghostText"
              className={`${isCollapsed && 'px-0 justify-center aspect-square'}`}
            >
              {item.icon}
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
          ))}
        </div>
      </div>
      <div className="overflow-y-scroll h-full px-2 py-2">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xs px-2 opacity-60 text-nowrap">
                Conversations récentes
              </p>
              {conversations.map((item) => (
                <Button variant="ghostText" className={``}>
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
        <button className="flex items-center px-1 -ml-1 rounded-sm py-1 gap-2 hover:bg-dark/10 dark:hover:bg-light/10 active:bg-dark/15 dark:active:bg-light/15 duration-100 cursor-pointer text-sm text-nowrap">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-dark dark:bg-light text-light dark:text-dark font-semibold text-sm h-8 aspect-square select-none">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {user.firstName} {user.lastName}
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
              <Button variant="classicYellow">Dashboard</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
