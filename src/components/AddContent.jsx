import React, { useEffect, useState } from 'react'
import { useContentContext } from '../context/Content_context'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth_context';
import isNotEmpty from '../utils/validation';

function AddContent() {

  const {addContent} = useContentContext();
  const navigate = useNavigate();
  const {user} = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [showPreview, setShowPrevies] = useState('');

  useEffect(()=>{
    const draft = localStorage.getItem('contentDraft');
    if(draft){
      try{
        const {title, body, category, imgurl} = JSON.parse(draft);
        setTitle(title || '');
        setBody(body || '');
        setCategory(category || "Misc");
        setImgurl(imgurl || '');
      }catch(err){
        console.error("Error in parsing draft ", err);
      }
    }
  }, []);


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!isNotEmpty(title) && !isNotEmpty(body)){
      setError("Please fill title and body for article")
      return;
    }

    const newContent = {
      id: Date.now(),
      title,
      body, 
      category,
      imgurl,
      date: new Date().toISOString(),
      author: user.username
    }

    addContent(newContent);
    setTitle('');
    setBody('');
    setCategory('');
    setError('');
    setImgurl('');
    localStorage.removeItem('contentDraft');
    navigate('/view');
  }

  return (
    <div className='flex flex-col gap-5 border border-white m-20'>
      <h2  className='text-4xl ml-[20%]' >Add Content</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 mr-10'>
      <div>
        <label className='ml-20 '>Enter Title : </label>
        <input className='border border-white' 
        onChange={(e)=>setTitle(e.target.value)} 
        placeholder='title' 
        type='text' 
        value={title} />
      </div>
      <div>
        <label className='ml-20 '>Enter Cotent/body : </label>
        <input className='border border-white'
         onChange={(e)=>setBody(e.target.value)} 
         placeholder='body' 
         type='text' 
         value={body} />
      </div>
      <div>
        <label className='ml-20 '>Enter image url : </label>
        <input className='border border-white'
          type='url' 
          placeholder='image url'
          onChange={(e)=>setImgurl(e.target.value)}
          value={imgurl}
        />
      </div>
      

      {error && <div className='ml-40'>{error}</div>}
      <button className='w-50 ml-[30%]' type='submit'>Post</button>
      </form>
    </div>
  )
}

export default AddContent

