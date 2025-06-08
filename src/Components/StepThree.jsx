const categories = [
  "EWS/SC/ST School Students: ₹10 per student",
  "Government School Students: ₹20 per student",
  "Government-aided Public-School Students: ₹100 per student",
  "Public/Private School Students: ₹299 per student"
];

const StepThree = ({ teamData, setTeamData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...teamData];
    updated[index][field] = value;
    setTeamData(updated);
  };

  const isIndividual = teamData.length === 1;

  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300 mt-6">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4 bg-green-200 p-2 rounded text-green-800">
          Participant Details
        </h3>

        {teamData.map((member, idx) => (
          <div key={idx} className="mb-8 border-b pb-6 last:border-b-0">
            <h4 className="font-semibold text-gray-800 mb-3 text-md">
              {isIndividual ? "Participant" : idx === 0 ? "Team Leader" : `Participant ${idx + 1}`}
            </h4>

            <label className="block font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
              required
            />

            {(isIndividual || idx === 0 || idx === 1 || idx === 2) && (
              <>
                <label className="block font-medium text-gray-700 mb-1">
                  WhatsApp / Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={member.contact || ""}
                  onChange={(e) => handleChange(idx, "contact", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                  required
                />
              </>
            )}

            <label className="block font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 text-gray-800">
              {categories.map((cat, i) => (
                <label key={i} className="flex items-center">
                  <input
                    type="radio"
                    name={`category-${idx}`}
                    value={cat}
                    checked={member.category === cat}
                    onChange={(e) => handleChange(idx, "category", e.target.value)}
                    className="mr-2 accent-green-600"
                    required
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepThree;
