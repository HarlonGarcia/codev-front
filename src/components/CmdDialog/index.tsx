import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import { Command } from 'cmdk';

import './styles.scss';
import { toggleModal } from '../../store/features/commanderSlice';
import { useSelector } from '../../store/useSelector';
import { goToShortcuts, extraShortcuts } from '../../utils';

export default function CmdDialog() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { isModalOpened } = useSelector((state) => state.commander);

  return (
    <Command.Dialog
      open={isModalOpened}
      onOpenChange={() => dispatch(toggleModal())}
    >
      <div className='commands_header'>
        <Command.Input
          placeholder={t('components.commander.search.placeholder')}
        />
        <button onClick={() => dispatch(toggleModal())}>
          <IoClose />
        </button>
      </div>

      <Command.List>
        <Command.Group heading={t('components.commander.headings.pages')}>
          {Object.values(goToShortcuts).map(
            ({ action, icon, title, keys }, index) => (
              <Command.Item key={index} onMouseDown={action}>
                <div className='commands_info'>
                  {icon}
                  {title}
                </div>
                <div className='commands_keys'>
                  {keys.map((key) => (
                    <kbd key={key}>{key}</kbd>
                  ))}
                </div>
              </Command.Item>
            ),
          )}
        </Command.Group>

        <Command.Group heading={t('components.commander.headings.extra')}>
          {Object.values(extraShortcuts).map(
            ({ action, icon, title, keys }, index) => (
              <Command.Item key={index} onMouseDown={action}>
                <div className='commands_info'>
                  {icon}
                  {title}
                </div>
                <div className='commands_keys'>
                  {keys.map((key) => (
                    <kbd key={key}>{key}</kbd>
                  ))}
                </div>
              </Command.Item>
            ),
          )}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
