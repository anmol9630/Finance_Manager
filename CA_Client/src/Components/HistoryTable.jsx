import React from 'react';

const HistoryTable = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">History</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Item</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">$200</td>
            <td className="border px-4 py-2">28/6/2024</td>
            <td className="border px-4 py-2">Food</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">$550</td>
            <td className="border px-4 py-2">27/6/2024</td>
            <td className="border px-4 py-2">Dress</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">$369</td>
            <td className="border px-4 py-2">26/6/2024</td>
            <td className="border px-4 py-2">Travel</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">$870</td>
            <td className="border px-4 py-2">23/6/2024</td>
            <td className="border px-4 py-2">Food</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
