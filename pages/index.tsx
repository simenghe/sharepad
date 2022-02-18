import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

interface IRoom {
  name: string;
}
interface IProps {
  startingRoom: string;
}

function Home(props: IProps) {
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    getAndSetRoom();
  }, []);

  async function getAndSetRoom() {
    const resp = await axios.get<IRoom>("/api/generatename");
    setRoomName(resp.data.name);
  }

  async function onGenerateNameClicked(event: MouseEvent<HTMLButtonElement>) {
    try {
      getAndSetRoom();
      event.preventDefault();
    } catch (err: unknown) {
      console.error(err);
    }
  }

  // Redirect user to their room and send a POST request adding room to cache.
  async function handleSubmit(event: React.FormEvent) {
    console.log(roomName);
    router.push(`/${roomName}`);
    event.preventDefault();
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
          Welcome to <span className="text-blue-400 font-bold">SharePad!</span>
        </h1>
        <h1 className="text-2xl py-12">Create your room here!</h1>
        <form
          className="p-4 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
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
              type="button"
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
}

export default Home;
