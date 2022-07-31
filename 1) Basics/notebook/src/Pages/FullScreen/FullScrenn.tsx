import styles from './FullScreen.module.scss'

import { createCubes } from 'threejs/course/08-fullScreenAnResizing';
import { useEffect, useRef } from 'react';

const FullScreen = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let { current } = ref;
    if (current) {
      console.log('sizes', current.offsetWidth, current.offsetHeight);
      createCubes(current.offsetWidth, current.offsetHeight);
      console.log('sizes 2', current.offsetWidth, current.offsetHeight);
    }
  }, []);
  
  return (
    <div className={styles.container} ref={ref}>
      <canvas className="webgl"></canvas>
    </div>
  )
}

export default FullScreen