import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';
import { MdExpandMore } from 'react-icons/md';

import * as Popover from '@radix-ui/react-popover';

import './styles.scss';

interface CardPopoverProps {
  github?: string;
  additional?: string;
}

export default function CardPopover({ github, additional }: CardPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <MdExpandMore />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <div className='popover-content'>
            {github && (
              <a href={github} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            )}
            {additional && (
              <a href={additional} target="_blank" rel="noreferrer">
                <ImLink />
              </a>
            )}
          </div>
          <Popover.Arrow className="popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
