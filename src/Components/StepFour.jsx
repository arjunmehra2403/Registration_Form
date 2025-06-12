import React, { useState, useEffect } from 'react';
const categoriesList = [
  "Green & Clean Energy",
  "Environment Prevention",
  "Pollution Control",
  "Global Warming Prevention",
  "Healthcare",
  "Science & Technology",
  "Sustainability",
];
const StepFour = ({ onDataChange, initialData = {} }) => {
  const [schoolName, setSchoolName] = useState(initialData.schoolName || '');
  const [schoolAddress, setSchoolAddress] = useState(initialData.schoolAddress || '');
  const [schoolIdentityNumber, setSchoolIdentityNumber] = useState(initialData.schoolIdentityNumber || '');
  const [categories, setCategories] = useState(initialData.categories || []);
  const [projectType, setProjectType] = useState(initialData.projectType || '');
  const [projectTitle, setProjectTitle] = useState(initialData.projectTitle || '');

  const [errors, setErrors] = useState({});

  const toggleCategory = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!schoolName.trim()) newErrors.schoolName = 'Name of School is required.';
    if (!schoolAddress.trim()) newErrors.schoolAddress = 'Address of School is required.';
    if (!schoolIdentityNumber.trim()) newErrors.schoolIdentityNumber = 'School Identity Number is required.';
    if (categories.length === 0) newErrors.categories = 'Select at least one category.';
    if (!projectType) newErrors.projectType = 'Select type of your project/model.';
    if (!projectTitle.trim()) newErrors.projectTitle = 'Project/Model title is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

useEffect(() => {
  if (onDataChange) {
    const valid = validate();
    onDataChange({
      isValid: valid,
      schoolName,
      schoolAddress,
      schoolIdentityNumber,
      categories,
      projectType,
      projectTitle
    });
  }
}, [schoolName, schoolAddress, schoolIdentityNumber, categories, projectType, projectTitle]);


  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300 mt-6">
      <div className="p-6 space-y-6">
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Name of School <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={e => setSchoolName(e.target.value)}
            className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.schoolName ? 'border-red-600' : 'border-gray-300'
            }`}
            placeholder="Enter school name"
            required
          />
          {errors.schoolName && <p className="text-red-600 text-sm mt-1">{errors.schoolName}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Address of School <span className="text-red-600">*</span>
          </label>
          <textarea
            value={schoolAddress}
            onChange={e => setSchoolAddress(e.target.value)}
            className={`w-full border p-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.schoolAddress ? 'border-red-600' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Enter full school address"
            required
          />
          {errors.schoolAddress && <p className="text-red-600 text-sm mt-1">{errors.schoolAddress}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            School Identity Card Number <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={schoolIdentityNumber}
            onChange={e => setSchoolIdentityNumber(e.target.value)}
            className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.schoolIdentityNumber ? 'border-red-600' : 'border-gray-300'
            }`}
            placeholder="Enter school identity number"
            required
          />
          {errors.schoolIdentityNumber && <p className="text-red-600 text-sm mt-1">{errors.schoolIdentityNumber}</p>}
        </div>

        <div>
          <span className="block font-semibold text-gray-800 mb-1">
            Select Categories <span className="text-red-600">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categoriesList.map(cat => (
              <label key={cat} className="flex items-center text-gray-700 space-x-2">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="accent-green-600"
                  required
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          {errors.categories && <p className="text-red-600 text-sm mt-1">{errors.categories}</p>}
        </div>

        <div>
          <span className="block font-semibold text-gray-800 mb-1">
            Type of Your Project/Model <span className="text-red-600">*</span>
          </span>
          <div className="flex flex-wrap gap-6 text-gray-700">
            {['Working', 'Non-Working'].map(type => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={projectType === type}
                  onChange={e => setProjectType(e.target.value)}
                  className="mr-2 accent-green-600"
                  required
                />
                {type}
              </label>
            ))}
          </div>
          {errors.projectType && <p className="text-red-600 text-sm mt-1">{errors.projectType}</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Title/Name of the Project or Model <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={e => setProjectTitle(e.target.value)}
            className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.projectTitle ? 'border-red-600' : 'border-gray-300'
            }`}
            placeholder="Enter project/model title"
            required
          />
          {errors.projectTitle && <p className="text-red-600 text-sm mt-1">{errors.projectTitle}</p>}
        </div>
      </div>
    </div>
  );
};
export default StepFour;
