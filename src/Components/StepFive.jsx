import React, { useMemo, useEffect, useState } from 'react';

const StepFive = ({ teamData }) => {
  const [isValidTeam, setIsValidTeam] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

const calculateAmount = (category) => {
  if (!category) return 0;
  if (category.includes("₹299")) return 299;
  if (category.includes("₹100")) return 100;
  if (category.includes("₹20")) return 20;
  if (category.includes("₹10")) return 10;
  return 0;
};

  const totalAmount = useMemo(() => {
    return teamData.reduce((sum, member) => sum + calculateAmount(member.category), 0);
  }, [teamData]);

  // Validation Logic
useEffect(() => {
  const categories = teamData.map(member => member.category || "");

  if (teamData.length === 2) {
    const count10 = categories.filter(cat => cat.includes("₹10")).length;
    if (
      count10 === 2 ||
      count10 === 1 ||
      categories[0] === categories[1]
    ) {
      setIsValidTeam(true);
      setShowPopup(false);
    } else {
      setIsValidTeam(false);
      setShowPopup(true);
    }
  } else if (teamData.length === 3) {
    const count10 = categories.filter(cat => cat.includes("₹10")).length;
    const filtered = categories.filter(cat => !cat.includes("₹10"));
    const unique = [...new Set(filtered)];

    if (
      (count10 === 1 && unique.length === 1) || // 1 from ₹10 and rest 2 same
      (count10 === 3) || // All three are ₹10
      (count10 === 0 && new Set(categories).size === 1) // all 3 same (none are ₹10)
    ) {
      setIsValidTeam(true);
      setShowPopup(false);
    } else {
      setIsValidTeam(false);
      setShowPopup(true);
    }
  } else {
    // For individual or other team sizes (like 1), accept by default
    setIsValidTeam(true);
    setShowPopup(false);
  }
}, [teamData]);




  const upiLink = `upi://pay?appid=inb_admin&tr=IND7117239c584e41e192287dde09e5603d&am=${totalAmount}&mc=&pa=9837862235@indianbnk&pn=M%20S%20GREENIN%20URJA&tn=Greenovation%20Payment&cu=INR&bn=M%20S%20GREENIN%20URJA&mode=19&purpose=`;

  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300 mt-6 p-6 text-center relative">
      <h3 className="text-xl font-bold text-green-800 mb-4">Payment Details</h3>
      <p className="text-gray-700 text-lg mb-4">Total Amount to Pay: <span className="font-semibold">₹{totalAmount}</span></p>

      {isValidTeam ? (
        <>
          <a
            href={upiLink}
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay Now via UPI
          </a>
          <div className="mt-6">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`}
              alt="UPI QR Code"
              className="mx-auto"
            />
            <p className="text-sm text-gray-500 mt-2">Scan this QR code to pay</p>
          </div>
        </>
      ) : (
        showPopup && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-400">
            <p className="font-semibold">Payment Error:</p>
            <p>
              For a 2-member team, one participant must belong to the category <strong>"EWS/SC/ST School Students: ₹10 per student"</strong> and the other must belong to any other category,
              or both can be from the same category.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default StepFive;

