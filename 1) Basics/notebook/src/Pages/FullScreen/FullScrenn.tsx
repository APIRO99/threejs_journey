import { useEffect, useRef, useState } from 'react';
import { IScene } from 'react-app-env';
import Scene from 'threejs/course/08-FullScreen';
import styles from './FullScreen.module.scss'

const FullScreen = () => {
  const parent = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<IScene>();

  useEffect(() => {
    if (canvas.current) setScene({ instance: new Scene(canvas.current)});
  }, [])
  
  console.log(parent.current?.clientHeight, canvas.current?.height);
  // console.log(scene?.instance);

  return (
    <div ref={parent} className={styles.container}>
      <canvas ref={canvas} />
    </div>
  )
}

export default FullScreen