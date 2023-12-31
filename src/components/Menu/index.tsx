import * as Popover from '@radix-ui/react-popover';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { FaCodeBranch } from 'react-icons/fa';
import { MdRoute } from 'react-icons/md';

import * as S from './styles';

export default function Menu() {
  const { t } = useTranslation('translation', { keyPrefix: 'components.menu' });
  
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
              <span>{t('home')}</span>
            </S.Option>
            <S.Option href='/challenges'>
              <FaCodeBranch />
              <span>{t('challenges')}</span>
            </S.Option>
            <S.Option href='/signin'>
              <FiLogIn />
              <span>{t('signin')}</span>
            </S.Option>
          </S.Content>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}