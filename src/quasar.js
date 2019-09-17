import Vue from 'vue';

import './styles/quasar.styl';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QSpace,
  QBtn,
  QBadge,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QAjaxBar,
  QSpinner,
  QInnerLoading,
  QCard,
  QCardSection,
  QCardActions,
  Ripple,
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QSpace,
    QBtn,
    QBadge,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QAjaxBar,
    QSpinner,
    QInnerLoading,
    QCard,
    QCardSection,
    QCardActions,
  },
  directives: {
    Ripple,
  },
  plugins: {
  },
});
