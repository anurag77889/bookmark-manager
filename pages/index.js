import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (savedBookmarks) {
      setBookmarks(savedBookmarks);
    }
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const handleAddBookmark = () => {
    if (title.trim() && url.trim()) {
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      setBookmarks([...bookmarks, { title, formattedUrl }]);
      setTitle("");
      setUrl("");
    }
  };

  const deleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <>
      <Head>
        <title>Bookmark Manager</title>
        <meta name="description" content="Manage your bookmarks effortlessly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center h-screen bg-stone-950 text-indigo-400">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Bookmark Manager
        </h1>
        <p className="tracking-wide text-gray-500 md:text-lg dark:text-gray-400 mt-4">
          Save and manage your favourite links here!
        </p>
        <div className="mt-8 flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white bg-purple-300 text-black placeholder:text-black font-semibold"
          />
          <input
            type="text"
            placeholder="Enter bookmark URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white bg-purple-300 text-black placeholder:text-black font-semibold"
          />
          <button
            onClick={handleAddBookmark}
            class="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-md px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
          >
            Add Bookmark
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 mb-2 bg-white rounded-2xl shadow"
            >
              <span className="text-gray-800 font-thin text-lg">
                {bookmark.title}
              </span>
              <a
                href={bookmark.formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline font-mono"
              >
                Visit
              </a>
              <button
                onClick={() => deleteBookmark(index)}
                className="text-red-500 font-semibold hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
