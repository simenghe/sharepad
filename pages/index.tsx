import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [roomName, setRoomName] = useState<string>("");
  function onGenerateNameClicked(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setRoomName("Bananas");
    console.log("Generate Name Clicked.");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SharePad | Secure Text Sharing Platform</title>
        <meta name="description" content="Throwaway text sharing rooms." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* sharebox */}
      <main className={styles.main}>
        <h1 className="text-6xl text-center">
          Welcome to <span className="text-blue-400">SharePad!</span>
        </h1>
        <h1 className="text-2xl py-12">Create your room here!</h1>
        <form
          className="p-4 flex flex-col justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(roomName);
          }}
        >
          <label className="py-2">Name your room </label>
          <input
            className="border-2 shadow-lg  border-gray-400 rounded-sm px-2 py-1 mb-4"
            type="text"
            placeholder="Hello"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
          ></input>
          {/* <div className="grid grid-cols-2 place-items-center"> */}
          <div className="flex flex-none gap-2">
            <button
              onClick={onGenerateNameClicked}
              className="bg-blue-200 rounded-lg border-black border-2 p-1"
            >
              Generate a name
            </button>
            <button
              type="submit"
              className="bg-green-200 rounded-lg border-black border-2 p-1"
            >
              Start Room
            </button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
