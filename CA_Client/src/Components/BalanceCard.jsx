import React from 'react';

const BalanceCard = ({ title, amount, icon }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
      <div className="text-4xl">{icon}</div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold">${amount}</p>
    </div>
  );
};

export default BalanceCard;
