import React, { useMemo } from 'react';

const StepFive = ({ teamData }) => {
  const calculateAmount = (category) => {
    if (category.includes("₹10")) return 10;
    if (category.includes("₹20")) return 20;
    if (category.includes("₹100")) return 100;
    if (category.includes("₹299")) return 299;
    return 0;
  };

  const totalAmount = useMemo(() => {
    return teamData.reduce((sum, member) => sum + calculateAmount(member.category), 0);
  }, [teamData]);

  const upiLink = `upi://pay?appid=inb_admin&tr=IND7117239c584e41e192287dde09e5603d&am=${totalAmount}&mc=&pa=9837862235@indianbnk&pn=M%20S%20GREENIN%20URJA&tn=Greenovation%20Payment&cu=INR&bn=M%20S%20GREENIN%20URJA&mode=19&purpose=`;

  return (
    <div className="max-w-2xl mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden border border-green-300 mt-6 p-6 text-center">
      <h3 className="text-xl font-bold text-green-800 mb-4">Payment Details</h3>
      <p className="text-gray-700 text-lg mb-4">Total Amount to Pay: <span className="font-semibold">₹{totalAmount}</span></p>
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
    </div>
  );
};

export default StepFive;
