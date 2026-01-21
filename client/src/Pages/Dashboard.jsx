

// import React, { useEffect, useState } from 'react'
// import {
//   FilePenLineIcon,
//   Loader2Icon,
//   LoaderCircleIcon,
//   PencilIcon,
//   PlusIcon,
//   TrashIcon,
//   UploadCloud,
//   UploadCloudIcon,
//   XIcon
// } from 'lucide-react'
// import { dummyResumeData } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'
// // import pdftotext from 'react-pdftotext'
// import pdfToText from 'react-pdftotext'
// import api from '../utils/api'


// const Dashboard = () => {
  
//   const {user,token}=useSelector(state=>state.auth);
//   const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
//   const navigate = useNavigate()
//   const [allResume, setAllResumes] = useState([])

//   const [showCreateResume, setShowCreateResume] = useState(false)
//   const [showuploadResume, setShowuploadResume] = useState(false)
//   const [tittle, settittle] = useState('')
//   const [resume, setResume] = useState(null)
//   const [editResumeId, setEditResumeId] = useState('')
//   const [isloading,setisloading]=useState(false)
//   const loadAllResumes = async () => {
//     try{
//       const {data}=await api.post('/api/users/resumes',{tittle},{headers:{
//   Authorization:token}})

//   setAllResumes(data.resumes)
//     }
//     catch(error){
//    toast.error(error?.response?.data?.message || error.message)
//     }
//   }

//   const createResume = async (event) => {
//     // event.preventDefault()
//     // setShowCreateResume(false)
//     // navigate(`/app/builder/res123`)
//     try{
//         event.preventDefault()
//         const {data}=await api.post('/api/resumes/create',{tittle},{headers:{Authorization:token}})
//         setAllResumes([...allResume,data.resume])
//         settittle('')
//         setShowCreateResume(false)
//         navigate(`/app/builder/${data.resume._id}`)
//     }
//    catch (error){
// toast.error(error?.response?.data?.message || error.message)
//    }
//   }
//   const uploadresume= async(event)=>{
//     event.preventDefault(true)
//     try{
// const resumeText=await pdfToText(resume)
// const {data}=await api.post('/api/ai/upload-resume',{tittle,resumeText},{headers:{
//   Authorization:token
// }})
// settittle('')
//   setResume(null)
//   setShowuploadResume(false)
//   navigate(`/app/builder/${data.resumeId}`)

//     }
   
    
  
//   catch(error){
//     toast.error(error?.response?.data?.message || error.message)
//   }
//   setisloading(false)
// }

//   const editTitle=async (event)=>{
//     try{
//     event.preventDefault()
//     const {data}=await api.put(`/api/resumes/update/` ,{resumeId:editResumeId,resumeData:{tittle}},{headers:{ Authorization:token
//     }})
//     setAllResumes(allResume.map(resume=>resume.id===editResumeId?{...resume,tittle}:resume))
//     settittle('')
//       setEditResumeId('')
//       toast.success(data.message)
    

//     }
//     catch(error){
// toast.error(error?.response?.data?.message || error.message)
//     }
//   }
//   const deleteresume=async (resumeId)=>{
//     try{
//        const confirm =window.confirm('Are you sure you  want to delete resume')
//      if (confirm){
//      const {data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{
//       Authorization:token
//      }})
//      setAllResumes(allResume.filter(resume=>resume._id !==resumeId))
//      }
//     }
  
//   catch(error){
// toast.error(error?.response?.data?.message || error.message)
//   }
// }
//   useEffect(() => {
//     loadAllResumes()
//   }, [])

//   return (
//     <div className='max-w-7xl mx-auto px-4 py-8'>
//       {/* Heading */}
//       <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
//         Welcome, John Doe
//       </p>

//       {/* Action Buttons */}
//       <div className='flex gap-4'>
//         <button onClick={() => {
//           setShowCreateResume(true)
//         }} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
//           <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
//           <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>
//             Create Resume
//           </p>
//         </button>

//         <button onClick={()=>setShowuploadResume(true)}className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
//           <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
//           <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>
//             Upload Existing
//           </p>
//         </button>
//       </div>

//       <hr className='border-slate-300 my-6 sm:w-[305px]' />

//       {/* Resume Cards */}
//       <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
//         {allResume.map((resume, index) => {
//           const baseColor = colors[index % colors.length]

//           return (
//             <button
//               key={resume._id} onClick={()=>navigate(`/app/builder/${resume._id}`)}
//               className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
//               style={{
//                 background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
//                 borderColor: baseColor + '40'
//               }}
//             >
//               <FilePenLineIcon
//                 className='size-7 group-hover:scale-105 transition-all'
//                 style={{ color: baseColor }}
//               />

//               <p
//                 className='text-sm group-hover:scale-105 transition-all px-2 text-center'
//                 style={{ color: baseColor }}
//               >
//                 {resume.title}
//               </p>

//               <p
//                 className='absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center'
//                 style={{ color: baseColor + '90' }}
//               >
//                 Updated on {new Date(resume.updatedAt).toLocaleDateString()}
//               </p>

//               <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 hidden group-hover:flex items-center'>
//                 <TrashIcon onClick={()=>deleteresume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
//                 <PencilIcon onClick={()=>{setEditResumeId(resume._id);
//                   settittle(resume.tittle)
//                 }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
//               </div>
//             </button>
//           )
//         })}
//       </div>
//       <div>
//         {showCreateResume && (<form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center' action="">
//           <div onClick={(e) => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
//             <input  onChange={(e)=>{
//               settittle(e.target.value)
//             }} value={tittle} type="text" placeholder="Enter Resume Tittle" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 ' required />
//             <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors '>Create Resume</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => {
//               setShowCreateResume(false); settittle('')
//             }} />
//           </div>


//         </form>)}

//         {showuploadResume && (
//           <form onSubmit={uploadresume} onClick={() => setShowuploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center' action="">
//           <div onClick={(e) => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Upload a Resume</h2>
//             <input onChange={(e)=>{
//               settittle(e.target.value)
//             }} value={tittle} type="text" placeholder="Enter Resume Tittle" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 ' required />
//             <div>
//              <label htmlFor="resume-input" className='block text-sm text-slate-700'>Select Resume File
//               <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
//              { resume ? (<p className='text-green-700'>{resume.name}</p>):(
//               <>
//              <UploadCloud className='size-14 stroke-1'/>
//              <p>Upload resume</p>

//              </>
//             )}
//               </div>
//               </label>
//               <input type='file' id='resume-input' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])} /> 
//             </div>
//             <button disabled ={isloading} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'> 
//               {isloading && <LoaderCircleIcon className='animate-spin size-4 text-white '/>}
//               {isloading ? 'uploading...':'upload Resume'}
//               upload Resume</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => {
//               setShowuploadResume(false); settittle('')
//             }} />
//           </div>


//         </form>
//         )}

//         {editResumeId && (<form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center' action="">
//           <div onClick={(e) => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
//             <h2 className='text-xl font-bold mb-4'>Edit a Resume</h2>
//             <input  onChange={(e)=>{
//               settittle(e.target.value)
//             }} value={tittle} type="text" placeholder="Enter Resume Tittle" className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 ' required />
//             <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors '>update</button>
//             <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => {
//               setEditResumeId(''); settittle('')
//             }} />
//           </div>


//         </form>)}

//       </div>
//     </div>
//   )
// }

// export default Dashboard



import React, { useEffect, useState } from 'react'
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  LoaderCircleIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'
import api from '../utils/api'

const Dashboard = () => {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [allResume, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]

  // 🔹 LOAD ALL RESUMES
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/resumes')
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // 🔹 CREATE RESUME
  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/resumes/create', { title })
      setAllResumes([...allResume, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // 🔹 UPLOAD RESUME
  const uploadResume = async (e) => {
    e.preventDefault()
    if (!resumeFile) return toast.error("Please select a PDF")

    try {
      setIsLoading(true)
      const resumeText = await pdfToText(resumeFile)

      const { data } = await api.post('/api/ai/upload-resume', {
        title,
        resumeText
      })

      setTitle('')
      setResumeFile(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 EDIT TITLE
  const editTitle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put('/api/resumes/update', {
        resumeId: editResumeId,
        resumeData: { title }
      })

      setAllResumes(allResume.map(r =>
        r._id === editResumeId ? { ...r, title } : r
      ))

      setEditResumeId('')
      setTitle('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // 🔹 DELETE RESUME
  const deleteResume = async (resumeId) => {
    if (!window.confirm("Are you sure?")) return
    try {
      await api.delete(`/api/resumes/delete/${resumeId}`)
      setAllResumes(allResume.filter(r => r._id !== resumeId))
      toast.success("Resume deleted")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>

      <p className='text-2xl font-medium mb-6'>
        Welcome, {user?.name}
      </p>

      {/* ACTION BUTTONS */}
      <div className='flex gap-4'>
        <button
          onClick={() => setShowCreateResume(true)}
          className='w-full sm:max-w-36 h-48 border border-dashed rounded-lg flex flex-col items-center justify-center gap-2'>
          <PlusIcon />
          Create Resume
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className='w-full sm:max-w-36 h-48 border border-dashed rounded-lg flex flex-col items-center justify-center gap-2'>
          <UploadCloudIcon />
          Upload Resume
        </button>
      </div>

      <hr className='my-6' />

      {/* RESUME LIST */}
      <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
        {allResume.map((resume, index) => {
          const baseColor = colors[index % colors.length]

          return (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className='relative w-full sm:max-w-36 h-48 cursor-pointer rounded-lg border flex flex-col items-center justify-center'
              style={{ borderColor: baseColor }}
            >
              <FilePenLineIcon style={{ color: baseColor }} />
              <p>{resume.title}</p>

              <div className='absolute top-1 right-1 flex gap-1'>
                <TrashIcon onClick={(e) => {
                  e.stopPropagation()
                  deleteResume(resume._id)
                }} />

                <PencilIcon onClick={(e) => {
                  e.stopPropagation()
                  setEditResumeId(resume._id)
                  setTitle(resume.title)
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <form onSubmit={createResume} className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='bg-white p-6 rounded'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Resume title'
              required
            />
            <button>Create</button>
            <XIcon onClick={() => setShowCreateResume(false)} />
          </div>
        </form>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <form onSubmit={uploadResume} className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='bg-white p-6 rounded'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Resume title'
              required
            />
            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
            <button disabled={isLoading}>
              {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Upload"}
            </button>
            <XIcon onClick={() => setShowUploadResume(false)} />
          </div>
        </form>
      )}

      {/* EDIT MODAL */}
      {editResumeId && (
        <form onSubmit={editTitle} className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='bg-white p-6 rounded'>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <button>Update</button>
            <XIcon onClick={() => setEditResumeId('')} />
          </div>
        </form>
      )}
    </div>
  )
}

export default Dashboard




