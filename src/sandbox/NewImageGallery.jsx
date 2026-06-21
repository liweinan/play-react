import { useState } from 'react';

function ImageItem({ link, removeIt }) {
    return (
        <div className="image">
            <img src={link} alt="" />
            <button type="button" className="remove" onClick={() => removeIt(link)}>
                X
            </button>
        </div>
    );
}

export default function NewImageGallery({ links }) {
    const [currLinks, setCurrLinks] = useState(links);

    const removeIt = (link) => {
        setCurrLinks((prev) => prev.filter((item) => item !== link));
    };

    return (
        <div>
            {currLinks.map((link) => (
                <ImageItem key={link} link={link} removeIt={removeIt} />
            ))}
        </div>
    );
}
