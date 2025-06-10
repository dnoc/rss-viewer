import { useState } from "react";
import axios from "axios";
import LinkIcon from "./link_icon";

const style = {
  width: "100%",
  backgroundColor: "#e4ebf0",
  borderRadius: "4px",
  padding: "4px 0",
  marginBottom: "8px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  cursor: "pointer",
  flexDirection: "row",
};

export default function FeedItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [read, setRead] = useState(item.read || false);

  const updateItemRead = (readStatus) => {
    axios
      .put("/api/feed_items/" + item.id, { id: item.id, read: readStatus })
      .then((response) => {
        setRead(readStatus);
      })
      .catch((error) => {
        console.error("Error marking read:", error);
      });
  };

  return (
    <div className="feed-item" style={style}>
      <div
        className="feed-item-header"
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          <strong>{item.title}</strong>
        </p>
        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          &#9650;
        </span>
      </div>
      {isOpen && (
        <div className="feed-item-content">
          <div
            style={{
              display: "flex",
              justifySelf: "flex-end",
              marginRight: "12px",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={read}
                onChange={(e) => {
                  updateItemRead(e.target.checked);
                }}
              />
              Read
            </label>
          </div>
          <p>
            <span dangerouslySetInnerHTML={{ __html: item.description }} />{" "}
            {!item.media_url && <LinkIcon url={item.link} />}
          </p>
          {item.media_url && !item.media_type && (
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.media_url}
                alt={item.title}
                style={{ width: "100%" }}
              />
            </a>
          )}
          {item.media_url &&
            item.media_type &&
            item.media_type.includes("audio") && (
              <audio controls src={item.media_url}></audio>
            )}
        </div>
      )}
    </div>
  );
}
