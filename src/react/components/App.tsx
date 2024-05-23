import { useState } from "react";

const App = () => {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const shortenCurrentUrl = async () => {
    //   Get the active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];

    // Send request to server
    const response = await fetch(
      "https://url-trailed.vercel.app/api/shorten-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: activeTab.url,
        }),
      }
    );
    const data = await response.json();

    if (data.success) {
      setShortenedUrl(`https://url-trailed.vercel.app/r/${data.data.shortId}`);
      setResponseMsg(data.message);
    }

    setResponseMsg(data.message);

    //   Send data to active tab
    // chrome.tabs.sendMessage(activeTab.id || 0, { data });
  };
  return (
    <main>
      <h1>URL Trailed</h1>
      <button onClick={shortenCurrentUrl}>Click!</button>
      <p>{responseMsg}</p>
      {shortenedUrl && <p>{shortenedUrl}</p>}
    </main>
  );
};

export default App;
