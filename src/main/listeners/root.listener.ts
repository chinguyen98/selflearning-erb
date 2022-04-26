import appListener from './app.listener';
import photoListener from './photo.listener';

const rootListener = () => {
  appListener();
  photoListener();
};

export default rootListener;
