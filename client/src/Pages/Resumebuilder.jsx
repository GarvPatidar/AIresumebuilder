// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// // import { useParams } from 'react-router-dom'
// import { dummyResumeData } from '../assets/assets'
// import { ArrowLeftIcon, Briefcase, FolderIcon, GraduationCap, Sparkle, User, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
// import Personalinfoform from '../Components/Personalinfoform'
// import Resumepreview from '../Components/Resumepreview'
// import TemplateSelector from '../Components/TemplateSelector'
// const Resumebuilder = () => {
//   const { resumeId } = useParams()
//   const [resumeData, setresumeData] = useState({
//     _id: '',
//     title: '',
//     personal_info: {},
//     professional_summary: "",
//     experience: [],
//     education: [],
//     project: [],
//     skills: [],
//     template: "classic",
//     accent_color: "#3B82F6",
//     public: false,
//   })

//   const loadExistingResume = async () => {
//     const resume = dummyResumeData.find(resume => resume._id === resumeId)
//     if (resume) {
//       setresumeData(resume)
//       document.title = resume.title
//     }

//   }

//   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
//   const [removeBackground, setRemoveBackground] = useState(false);


//   const sections = [{
//     id: "personal",
//     name: "personal Info",
//     icon: User
//   },
//   {
//     id: "summary",
//     name: "Summary",
//     icon: FileText
//   },
//   {
//     id: "experience",
//     name: "Experience",
//     icon: Briefcase
//   },
//   {
//     id: "education",
//     name: "Education",
//     icon: GraduationCap
//   },
//   {
//     id: "projects",
//     name: "Projects",
//     icon: FolderIcon
//   },
//   {
//     id: "skills",
//     name: "Skills",
//     icon: Sparkle
//   }

//   ]

//   const activeSection = sections[activeSectionIndex]
//   useEffect(() => { loadExistingResume() }, [])
//   return (
//     <div>
//       <div className='max-w-7xl mx-auto px-4 py-6'>
//         <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
//           <ArrowLeftIcon className="size-4" />  Back to Dashboard
//         </Link>
//       </div>
//       <div className='max-w-7xl mx-auto px-4 pb-8'>

//         <div className='grid lg:grid-cols-12 gap-8'>
//           {/* Left pannel from */}
//           <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
//             <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
//               {/* progress bar using active section activeSectionIndex */}
//               <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200 ' />
//               <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000  ' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />
//               {/* section navigation */}
//               <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
//               <div className='flex justify-between items-center mb-6 border-b border-gray-300'>
//                <TemplateSelector selectedTemplate={resumeData.template} onchange={(template)=>setresumeData(prev=>({...prev,template}))}/>
//               </div>
//               <div className='flex items-center'>
//               {activeSectionIndex!==0  && (
//                 <button onClick={ ()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex - 1,0))}className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ' disabled={activeSectionIndex===0}>
//                   <ChevronLeft className='size-4'/>Previous
//                 </button>
//               )}
//               <button onClick={ ()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex + 1,sections.length-1))}className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex===sections.length-1 && 'opacity-50'}`}disabled={activeSectionIndex===sections.length-1}>
//                  Next <ChevronRight className='size-4'/>
//                 </button>
              
//               </div>
//               </div>
//               {/* form content */}
//               <div className='space-y-6'>
//                 {activeSection.id==='personal' &&(
//                   <Personalinfoform data={resumeData.personal_info} onchange={(data)=>setresumeData(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setRemovebackground={setRemoveBackground}/>
//                 ) }

//               </div>

//             </div>

//           </div>
//           {/* right pannel */}
//           <div className='lg:col-span-7 max-lg:mt-6'>
//         <div>
//           {/* buttons */}

//         </div>
//         {/* resume preview */}
//         <Resumepreview data={resumeData} template={resumeData.template} accentcolor={resumeData.accent_color}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Resumebuilder


import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, FolderIcon, GraduationCap, Sparkle, User, FileText, ChevronLeft, ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon } from 'lucide-react'
import Personalinfoform from '../Components/Personalinfoform'
import Resumepreview from '../Components/Resumepreview'
import TemplateSelector from '../Components/TemplateSelector'
import Colorpicker from '../components/Colorpicker'
import Professionalsummary from '../components/professionalsummary'
import Experienceform from '../components/Experienceform'
import Educationform from '../components/Educationform'
import Projectform from '../components/Projectform'
import Skillsform from '../components/Skillsform'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../utils/api'

