import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function BarGraph({ data }) {
      return (
            <>
                  <ResponsiveContainer width="100%" height={400} >
                        <BarChart data={data}>
                              <CartesianGrid strokeDasharray="5 5" />
                              <XAxis dataKey={'id'} />
                              <YAxis />
                              <Tooltip />
                              <Bar barSize={50} type="monotone" dataKey="total" stroke="#8884d8" fill='purple' />
                        </BarChart>
                  </ResponsiveContainer>
            </>
      )
}

export default BarGraph
