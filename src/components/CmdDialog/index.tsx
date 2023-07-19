import { Command } from 'cmdk';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import './styles.scss';
import { goToShortcuts, extraShortcuts } from '../../utils/shortcuts';
import { useCustomSelector } from '../../store/useCustomSelector';
import { toggleCommanderModal } from '../../store/features/commander-slice';

export default function CmdDialog() {
  const { isOpen } = useCustomSelector((state) => state.commander);
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggleCommanderModal());
  };

  return (
    <Command.Dialog open={isOpen} onOpenChange={toggleModal}>
      <div className='commands_header'>
        <Command.Input placeholder='O que você deseja?' />
        <button onClick={toggleModal}>
          <IoClose />
        </button>
      </div>

      <Command.List>
        <Command.Group heading="Ir para">
          {Object.values(goToShortcuts).map((command) => (
            <Command.Item
              key={command.keys[0]}
              onMouseDown={command.action}
            >
              <div className='commands_info'>
                {command.icon}
                <span>
                  {command.title}
                </span>
              </div>
              <div className='commands_keys'>
                {command.keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </div>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Extra">
          {
            Object.values(extraShortcuts).map((command) => (
              <Command.Item
                key={command.keys[0]}
                onMouseDown={command.action}
              >
                <div className='commands_info'>
                  {command.icon}
                  <span>{command.title}</span>
                </div>
                <div className='commands_keys'>
                  {command.keys.map((key) => (
                    <kbd key={key}>{key}</kbd>
                  ))}
                </div>
              </Command.Item>
            ))
          }
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
