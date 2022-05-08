import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';

import App from './App';

const appRender = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const rootElem = document.getElementById('main') as HTMLElement;

render(appRender, rootElem);
