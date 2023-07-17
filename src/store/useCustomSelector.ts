import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '.';

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;