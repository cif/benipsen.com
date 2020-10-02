import Head from 'next/head'
import styles from '../styles/index.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ben Ipsen: Digital Craftsperson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Ben Ipsen
        </h1>
        <p>
          digital craftsperson. more content, very soon.  
        </p>
        
      </main>

      <footer className={styles.footer}>
        <p><a href="https://github.com/cif">github</a></p>
        <p><a href="https://linkedin.com/in/benipsen">linkedin</a></p>
        <p><a href="https://twitter.com/benipsen">twitter</a></p>
        <p><a href="mailto:email@benipsen.com?subject=Hello">email</a></p>
      </footer>
    </div>
  )
}
