import { useState, useEffect } from 'react';
import StepOne from './Components/StepOne';
import StepTwo from './Components/StepTwo';
import StepThree from './Components/Stepthree';
import StepFour from './Components/StepFour';
import StepFive from './Components/StepFive';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('');
  const [participants, setParticipants] = useState('');
  const [teamData, setTeamData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "Individual") {
      setParticipants('1');
      setTeamData([{ name: '', contact: '', category: '' }]);
    } else {
      setParticipants('');
      setTeamData([]);
    }
  }, [mode]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address.";
    if (!mode) newErrors.mode = "Please select a participation mode.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (mode === "Team" && !participants) newErrors.participants = "Please select number of participants.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      if (mode === "Individual") {
        setTeamData([{ name: '', contact: '', category: '' }]);
        setStep(3);
      } else {
        setStep(2);
      }
    } else if (step === 2 && validateStep2()) {
      const defaultTeam = Array.from({ length: parseInt(participants) }, () => ({
        name: '',
        contact: '',
        category: ''
      }));
      setTeamData(defaultTeam);
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5); // ✅ Go to Payment Step
    } else if (step === 5) {
      console.log({ email, mode, participants, teamData });
      alert("Form submitted!");
    }
  };

  const handleBack = () => {
    if (step === 3 && mode === "Individual") {
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClear = () => {
    setEmail('');
    setMode('');
    setParticipants('');
    setErrors({});
    setTeamData([]);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-green-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Registration Form</h2>

          {step === 1 && (
            <StepOne email={email} setEmail={setEmail} mode={mode} setMode={setMode} errors={errors} />
          )}
          {step === 2 && mode === "Team" && (
            <StepTwo mode={mode} participants={participants} setParticipants={setParticipants} errors={errors} />
          )}
          {step === 3 && (
            <StepThree teamData={teamData} setTeamData={setTeamData} />
          )}
          {step === 4 && (
            <StepFour email={email} mode={mode} participants={participants} teamData={teamData} />
          )}
          {step === 5 && (
            <StepFive email={email} mode={mode} participants={participants} teamData={teamData} />
          )}

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
            >
              Back
            </button>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleNext}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                {step === 5 ? 'Submit' : 'Next'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-green-700 hover:underline"
              >
                Clear form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
