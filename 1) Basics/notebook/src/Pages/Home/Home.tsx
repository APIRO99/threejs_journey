import { useEffect } from 'react'

import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <canvas className="webgl"></canvas>
    </div>
  )
}

export default Home