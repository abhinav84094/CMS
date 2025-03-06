import React, { useEffect, useState } from "react";
import { useContentContext } from "../context/Content_context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth_context";
import isNotEmpty from "../utils/validation";

function AddContent() {
  const { addContent } = useContentContext();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [owner, setOwner] = useState(user?.username || "");
  // const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [imgurl, setImgurl] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem("contentDraft");
    if (draft) {
      try {
        const { title, body, category, imgurl } = JSON.parse(draft);
        // setTitle(title || "");
        setBody(body || "");
        setCategory(category || "Misc");
        setImgurl(imgurl || "");
      } catch (err) {
        console.error("Error in parsing draft ", err);
      }
    }
  }, []);




  const handleSubmit = (e) => {
        
    e.preventDefault();
    if (!isNotEmpty(body)) {
      setError("Please fill in both title and body.");
      return;
    }

    const newContent = {
      id: Date.now(),
      owner,
      // title,
      body,
      category,
      imgurl,
      date: new Date().toISOString(),
      author: user.username,
    };

    addContent(newContent);
    setOwner("");
    // setTitle("");
    setBody("");
    setCategory("");
    setError("");
    setImgurl("");
    localStorage.removeItem("contentDraft");
    navigate("/view");
  };

  return (
    
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Add Content</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* <div>
          <label className="block text-sm font-medium mb-1">Enter Title:</label>
          <input
            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium mb-1">Enter Body:</label>
          <textarea
            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white h-28"
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            value={body}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enter Image URL:</label>
          <input
            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
            type="url"
            placeholder="Image URL"
            onChange={(e) => setImgurl(e.target.value)}
            value={imgurl}
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Post
        </button>
      </form>
    </div>
  );
}

export default AddContent;
