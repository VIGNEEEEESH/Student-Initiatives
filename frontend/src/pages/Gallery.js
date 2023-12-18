import React, { useState } from 'react';
import '../Css files/Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    Promise.all(
      selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            resolve(event.target.result);
          };

          reader.readAsDataURL(file);
        });
      })
    ).then((images) => {
      setImages(images);
    });
  };

  return (
    <div className='Gallery'>
      <center><h1><b><u>UPLOAD PHOTOS</u></b></h1>
      <input type="file" multiple onChange={handleImageChange} /></center>
      {images.length > 0 && (
        <div className="image-container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded Image ${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
