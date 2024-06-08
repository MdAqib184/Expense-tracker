import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDash({ budgetList }) {
  return (
    <div className='border rounded-lg p-4'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width='80%' height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 4,
            left: 4,
            right: 4,
            bottom: 4
          }}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSpend' stackId='a' fill='#8884d8' />
          <Bar dataKey='amount' stackId='a' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDash
