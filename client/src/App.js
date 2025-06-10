import { useEffect, useState } from "react";
import axios from "axios";
import AllFeeds from "./components/all_feeds";
import "./App.css";

export default function App(props) {
  const [feeds, setFeeds] = useState([]);
  const [url, setUrl] = useState("");
  const [alreadyExists, setAlreadyExists] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("/api/feeds").then((response) => {
      console.log(response.data); // The entire response from the Rails API

      setFeeds(response.data);
    });
  };

  const addFeed = () => {
    if (url) {
      axios
        .post("/api/feeds", { url })
        .then((response) => {
          setFeeds(response.data);
          setUrl(""); // Clear the input field after adding
        })
        .catch((error) => {
          console.error("Error adding feed:", error);
          if (error.response && error.response.status === 409) {
            // Check if the error is due to a duplicate feed
            setAlreadyExists(true);
          } else {
            setAlreadyExists(false);
          }
        });
    }
  };

  return (
    <div className="App">
      <div className="add-new-feed" style={newFeedStyle}>
        <p style={{ margin: 0 }}>
          <strong>Add New Feed</strong>
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Feed URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setAlreadyExists(false)}
            style={inputStyle}
          />
          <button
            onClick={addFeed}
            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
          >
            Add
          </button>
          <button
            onClick={fetchData}
            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
          >
            Reload
          </button>
        </div>
        {alreadyExists && (
          <p style={{ color: "red", margin: 0 }}>Feed already exists!</p>
        )}
      </div>
      <AllFeeds feeds={feeds} />
    </div>
  );
}

const newFeedStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  justifySelf: "center",
  alignItems: "center",
  gap: "8px",
  padding: "5px",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  width: "80%",
  margin: "4px 0 20px",
  paddingBottom: "10px",
};

const inputStyle = {
  width: "80%",
  padding: "8px",
  borderRadius: "12px",
  border: "1px solid #ccc",
};
