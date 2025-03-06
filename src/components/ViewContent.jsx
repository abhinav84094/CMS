import React from "react";
import { useContentContext } from "../context/Content_context.jsx";
import { useNavigate } from "react-router-dom";

function ViewContent() {

  const navigate = useNavigate();

  const { contents } = useContentContext();

  if (!contents || contents.length === 0) {
    return <div className="text-white text-center mt-10 text-xl">No content available.</div>;
  }

  const handleEdit = (id)=>{
    navigate(`/edit/${id}`);
  }

  const handleComment = (id)=>{
    navigate(`/comment/${id}`);
  }

  const handleOldComment = (id)=>{
    const content = contents.find(item => item.id === id) ;
    console.log(content);
    console.log(content.comments);
    content.comments.length ? navigate(`/viewComment/${id}`) : navigate("/view") ;
  }


  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">View Contents</h2>
      <div className="flex flex-col items-center justify-center w-[100vw] gap-10">
        {contents.map((item, index) => (
          <div key={index}>
            <div className="border border-gray-600 p-5 rounded-lg bg-gray-800 shadow-lg w-[500px] h-auto">
            <div className="flex justify-between">
            <h3 className="text-xl font-bold text-yellow-300">{item.owner}</h3>
            <div className="flex gap-5 ">
              <button onClick={()=> handleEdit(item.id)}>Edit</button>
              <button>Delete</button>
            </div>
            </div>
            <p className="mt-2 text-gray-300">{item.body}</p>
            {item.imgurl && (
              <img
                src={item.imgurl}
                alt={item.title}
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-between">
          <button onClick={()=>handleComment(item.id)}>Post Comment</button>
          <button onClick={()=>handleOldComment(item.id)}>View Old Comments</button> 
          </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewContent;
