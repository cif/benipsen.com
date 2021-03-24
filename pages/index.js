import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/index.module.css'
import { Dots } from '../components/dots';

export default function Home() {

  const [party, setParty] = useState(20);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ben Ipsen: Digital Craftsperson</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.content}>
        <h1 className={styles.title}>
          Ben Ipsen
        </h1>
        <p>
          .com! <br /> digital craftsperson. <br />more content, very soon.
        </p>
        {/* <button onClick={() => setParty(party + 20)}>More Dots</button>
        <button onClick={() => setParty(party - 20)}>Less Dots</button> */}
        <h3><Link href="/fun">Play Asteriods</Link></h3>
        <p><a href="https://github.com/cif/benipsen.com">view source</a></p>
      </main>

      <footer className={styles.footer}>
        <p><a href="https://github.com/cif">github</a></p>
        <p><a href="https://linkedin.com/in/benipsen">linkedin</a></p>
        <p><a href="https://twitter.com/benipsen">twitter</a></p>
        <p><a href="mailto:email@benipsen.com?subject=Hello">email</a></p>
      </footer>
      <div className={styles[`dots-container`]}>
        <Dots partyLevel={party} />
      </div>
    </div >
  )
}
