import * as UI_SELECTORS from './uiSelectors';
import * as USER_SELECTORS from './userSelectors';
import * as NOTIFICATIONS_SELECTORS from './notificationsSelectors';
import * as CATEGORIES_SELECTORS from './categoriesSelectors';

export default {
  ...UI_SELECTORS,
  ...USER_SELECTORS,
  ...NOTIFICATIONS_SELECTORS,
  ...CATEGORIES_SELECTORS
};
