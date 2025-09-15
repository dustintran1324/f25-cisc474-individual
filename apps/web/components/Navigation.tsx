import Link from 'next/link'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
        </Link>
        
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Dashboard
          </Link>
          <Link href="/courses" className={styles.link}>
            Arcane Paths
          </Link>
          <Link href="/submissions" className={styles.link}>
            Divinations
          </Link>
          <Link href="/notifications" className={styles.link}>
            Messages
          </Link>
          <Link href="/profile" className={styles.link}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}