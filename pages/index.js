import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/index.module.css'
import { Dots } from '../components/dots';

export default function Home() {

  const [party, setParty] = useState(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ben Ipsen: Digital Craftsperson</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Dots partyLevel={party} />
      <main>
        <h1 className={styles.title}>
          Ben Ipsen
        </h1>
        <p>
          digital craftsperson. fun haver. <br />more content, very soon.  
        </p>
        <button onClick={() => setParty(party + 10)}>More Party</button>
        <button onClick={() => setParty(0)}>Less Party</button>
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
