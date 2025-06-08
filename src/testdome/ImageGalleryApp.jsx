import React, { useState } from 'react';

// https://www.testdome.com/library?page=1&skillArea=48&questionId=134782
const ImageGallery = ({ links }) => {
    // Initialize state with the links prop
    const [images, setImages] = useState(links);

    console.log("incoming images: ", images);
    // Handler to remove an image by its URL
    const handleRemove = (url) => {
        setImages(images.filter((image) => image !== url));
    };

    return (
        <div>
            {images.map((url) => (
                <div className="image" key={url}>
                    <img src={url} />
                    <button className="remove" onClick={() => handleRemove(url)}>
                        X
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
