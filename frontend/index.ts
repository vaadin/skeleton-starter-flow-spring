import {Flow} from '@vaadin/flow-frontend/Flow';
import {Router} from '@vaadin/router';

import './main-layout';

const flow = new Flow({
  // @ts-ignore
  imports: () => import('../target/frontend/generated-flow-imports')
});

const routes = [
  {
    path: '',
    component: 'main-layout',
    children: [
      {
        // fallback to server-side Flow routes if no client-side routes match
        path: '(.*)',

        // FIXME: replace flow.navigate with flow.route()
        // when https://github.com/vaadin/flow/issues/6338 is implemented
        action: flow.navigate as any
      }
    ]
  }
];

const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

