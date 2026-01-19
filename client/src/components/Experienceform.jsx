// import { Briefcase, Sparkles, Trash2 ,Plus} from 'lucide-react';
// import React from 'react'

// const Experienceform = ({data,onChange}) => {

//     const addExperience=()=>{
//         const newExperince={
//             company:"",
//             position:"",
//             start_date:"",
//             end_date:"",
//             is_current:false

//         };
//         onChange([...data,newExperience])
//     }
//     const removeExperience=(index)=>{
//         const updated=data.filter((_,i)=>i!==index);
//         onChange(updated)
//     }
//       const updateExperience=(index,field,value)=>{
//         const updated=[...data];
//         updated[index]={...updated[index],[field]:value}
//         onChange(updated)
//     }


//   return (
//     <div className='space-y-6'>
//       <div>
//          <div className='flex items-center justify-between'>
//         <div >
//       <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Experience</h3>
//       <p className='text-sm text-gray-500'>Add your experience for your resume here</p>
//         </div>
//         <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors '>
//             <Plus className='size-4'/>
//         Add Experience

//         </button>
//       </div>
//       </div>
//       {data.length ===0 ?(<div className='text-xenter py-8 text-gray-500 '>
//         <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
//         <p>No work experience to get started</p>
//       </div>):(<div className='space-y-6'>
//      {data.map(experience,index)=>(
//         <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
//          <div className='flex justify-between items-start'> 
//             <h4>Experience#{index+1}</h4>
//             <button onClick={()=>removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
//                 <Trash2 className='size-4'/>
//                 </button>  </div>
//                 <div className='grid md:grid-cols-2 gap-3'>
//                    <input value={experience.company||""} onChange={(e)=>updateExperience(index,"company",e.target.value)}type='text' placeholder='company name' className='px-3 py-2 text-sm rounded-lg'/>

//                       <input value={experience.position||""} onChange={(e)=>updateExperience(index,"position",e.target.value)}type='text' placeholder='Job tittle' className='px-3 py-2 text-sm rounded-lg'/>
//                       <input value={experience.start_date||""} onChange={(e)=>updateExperience(index,"start_date",e.target.value)}type='month' placeholder='start date' className='px-3 py-2 text-sm rounded-lg'/>
//                       <input value={experience.end_date||""} onChange={(e)=>updateExperience(index,"end_date",e.target.value)}type='month' placeholder='end date' disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'/>
//                 </div>
//                 <label>
//                   <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>{updateExperience(index,"is_current",e.target.checked ? true : false ; )}} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'/>
//                   <span className='text-sm text-gray-700 '>Currently working here</span>
//                 </label>
//                 <div className='space-y-6'>
//                  <div className='flex items-center justify-between '>
//                   <label className='text-sm font-medium text-gray-700 '>Job Description</label>
//                   <button className='flez items-center gap-1 px-2 py-1 text-xs bg-purple-200 transition-colors disabled:opacity-50'>
//                     <Sparkles className='w-3 h-3'/>Enhance with AI
//                   </button>
//                  </div>
//                  <textarea value={experience.description ||"" } onChange={(e)=>updateExperience(index,"description",e.target.value)} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and achievements...'/>
//                 </div>
//                 </div>
//                 </div>
//                 </div>
//         </div>
//      ))}
//       </div>)}
//     </div>
//   )
// }

// export default Experienceform

import React, { useState } from "react";
import { Briefcase, Sparkles, Trash2, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Experienceform = ({ data = [], onChange }) => {

  // ✅ Add new experience

  const {token}=useSelector(state=>state.auth)
  const [generatingIndex,setGeneratingIndex]=useState(-1)
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: ""
    };
    onChange([...data, newExperience]);
  };

  // ✅ Remove experience
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ✅ Update experience field
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const generateexperience=async (index)=>{
setGeneratingIndex(index)
const experience=data[index]
const prompt=`enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`
try{
const {data}=await api.post('api/ai/enhance-job-desc',{userContent:prompt},{headers:{Authorization:token}})
updateExperience(index,"description",data.enhancedContent)

}
catch(error){
toast.error(error.message)
}
finally{
  setGeneratingIndex(-1)
}
  }
  return (
    <div className="space-y-6">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your experience for your resume here
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* ===== Empty State ===== */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience to get started</p>
        </div>
      )}

      {/* ===== Experience Cards ===== */}
      {data.map((experience, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Experience #{index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="size-4" />
            </button>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company Name"
              value={experience.company}
              onChange={(e) =>
                updateExperience(index, "company", e.target.value)
              }
              className="px-3 py-2 text-sm rounded-lg border"
            />

            <input
              type="text"
              placeholder="Job Title"
              value={experience.position}
              onChange={(e) =>
                updateExperience(index, "position", e.target.value)
              }
              className="px-3 py-2 text-sm rounded-lg border"
            />

            <input
              type="month"
              value={experience.start_date}
              onChange={(e) =>
                updateExperience(index, "start_date", e.target.value)
              }
              className="px-3 py-2 text-sm rounded-lg border"
            />

            <input
              type="month"
              value={experience.end_date}
              onChange={(e) =>
                updateExperience(index, "end_date", e.target.value)
              }
              disabled={experience.is_current}
              className="px-3 py-2 text-sm rounded-lg border disabled:bg-gray-100"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={experience.is_current}
              onChange={(e) =>
                updateExperience(index, "is_current", e.target.checked)
              }
            />
            <span className="text-sm text-gray-700">
              Currently working here
            </span>
          </label>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Job Description
              </label>
              <button onClick={()=>generateDescription(index)} disabled={generatingIndex===index ||!experience.position ||!experience.company }
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-200 rounded hover:bg-purple-300"
              >
                {generatingIndex === index?(<Loader2 className='w-3 h-3 animate-spin'/>):(  <Sparkles className="w-3 h-3" />)}
              
                Enhance with AI
              </button>
            </div>

            <textarea
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              value={experience.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              className="w-full px-3 py-2 text-sm rounded-lg border resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experienceform;
