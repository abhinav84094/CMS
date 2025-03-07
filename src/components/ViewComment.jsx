import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContentContext } from '../context/Content_context';

function ViewComment() {

  const {id} = useParams();
  const navigate = useNavigate();

  const {contents} = useContentContext();
  
  const item = contents.find((item)=>item.id===parseInt(id));
  console.log(item);


  return (
    <>
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">View Comments</h2>
      <div className="flex flex-col items-center justify-center w-[100vw] gap-10">
        
          <div>
            <div className="border border-gray-600 p-5 rounded-lg bg-gray-800 shadow-lg w-[500px] h-auto">
            <div className="flex justify-between">
            <h3 className="text-xl font-bold text-yellow-300">{item.owner}</h3>
            {/* <div className="flex gap-5 ">
              <button onClick={()=> handleEdit(item.id)}>Edit</button>
              <button>Delete</button>
            </div> */}
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
          <div className='flex flex-col'>
            {/* <textarea 
                placeholder='Comment'
                className='text-white w-full h-[auto] p-2 border border-gray-500 rounded-lg bg-gray-700'
                onChange={(e)=>setComment(e.target.value)}
            />
            <button onClick={postComment}>Post</button> */}

            <div className='text-white text-2xl font-bold'>Comments</div>
            {item.comments && item.comments.map((comment, index)=>(
                <div>{comment}</div>
            ))}

          </div>

          </div>
        
      </div>
    </div>
    </>
  )
}

export default ViewComment