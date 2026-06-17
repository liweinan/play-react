import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';

const ImageGallery = ({initialLinks}) => {
    const [links, setLinks] = useState(initialLinks);

    const removeIt = (idx) => {
        setLinks((prev) => {
            prev.filter((_, i) => i !== idx);
        })
    }
    return (<div>
        {links.map((link, idx) => {
            return (<div className="image" key={idx}>
                <img src={link}/>
                <button className={"remove"} onClick={() => removeIt(idx)}>X</button>
            </div>)
        })};
    </div>);

}

document.body.innerHTML = "<div id='root'> </div>";

const rootElement = document.getElementById("root");
const links = ["https://tinyurl.com/im-gal-1st", "https://tinyurl.com/im-gal-2nd"];
const root = createRoot(rootElement);
root.render(<ImageGallery links={links}/>);

setTimeout(() => {
    document.querySelectorAll('.remove')[0]?.click();
    setTimeout(() => {
        console.log(rootElement?.innerHTML);
    });
});