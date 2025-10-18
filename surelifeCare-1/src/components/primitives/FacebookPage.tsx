// src/components/FacebookPage.tsx
import React from "react";

const FacebookPage: React.FC = () => {
  return (

    <div className="w-[22rem] flex justify-center items-center rounded-lg overflow-hidden shadow-lg bg-[#0C3328] p-2">
      <iframe

        width="100%"
        height="140%"
      
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsurelifefbpage&tabs=timeline&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
        className="rounded-md"
       
        style={{ border: "none", overflow: "hidden", height: "620px" }}
        scrolling="no"
        frameBorder={0}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default FacebookPage;