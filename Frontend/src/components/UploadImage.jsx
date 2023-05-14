import axios from "axios";
import React, { useState, useRef } from "react";
import "./uploadimage.css";

export default function UploadImage({ upload }) {
  const formRef = useRef(null);

  const [selectedImage, SetSelectedImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectImage = (e) => {
    SetSelectedImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setIsOpen(true);
  };

  const onPost = (event) => {
    event.preventDefault();
    // event.target.reset();

    if (name === "" || keyword === "")
      return alert("Name and Keyword cannot be empty.");

    const formData = new FormData();

    formData.append("image", selectedImage);
    formData.append("name", name);
    formData.append("keyword", keyword);

    axios
      .post("http://localhost:7007/api/images", formData)
      .then((response) => {
        upload();
        setImageUrl("");
        setName("");
        setKeyword("");
        SetSelectedImage();
        alert("Image uploaded successfully...");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={onPost} encType="multipart/form-data" ref={formRef}>
        <input
          type="file"
          accept="image/*"
          placeholder="images"
          onChange={selectImage}
          className="custom-file-input"
        />
        {imageUrl && isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={handleClose}>
                X
              </button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Selected file"
                  style={{
                    height: "300px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />

                <input
                  type="text"
                  placeholder="Name"
                  style={{ width: 300 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Keywords"
                  style={{ width: 300 }}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">POST</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
