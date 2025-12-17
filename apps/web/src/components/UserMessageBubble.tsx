import { Copy, Pencil } from 'lucide-react';
import Button from './ui/Button';

const UserMessageBubble = () => {
  return (
    <div className="w-full flex justify-end mb-4">
      <div className="flex flex-col gap-1 max-w-[500px] items-end group">
        <div className="bg-darker-light dark:bg-darker-dark border border-dark/10 dark:border-light/10 p-4 squircle rounded-3xl ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          nisl lacus, blandit a nunc sit amet, porttitor porta purus.
          Pellentesque dapibus at metus quis semper. Maecenas fringilla arcu id
          purus rutrum malesuada. Donec aliquet velit blandit, fermentum arcu
          at, finibus tellus. Proin mattis neque vitae pharetra facilisis.
          Maecenas gravida ante risus, in auctor orci dapibus et. Suspendisse
          sapien purus, sollicitudin id ultrices ac, auctor non dolor. Nulla
          cursus sodales iaculis. Nunc commodo justo ipsum, quis lacinia est
          volutpat nec. Ut vel sapien a est vehicula dapibus. Pellentesque
          tristique tortor mauris, quis ullamcorper est gravida sit amet.
          Phasellus non accumsan ex. Nulla et massa lectus. Sed erat diam,
          cursus sed quam a, consectetur laoreet nulla. Suspendisse finibus
          ligula non congue porta. Fusce eu maximus velit, a porttitor ligula.
          Curabitur sollicitudin massa tempus nunc finibus, ut hendrerit lorem
          volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Phasellus vel nunc cursus, congue dui
          non, pharetra ante. Mauris quis fermentum risus, id mattis ipsum. Sed
          dictum porta neque. Vestibulum scelerisque enim ut auctor vulputate.
          Cras non eros est. Cras nec tincidunt ligula. Ut cursus dolor ut ex
          sollicitudin cursus.
        </div>
        <div className="flex">
          <Button variant="ghostIcon">
            <Copy size={16} opacity={0.75} />
          </Button>
          <Button variant="ghostIcon">
            <Pencil size={16} opacity={0.75} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserMessageBubble;
