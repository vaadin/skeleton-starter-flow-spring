import {Flow} from '@vaadin/flow-frontend/Flow';
import {Router} from '@vaadin/router';

const {serverSideRoutes} = new Flow({
  // @ts-ignore
  imports: () => import('../target/frontend/generated-flow-imports')
});

const router = new Router(document.querySelector('#outlet'));
router.setRoutes(serverSideRoutes);
