import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import { AppDispatch } from '../../store';
import { closeUserModal } from '../../store/features/userModalSlice';
import { useCustomSelector } from '../../store/useCustomSelector';
import { getUserById } from '../../store/features/userSlice';

interface UserModalProps {
  user: string;
}

export default function UserModal({ user: userId }: UserModalProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.dashboard.users.modal' });

  const dispatch = useDispatch<AppDispatch>();
  const { isUserModalOpened } = useCustomSelector((state) => state.userModal);
  const { currentUser } = useCustomSelector((state) => state.users);

  const closeModal = () => {
    dispatch(closeUserModal());
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getUserById(userId));
  }, [userId]);

  return (
    <S.Overlay state={isUserModalOpened ? 'opened' : 'closed'}>
      <S.Modal>
        <S.Header>
          <h2>{t('view.title')}</h2>
        </S.Header>
        <S.Content>
          <S.Field>
            <small>{t('view.info.name')}</small>
            <span>{currentUser?.name}</span>
          </S.Field>
          <S.Field>
            <small>{t('view.info.email')}</small>
            <span>{currentUser?.email}</span>
          </S.Field>
          <S.Field>
            <small>{t('view.info.github')}</small>
            <span>{currentUser?.githubUrl}</span>
          </S.Field>
          <S.Field>
            <small>{t('view.info.additional')}</small>
            <span>{currentUser?.additionalUrl}</span>
          </S.Field>
          <S.Field>
            <small>{t('view.info.created')}</small>
            <span>{currentUser?.createdAt.getFullYear()}</span>
          </S.Field>
          <S.Field>
            <small>{t('view.info.updated')}</small>
            <span>{currentUser?.updatedAt.getFullYear()}</span>
          </S.Field>
        </S.Content>
        <S.Footer>
          <button
            type="button"
            onClick={closeModal}
            className='cancel'
          >
            {t('view.cancel')}
          </button>
          <button
            type="button"
            className='delete'
          >
            {t('view.delete')}
          </button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
}
