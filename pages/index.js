import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const handleAddBookmark = () => {
    if (title.trim() && url.trim()) {
      setBookmarks([...bookmarks, { title, url }]);
      setTitle("");
      setUrl("");
    }
  };

  return (
    <>
      <Head>
        <title>Bookmark Manager</title>
        <meta name="description" content="Manage your bookmarks effortlessly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Bookmark Manager</h1>
        <p className="text-lg mt-4">
          Save and manage your favourite links here!
        </p>
        <div className="mt-8 flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </main>
    </>
  );
}
