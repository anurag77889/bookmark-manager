import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

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
          <input
            type="text"
            placeholder="Enter bookmark URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddBookmark}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add Bookmark
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 mb-2 bg-white rounded shadow"
            >
              <span className="text-gray-800">{bookmark.title}</span>
              <a
                href={bookmark.formattedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Visit
              </a>
              <button
                onClick={() => deleteBookmark(index)}
                className="text-red-500 hover:text-red-700"
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
