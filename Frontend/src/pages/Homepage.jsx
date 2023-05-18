import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import UploadImage from "../components/UploadImage";

export default function Homepage() {
  const [allImages, setAllImages] = useState([]);
  const [key, setKey] = useState(false);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    getImages();
  }, [key, upload]);

  const getImages = async () => {
    try {
      const res = await axios.get(`http://localhost:7007/api/images/${key}`);

      setAllImages([...allImages, ...res.data.images]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-container">
        <input
          type="text"
          placeholder="search...."
          className="input-container"
          onChange={(e) => {
            setAllImages([]);
            if (e.target.value === "") return setKey(false);
            setKey(e.target.value);
          }}
        />
        <div>
          <UploadImage
            upload={() => {
              setAllImages([]);
              setUpload(!upload);
            }}
          />
        </div>
        <div className="images-container">
          {allImages &&
            allImages.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <img
                    className="img"
                    src={"http://localhost:7007/" + item.image}
                    alt=""
                  />
                  <div className="letters-container">
                    <span>Name: {item.name}</span>
                    <span>Keywords: {item.keyword}</span>
                    <span>Uploaded on : {item.created_at}</span>
                    {item.input1 && <span>input1: {item.input1}</span>}
                    {item.input2 && <span>input2: {item.input2}</span>}
                    {item.input3 && <span>input3: {item.input3}</span>}
                    {item.input4 && <span>input4: {item.input4}</span>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
