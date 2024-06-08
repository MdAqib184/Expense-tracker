import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartDash({ budgetList }) {
  return (
    <div className='border rounded-lg p-4'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width='80%' height={300}>
        <LineChart
          data={budgetList}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='totalSpend' stroke='red' />
          <Line type='monotone' dataKey='amount' stroke='blue' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartDash;


