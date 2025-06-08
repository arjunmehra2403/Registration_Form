const StepTwo = ({ mode, participants, setParticipants, errors }) => {
  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300 mt-6">
      <div className="p-6">
        {mode === "Individual" ? (
          <>
            <h3 className="text-lg font-bold mb-4 bg-green-200 p-2 rounded text-green-800">
              Participants
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Participation Mode:</strong> Individual
            </p>
            <p className="text-gray-700">
              Number of participants is fixed to <strong>1</strong>.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4 bg-green-200 p-2 rounded text-green-800">
              Team Information
            </h3>

            <label className="block font-semibold mb-2 text-gray-800">
              Number of Participants in the Team <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-6 text-gray-700">
              {["2", "3"].map((num) => (
                <label key={num} className="flex items-center">
                  <input
                    type="radio"
                    name="participants"
                    value={num}
                    checked={participants === num}
                    onChange={(e) => setParticipants(e.target.value)}
                    className="mr-2 accent-green-600"
                    required
                  />
                  {num}
                </label>
              ))}
            </div>

            {errors.participants && (
              <p className="text-red-500 text-sm mt-1">{errors.participants}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StepTwo;
