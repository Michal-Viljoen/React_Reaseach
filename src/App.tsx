import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://arthurfrost.qflo.co.za/php/getTimeline.php",
        );
        const jsonData = await response.json();

        console.log("Fetched Data:", jsonData);

        if (Array.isArray(jsonData.Timeline) && jsonData.Timeline.length > 0) {
          setData(jsonData.Timeline);
        } else {
          console.error("Invalid data format:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Timeline</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.Id} style={styles.timelineItem}>
            <p style={styles.itemText}>Episode: {item.Episode}</p>
            <p style={styles.itemText}>Title: {item.Title}</p>
            <p style={styles.itemText}>Description: {item.Description}</p>
            <p style={styles.itemText}>Category: {item.Category}</p>
            <p style={styles.itemText}>Create Date: {item.CreateDate}</p>
            <p style={styles.itemText}>Media: {item.MediaName}</p>

            <img
              src={`https://arthurfrost.qflo.co.za/${item.Image}`}
              alt="Episode Thumbnail"
              style={styles.image}
            />
            <img
              src={`https://arthurfrost.qflo.co.za/${item.Icon}`}
              alt="Episode Icon"
              style={styles.image}
            />

            <audio controls style={styles.audio}>
              <source
                src={`https://arthurfrost.qflo.co.za/${item.Audio}`}
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))
      ) : (
        <p style={styles.loading}>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  timelineItem: {
    marginBottom: "40px",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
  },
  itemText: {
    margin: "0",
    fontSize: "16px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  audio: {
    width: "100%",
    marginTop: "10px",
  },
  loading: {
    fontSize: "16px",
    fontStyle: "italic",
    marginTop: "20px",
  },
};

export default App;
