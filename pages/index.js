import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <>
      <h1 className="text-plover-blue">
        Hola Plover!
      </h1>
      <h2 className="text-lighter-gray">
        Hola Plover!
      </h2>
      <h2 className="text-darker-gray">
        Hola Plover!
      </h2>
      <input 
      className="bg-light-blue placeholder-plover-blue"
      placeholder="Hola Plover!"
      />
    </>
    )
}
