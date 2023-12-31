import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Command } from 'cmdk';

import './styles.scss';
import { goToShortcuts, extraShortcuts } from '../../utils/userOptions/shortcuts';
import { useCustomSelector } from '../../store/useCustomSelector';
import { toggleCommanderModal } from '../../store/features/commanderSlice';

export default function CmdDialog() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.commander.modal' });

  const dispatch = useDispatch();
  const { isModalOpened } = useCustomSelector((state) => state.commander);

  const toggleModal = () => {
    dispatch(toggleCommanderModal());
  };

  return (
    <Command.Dialog open={isModalOpened} onOpenChange={toggleModal}>
      <div className='commands_header'>
        <Command.Input 
          placeholder={t('input')}
        />
        <button onClick={toggleModal}>
          <IoClose />
        </button>
      </div>

      <Command.List>
        <Command.Group heading={t('go_to')}>
          {Object.values(goToShortcuts).map((command, index) => (
            <Command.Item
              key={index}
              onMouseDown={command.action}
            >
              <div className='commands_info'>
                {command.icon}
                {command.title}
              </div>
              <div className='commands_keys'>
                {command.keys.map((key) => (
                  <kbd key={key}>{key}</kbd>
                ))}
              </div>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading={t('extra')}>
          {
            Object.values(extraShortcuts).map((command, index) => (
              <Command.Item
                key={index}
                onMouseDown={command.action}
              >
                <div className='commands_info'>
                  {command.icon}
                  {command.title}
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
