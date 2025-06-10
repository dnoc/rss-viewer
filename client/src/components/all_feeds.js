import Feed from "./feed";
import React, { useState } from "react";

const style = {
  display: "flex",
  flexDirection: "column",
  justifySelf: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px 2px rgba(0,0,0,0.1)",
  width: "80%",
};

const pillStyle = {
  height: "100%",
  borderRadius: "32px",
  border: "2px solid #ccc",
  padding: "2px 8px",
  minWidth: "150px",
};

const selectorStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "10px",
  width: "100%",
  padding: "10px",
  overflowX: "scroll",
};

const selectedStyle = {
  backgroundColor: "#e4ebf0",
  color: "#222324",
  border: "2px solid #429edb",
};

export default function AllFeeds({ feeds }) {
  const [selectedFeed, setSelectedFeed] = useState(feeds[0]);

  return (
    <div className="all-feeds" style={style}>
      <div className="all-feeds-selector" style={selectorStyle}>
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="feed-selector"
            style={
              selectedFeed?.title === feed?.title
                ? { ...pillStyle, ...selectedStyle }
                : pillStyle
            }
            onClick={() => setSelectedFeed(feed)}
          >
            <h3>{feed.title}</h3>
          </div>
        ))}
      </div>
      {feeds.map(
        (feed) =>
          selectedFeed?.title === feed?.title && (
            <Feed key={feed.id} feed={feed} />
          )
      )}
    </div>
  );
}
