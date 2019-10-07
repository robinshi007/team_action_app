import ViewEmpty from '../layouts/ViewEmpty.vue';
import NoteSidebar from '../pages/note/NoteSidebar.vue';
import CategoryList from '../pages/note/CategoryList.vue';
import CategoryDetail from '../pages/note/CategoryDetail.vue';
import CategoryNew from '../pages/note/CategoryNew.vue';
import CategoryEdit from '../pages/note/CategoryEdit.vue';
import NoteList from '../pages/note/NoteList.vue';
import NoteDetail from '../pages/note/NoteDetail.vue';
import NoteNew from '../pages/note/NoteNew.vue';
import NoteEdit from '../pages/note/NoteEdit.vue';

const noteRoutes = [
  {
    path: '/noteapp',
    components: {
      default: ViewEmpty,
      sidebar: NoteSidebar,
    },
    children: [
      {
        path: '',
        name: 'note.home',
        component: NoteList,
      },
      {
        path: 'category',
        name: 'note.category_list',
        component: CategoryList,
      },
      {
        path: 'category_new',
        name: 'note.category_new',
        component: CategoryNew,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'category/:id',
        name: 'note.category_detail',
        component: CategoryDetail,
      },
      {
        path: 'category/:id/edit',
        name: 'note.category_edit',
        component: CategoryEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'note',
        name: 'note.note_list',
        component: NoteList,
      },
      {
        path: 'note/:id',
        name: 'note.note_detail',
        component: NoteDetail,
      },
      {
        path: 'note/:id/edit',
        name: 'note.note_edit',
        component: NoteEdit,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'note_new',
        name: 'note.note_new',
        component: NoteNew,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default noteRoutes;
