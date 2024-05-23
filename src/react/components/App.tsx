import { useState } from "react";

const styles = {
  main: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    padding: 20,
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    fontFamily: "Poppins, sans-serif",
    width: 300,
    height: 400,
    borderRadius: 20,
  },
  heading: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0f172a",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: 14,
    cursor: "pointer",
    borderRadius: 15,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  paragraph: {
    fontSize: 14,
    color: "#555",
    margin: "10px 0",
    wordWrap: "break-word" as "break-word",
    maxWidth: "100%",
    textAlign: "center" as "center",
  },
};

const App = () => {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isShortening, setIsShortening] = useState(false);

  const handleShortenUrl = async () => {
    try {
      setIsShortening(true);
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const activeTab = tabs[0];

      const response = await fetch(
        "https://url-trailed.vercel.app/api/shorten-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl: activeTab.url }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShortenedUrl(
          `https://url-trailed.vercel.app/r/${data.data.shortId}`
        );
        setResponseMsg(data.message);
      } else {
        setResponseMsg(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsShortening(false);
    }
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.heading}>URL Trailed</h1>
      <button style={styles.button} onClick={handleShortenUrl}>
        {isShortening ? "Shortening..." : "Shorten It!"}
      </button>
      <p style={styles.paragraph}>{responseMsg}</p>
      {shortenedUrl && <p style={styles.paragraph}>{shortenedUrl}</p>}
    </main>
  );
};

export default App;
