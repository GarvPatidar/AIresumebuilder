import { GraduationCap,Plus,Trash2 } from 'lucide-react';
import React from 'react'

const Educationform = ({data,onChange}) => {

    const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
     graduation_date: "",
     gpa: "",
      
    };
    onChange([...data, newEducation]);
  };

  // ✅ Remove experience
  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // ✅ Update experience field
  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  return (
   <div className="space-y-6">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your education for your resume here
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* ===== Empty State ===== */}
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
        </div>
      )}

      {/* ===== Experience Cards ===== */}
      {data.map((education, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg space-y-4"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Education#{index + 1}</h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="size-4" />
            </button>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Institute Name"
              value={education.institution}
              onChange={(e) =>
                updateEducation(index, "institution", e.target.value)
              }
              className="px-3 py-2 text-sm  border"
            />

            <input
              type="text"
              placeholder="degree"
              value={education.degree}
              onChange={(e) =>
                updateEducation(index, "degree", e.target.value)
              }
              className="px-3 py-2 text-sm  border"
            />

            <input
              type="text"
              value={education.field ||""}
              onChange={(e) =>
                updateEducation(index, "field", e.target.value)
              }
              className="px-3 py-2 text-sm rounded-lg border"placeholder='foeld of study'
            />

            <input
              type="month"
              value={education.graduation_date}
              onChange={(e) =>
                updateEducation(index, "graduation_date", e.target.value)
              }
            
              className="px-3 py-2 text-sm rounded-lg border disabled:bg-gray-100"
            />
          </div>

          <input
              type="text"
              value={education.gpa ||""}
              onChange={(e) =>
                updateEducation(index, "gpa", e.target.value)
              }
              className="px-3 py-2 text-sm rounded-lg border"placeholder='GPA(optional)'
            />

          {/* Description */}
          
        </div>
      ))}
    </div>
  )
}

export default Educationform
