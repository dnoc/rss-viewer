import { useState } from "react";
import FeedItem from "./feed_item";
import LinkIcon from "./link_icon";

const style = {
  width: "100%",
};

const searchStyle = {
  width: "80%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "12px",
  border: "1px solid #ccc",
};

export default function Feed({ feed }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div key={feed.id} className="feed" style={style}>
      <div
        style={{
          borderBottom: "4px rgba(0,0,0,0.1) solid",
          padding: "0 0 20px",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        {feed.image_url && (
          <img src={feed.image_url} alt={feed.title} style={{ width: "50%" }} />
        )}
        <h2>
          {feed.title} <LinkIcon url={feed.link} />
        </h2>
        <p>{feed.description}</p>
        <input
          type="text"
          placeholder="Search feed items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchStyle}
        />
      </div>
      {feed.feed_items
        .filter((item) => {
          if (!searchQuery) return true; // If no search query, show all items
          return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
        .map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
    </div>
  );
}
