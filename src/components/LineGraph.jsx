import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400} >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={'id'} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
  </ResponsiveContainer>
  );
};

export default LineGraph;
;
