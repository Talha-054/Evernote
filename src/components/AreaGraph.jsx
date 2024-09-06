import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

function AreaGraph({ data }) {
      return (
            <>
                  <ResponsiveContainer width="100%" height={400} >
                        <AreaChart data={data}>
                              <CartesianGrid strokeDasharray="5 5" />
                              <XAxis dataKey={'id'} />
                              <YAxis />
                              <Tooltip />
                              <Area type="monotone" dataKey="total" stroke="#8884d8" />
                        </AreaChart>
                  </ResponsiveContainer>
            </>
      )
}

export default AreaGraph
