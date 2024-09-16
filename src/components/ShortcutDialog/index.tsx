import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Command } from 'cmdk';
import { GlobalContext } from 'contexts/GlobalContext';
import { IoClose } from 'react-icons/io5';

import { extraShortcuts, goToShortcuts } from './utils';

import './styles.scss';

export default function ShortcutDialog() {
  const { t } = useTranslation();
  const {
    isShortcutDialogVisible: isVisible,
    setIsShortcutDialogVisible: setIsVisible,
  } = useContext(GlobalContext);

  const toggleModal = () => {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <Command.Dialog
      open={isVisible}
      onOpenChange={toggleModal}
    >
      <div className='commands_header'>
        <Command.Input
          placeholder={t('components.commander.search.placeholder')}
        />
        <button onClick={toggleModal}>
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
