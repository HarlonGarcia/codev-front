import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { MdRoute } from 'react-icons/md';

import * as Popover from '@radix-ui/react-popover';

import * as S from './styles';

export default function Menu() {
  const { t } = useTranslation();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <S.PopoverTrigger aria-label='List all pages'>
          <MdRoute />
        </S.PopoverTrigger>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <S.Content>
            <S.Option href='/'>
              <AiFillHome />
              <span>{t('components.menu.home')}</span>
            </S.Option>
            <S.Option href='/challenges'>
              <FaCodeBranch />
              <span>{t('components.menu.challenges')}</span>
            </S.Option>
            <S.Option href='/signin'>
              <FiLogIn />
              <span>{t('components.menu.signin')}</span>
            </S.Option>
          </S.Content>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}