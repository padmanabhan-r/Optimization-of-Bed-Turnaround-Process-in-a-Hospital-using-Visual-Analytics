import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
} from 'recharts';

import data from '../../data/turnar_date';


class TurnDate extends PureComponent {

    render() {
        return (
            <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s' }}>
                <BarChart
                    width={470}
                    height={210}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5, paddingRight:100
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fontFamily: 'archia' }}
                    />
                    <YAxis
                        label={{
                            value: 'TAT(hrs)',
                            angle: -90,
                            position: 'Left',
                            fontFamily: 'archia',
                            fontSize: 12,
                        }}
                        tick={false}
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        wrapperStyle={{ zIndex: 100, fontSize: '12px', fontFamily: 'archia' }}
                    />
                    <Brush dataKey="date" height={25} stroke="#2E3B55" />

                    <Bar dataKey="1N" stackId="a" fill="#402D54" />
                    <Bar dataKey="1W" stackId="a" fill="#fa9fb5" />
                    <Bar dataKey="1S" stackId="a" fill="#c51b8a" />
                    <Bar dataKey="BP" stackId="a" fill="#c994c7" />
                    <Bar dataKey="SCU" stackId="a" fill="#756bb1" />
                    <Legend
                        wrapperStyle={{ fontSize: '12px', fontFamily: 'archia' }}
                        align="center"
                    />
                </BarChart>
            </div>
        );
    }
};


export default TurnDate;