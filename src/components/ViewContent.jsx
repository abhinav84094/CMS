import React from 'react';
import { useContentContext } from '../context/Content_context.jsx';

function ViewContent() {
  const { contents } = useContentContext();
  contents.map((e)=>{
    console.log(e);
    console.log(e.title);
  })

 

  if (!contents || contents.length === 0) {
    return <div className="text-white">No content available.</div>;
  }

  return (
    <div className="text-white">
      <h2>View Contents</h2>
      {contents.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg bg-gray-800 my-4 w-[500px]" >
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p>{item.body}</p>
          {item.imgurl && <img src={item.imgurl} alt={item.title} className="mt-2 w-full max-w-sm rounded-lg" />}
        </div>
      ))}
    </div>
  );
}

export default ViewContent;
