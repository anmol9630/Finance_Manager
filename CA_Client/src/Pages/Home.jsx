import React from 'react';
import Chart from '../Components/Chart';
import BalanceCard from '../Components/BalanceCard';
import HistoryTable from '../Components/HistoryTable';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard title="Current Balance" amount="200.00" icon="💵" />
        <BalanceCard title="Expenses" amount="50.00" icon="🕑" />
        <BalanceCard title="Budget" amount="100.00" icon="💰" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <HistoryTable />
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <Chart title="Budget" data={[42, 58]} className="w-full h-64" />
          </div>
          <div className="w-1/2">
            <Chart title="Expense" data={[25, 15, 23, 32]} className="w-full h-64" />
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default HomePage;
