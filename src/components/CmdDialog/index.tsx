import { Command } from 'cmdk';
import { FaCodeBranch, FaInfoCircle, FaBook, FaUserCircle, FaCopy, FaGithub } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import './styles.scss';

interface CmdDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void; // eslint-disable-line no-unused-vars
}

const goToCommands = [
  {
    icon: <AiFillHome />,
    title: 'Ínicio',
    keys: ['H'],
    action: () => {
      console.log('Challenges');
    }
  },
  {
    icon: <FaCodeBranch />,
    title: 'Desafios',
    keys: ['C'],
    action: () => {
      console.log('Challenges');
    }
  },
  {
    icon: <FaInfoCircle />,
    title: 'Sobre',
    keys: ['A'],
    action: () => {
      console.log('Challenges');
    }
  },
  {
    icon: <FaBook />,
    title: 'Dicas',
    keys: ['T'],
    action: () => {
      console.log('Tips');
    }
  },
  {
    icon: <FaUserCircle />,
    title: 'Meu perfil',
    keys: [ 'F', 'SPACE' ],
    action: () => {
      console.log('Tips');
    }
  },
];

const extraCommands = [
  {
    icon: <FaCopy />,
    title: 'Copiar url',
    keys: ['U'],
    action: () => {
      console.log('Challenges');
    }
  },
  {
    icon: <FaGithub />,
    title: 'Ver github',
    keys: ['G'],
    action: () => {
      console.log('Challenges');
    }
  },
];

export default function CmdDialog({ open, setOpen }: CmdDialogProps) {
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <div className='commands_header'>
        <Command.Input placeholder='O que você deseja?' />
        <button onClick={handleClose}>
          <IoClose />
        </button>
      </div>

      <Command.List>
        <Command.Group heading="Ir para">
          {goToCommands.map((command) => (
            <Command.Item
              key={command.title}
              onClick={command.action}
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
            extraCommands.map((command) => (
              <Command.Item
                key={command.title}
                onClick={command.action}
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
