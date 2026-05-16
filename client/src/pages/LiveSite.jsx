import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
const LiveSite = () => {
    const {slug} = useParams()
    const [html,sethtml] = useState("")
    const [error,setError] = useState("")
     useEffect(() => {
       const handleGetWebsite = async () => {
         try {
           const result = await axios.get(
             `${serverUrl}/api/website/get-by-slug/${slug}`,
             { withCredentials: true },
           );
           sethtml(result.data.latestCode)
           console.log(result);
          
         } catch (error) {
           console.log(error);
           setError("Site Not Found")
         }
       };
       handleGetWebsite();
     }, [slug]);

    if(error){
        return(
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                {error}
            </div>
        )
    }
  return (
    <div>
      <iframe title='Live Site' srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'/>
    </div>
  )
}

export default LiveSite
