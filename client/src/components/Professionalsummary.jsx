import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Professionalsummary = ({data,onChange,setResumeData}) => {
  const {token}=useSelector(State=>state.auth)
  const [isgenerating,setisgenerating]=useState(false)
  
  const generateSummary=async ()=>{
    try{
setisgenerating(true)
const prompt=`enhance my professional summary "${data}"`;
const response =await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:token}})
setResumeData(prev=>({...prev,Professional_summary:response.data.enhancedContent}))
    }
    catch(error){
toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setisgenerating(false)
    }
  }
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div >
      <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>professional summary</h3>
      <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>
        <button disabled={isgenerating} onClick={generateSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
          {isgenerating?(<Loader2 className='size-4 animate-spin'/>):( <Sparkles className='size-4'/>)}
          {isgenerating ? "enhancing..":"ai enhance"}
            <Sparkles className='size-4'/>Ai enhance
        </button>
      </div>
      <div className='mt-6'> 
        <textarea value={data||""} onChange={(e)=>onChange(e.target.value)} rows={7}name="" id="" className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'placeholder='write your professional summary'/>
        <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it consice (3-4 sentences) and focus on your most revelent achievement and skills</p>
      </div>
    </div>
  )
}

export default Professionalsummary
