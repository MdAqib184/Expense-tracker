import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

function PieChartDash({ budgetList }) {
  return (
    <div className='border rounded-lg p-4 md:p-8'>
      <h2 className='font-bold text-lg md:text-xl mb-4'>Budget Distribution</h2>
      <ResponsiveContainer width='100%' height={340}>
        <PieChart>
          <Pie
            dataKey="totalSpend"
            isAnimationActive={false}
            data={budgetList}
            cx="50%"
            cy="50%"
            outerRadius={107}
            fill="#8884d8"
            label
          >
            {budgetList.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartDash;