// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { dummyResumeData } from '../assets/assets'
// import Loader from '../components/Loader'
// import { ArrowLeftIcon } from 'lucide-react'
// import Resumepreview from '../Components/Resumepreview'

// const Preview = () => {
//   const {resumeid}=useParams()
//     const[resumeData,setResumeData]=useState(null)
//     const loadresume=async()=>{
//       setResumeData(dummyResumeData.find(resume=>resume._id===resumeid||null))
//       setisloading(false)

//     }
//     const [isloading,setisloading]=useState(true)
//     useEffect(()=>loadresume(),[])
//   return resumeData ? (
    
//     <div className='bg-slate-100'>
//    <div className='max-w-3xl mx-auto py-10'>
//     <Resumepreview data={resumeData} template={resumeData.template} accentcolor={resumeData.accent_color} classes='py-4 bg-white'/>

//    </div>
//     </div>
//   ):(
//     {isloading ?<Loader/>:(<div>
//       <p className='text-center text-6xl text-slate-400 font-medium'>ressume not found</p>

//     <a href="" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-ooset-1 ring-1 ring-green-400 flex items-center transition-colors'>
//       <ArrowLeftIcon className='mr-2 size-4'/>
//       </a>
//       </div>)}
//   )
// }

// export default Preview


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeid } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
const loadResume=async ()=>{
  try{
const {data}=await api.get('/api/resumes/public/'+resumeid)
setResumeData(data.resume)
  }
  catch(error){
console.log(error.message);
  }
  finally{
    setIsLoading(false)
  }
}
  useEffect(() => {
    const data = dummyResumeData.find(
      resume => resume._id === resumeid
    );

    setResumeData(data || null);
    setIsLoading(false);
  }, [resumeid]);

  // 🔹 LOADING
  if (isLoading) return <Loader />;

  // 🔹 NOT FOUND
  if (!resumeData) {
    return (
      <div className="text-center mt-20">
        <p className="text-4xl text-slate-400 font-medium">
          Resume not found
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-1 ring-green-400"
        >
          <ArrowLeftIcon className="mr-2 size-4" />
          Go Back
        </Link>
      </div>
    );
  }

  // 🔹 SUCCESS
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{resumeData.name}</h1>
        <p className="text-gray-600">{resumeData.email}</p>
      </div>
    </div>
  );
};

export default Preview;
