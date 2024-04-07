import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';

import { RootState } from '.';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