// import { updateResume } from '../../../server/controllers/resumecontroller'
const Resumebuilder = () => {
  const { resumeId } = useParams()
  const {token}=useSelector(state=>state.auth)
  const [resumeData, setresumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const loadExistingResume = async () => {
   try{
const {data}=await api.get('/api/resumes/get/'+resumeId,{headers:{Authorization:token}})
if(data.resume){
  setresumeData(data.resume)
  document.title=data.resume.title;
}
   }
   catch(error){
console.log(error.message)
   }

  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);


  const sections = [{
    id: "personal",
    name: "personal Info",
    icon: User
  },
  {
    id: "summary",
    name: "Summary",
    icon: FileText
  },
  {
    id: "experience",
    name: "Experience",
    icon: Briefcase
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderIcon
  },
  {
    id: "skills",
    name: "Skills",
    icon: Sparkle
  }

  ]

  const activeSection = sections[activeSectionIndex]
  useEffect(() => { loadExistingResume() }, [])

  const changeResumevisibility=async()=>{
    // setresumeData({...resumeData,public: !resumeData.public})

    try{
     const formData=new FormData()
     formData.append("resumeId",resumeId)
formData.append("resumeData",JSON.stringify({public:!resumeData.public}))

const {data}=await api.put('/api/resumes/update',formData,{headers:{
  Authorization:token
}})
setresumeData({...resumeData,public:!resumeData.public})
toast.success(data.message)
    }
    catch(error){
console.error("Error saving Resume",console.error)

    }
  }
  const handleshare=()=>{
    const frontendurl=window.location.href.split('/app/')[0];
    const resumeurl=frontendurl+'/view/'+resumeId;
    if(Navigator.share){
      navigator.share({url:resumeurl,text: "my Resume"})

    }
    else{
      alert('share not supported on this browser')
    }
  }

  const downloadresume=()=>{
    window.print()
  }

  const saveResume= async ()=>{
    try{
 let updatedResumeData=structuredClone(resumeData)
 //remove image from updated resume dats 
 if(typeof(resumeData.personal_info.image==='object')){
  delete updatedResumeData.personal_info.image

    }
    const formData=new FormData();
    formData.append("resumeId",resumeId)
    formData.append("resumeData",JSON.stringify(updatedResumeData))
    removeBackground && formData.append("removeBackground","yes");
    typeof resumeData.personal_info.image==='object'&& formData.append("image",resumeData.personal_info.image)
    const {data}=await api.put('/api/resumes/update',formData,{headers:{
      Authorization:token


    }})
    setresumeData(data.resume)
    toast.success(data.message)
  }
    catch(error){
console.error("Error saving resume:",error)
    }
  }
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className="size-4" />  Back to Dashboard
        </Link>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>

        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left pannel from */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar using active section activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200 ' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000  ' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />
              {/* section navigation */}
              <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
              <div className='flex justify-between items-center mb-6 border-b border-gray-300'>
               <TemplateSelector selectedTemplate={resumeData.template} onchange={(template)=>setresumeData(prev=>({...prev,template}))}/>
                <Colorpicker selectedcolor={resumeData.accent_color} onChange={(color)=>setresumeData(prev=>({...prev,accent_color:color}))}/>
              </div>
              <div className='flex items-center'>
              {activeSectionIndex!==0  && (
                <button onClick={ ()=>setActiveSectionIndex((prevIndex)=>Math.max(prevIndex - 1,0))}className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ' disabled={activeSectionIndex===0}>
                  <ChevronLeft className='size-4'/>Previous
                </button>
              )}
              <button onClick={ ()=>setActiveSectionIndex((prevIndex)=>Math.min(prevIndex + 1,sections.length-1))}className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex===sections.length-1 && 'opacity-50'}`}disabled={activeSectionIndex===sections.length-1}>
                 Next <ChevronRight className='size-4'/>
                </button>
              
              </div>
              </div>
              {/* form content */}
              <div className='space-y-6'>
                {activeSection.id==='personal' &&(
                  <Personalinfoform data={resumeData.personal_info} onchange={(data)=>setresumeData(prev=>({...prev,personal_info:data}))} removeBackground={removeBackground} setRemovebackground={setRemoveBackground}/>
                ) }
                {
                  activeSection.id==='summary' &&(
                    <Professionalsummary data={resumeData.professional_summary} onChange={(data)=>setresumeData(prev=>({...prev,professional_summary:data}))}  setResumeData={setresumeData}/>
                  )
                }
                {
                  activeSection.id==='experience' &&(
                    <Experienceform data={resumeData.experience} onChange={(data)=>setresumeData(prev=>({...prev,experience:data}))} />
                  )
                }
                {
                  activeSection.id==='education'&& (
                    <Educationform data={resumeData.education} onChange={(data)=>setresumeData(prev=>({...prev,education:data }))}/>
                  )
                }
                {
                  activeSection.id==='projects' && (
                    <Projectform data={resumeData.project} onChange={(data)=>setresumeData(prev => ({ ...prev, project: data }))}/>
                  )
                }
                {
                  activeSection.id==='skills' && (
                    <Skillsform data={resumeData.skills} onChange={(data)=>setresumeData(prev => ({ ...prev, skills: data }))}/>
                  )
                }

              </div>
              <button onClick={()=>{toast.promise(saveResume,{loading:'saving...'})}}className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring:hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>Save Changes</button>

            </div>

          </div>
          {/* right pannel */}
          <div className='lg:col-span-7 max-lg:mt-6'>
        <div className='relative w-full'>
         <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>

        {resumeData.public &&(<button  onClick={handleshare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
          <Share2Icon className='size-4' /> share

        </button>
        )}
        <button onClick={changeResumevisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purplr-300 rounded-lg hover:ring transition-colors'>{resumeData.public?<EyeIcon className='size-4'/>:<EyeOffIcon className='size-4'/>}
        {resumeData.public ? 'public':'private'}
        </button>
        <button onClick={downloadresume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors '>
          <DownloadIcon className='size-4'/>Download
        </button>
         </div>

        </div>
        {/* resume preview */}
        <Resumepreview data={resumeData} template={resumeData.template} accentcolor={resumeData.accent_color}/>
        
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resumebuilder
