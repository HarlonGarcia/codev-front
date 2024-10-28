import i18next from 'i18next';

type OrderByEnumValue = {
  id: string;
  value: string;
  label: string;
};

export const challengesOrderBy: Record<string, OrderByEnumValue> = {
  get POPULARITY() {
    return {
      id: 'popularity',
      value: 'popularity',
      label: i18next.t('pages.dashboard.challenges.filters.order.popularity'),
    };
  },
  get CREATED_AT() {
    return {
      id: 'created_at',
      value: 'created_at',
      label: i18next.t('pages.dashboard.challenges.filters.order.created_at'),
    };
  },
};
