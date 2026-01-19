// import React from 'react'
// import { Plus,Trash2 } from 'lucide-react';
// const Projectform = ({data,onChange}) => {
//      const addProject = () => {
//     const newProject = {
//       name: "",
//       type: "",
//       description: "",
     
      
//     };
//     onChange([...data, newProject]);
//   };

//   // ✅ Remove experience
//   const removeProject = (index) => {
//     const updated = data.filter((_, i) => i !== index);
//     onChange(updated);
//   };

//   // ✅ Update experience field
//   const updateProject = (index, field, value) => {
//     const updated = [...data];
//     updated[index] = {
//       ...updated[index],
//       [field]: value
//     };
//     onChange(updated);
//   };
//   return (
//    <div >

//       {/* ===== Header ===== */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//             Project
//           </h3>
//           <p className="text-sm text-gray-500">
//             Add your Projects 
//           </p>
//         </div>

//         <button
//           onClick={addProject}
//           className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
//         >
//           <Plus className="size-4" />
//           Add Project
//         </button>
//       </div>

//       {/* ===== Empty State ===== */}
     

//       {/* ===== Experience Cards ===== */}
//       <div className='spaxe-y-4 mt--6'>
//         {
//       data.map((project, index) => (
//         <div
//           key={index}
//           className="p-4 border border-gray-200 rounded-lg space-y-4"
//         >
//           {/* Top Bar */}
//           <div className="flex justify-between items-center">
//             <h4 className="font-medium">Project#{index + 1}</h4>
//             <button
//               onClick={() => removeProject(index)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <Trash2 className="size-4" />
//             </button>
//           </div>

//           {/* Inputs */}
//           <div className="grid md:grid-cols-2 gap-3">
//             <input
//               type="text"
//               placeholder="Project Name"
//               value={project.name}
//               onChange={(e) =>
//                 updateProject(index, "name", e.target.value)
//               }
//               className="px-3 py-2 text-sm  border rounded-lg"
//             />

//             <input
//               type="text"
//               placeholder="Type"
//               value={project.type ||""}
//               onChange={(e) =>
//                 updateProject(index, "type", e.target.value)
//               }
//               className="px-3 py-2 text-sm  border"
//             />

//              <input
//               type="text"
//               placeholder="Project Description"
//               value={project.description||""}
//               onChange={(e) =>
//                 updateProject(index, "description", e.target.value)
//               }
//               className="px-3 py-2 text-sm  border rounded-lg resize-none"
//             />

         

            
//           </div>

          
//           {/* Description */}
          
//         </div>
      
//     </div>
//   )
// }

// export default Projectform


import React from "react";
import { Plus, Trash2 } from "lucide-react";

const Projectform = ({ data , onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add your projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">
                Project #{index + 1}
              </h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid  gap-3">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded-lg"
              />

              <input
                type="text"
                placeholder="Project Type"
                value={project.type}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded-lg"
              />
            </div>

            <textarea
              rows={3}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
              className="w-full px-3 py-2 text-sm border rounded-lg resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projectform;
