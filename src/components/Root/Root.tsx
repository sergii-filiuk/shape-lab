import styles from './Root.module.scss';
import { App } from '../App';

export const Root = () => {
  return (
    <div className={styles.root}>
      <App />
    </div>
  );
};
