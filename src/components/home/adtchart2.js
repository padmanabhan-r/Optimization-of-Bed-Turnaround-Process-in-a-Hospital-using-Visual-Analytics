import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// const data = [
//     {
//         unit: '1N', Admissions: 7, Discharges: 6, Transfers: 1,
//     },
//     {
//         unit: '1S', Admissions: 3, Discharges: 2, Transfers: 2,
//     },
//     {
//         unit: '1W', Admissions: 2, Discharges: 2, Transfers: 0,
//     },
//     {
//         unit: 'BP', Admissions: 1, Discharges: 3, Transfers: 0,
//     },
//     {
//         unit: 'SCU', Admissions: 2, Discharges: 1, Transfers: 1,
//     },
// ];

export default class ADTChart2 extends PureComponent {

    render() {
        const { data } = this.props;
        return (
            <div className="fadeInUp raisedbox" style={{ animationDelay: '1.3s' }}>
                <BarChart
                    width={470}
                    height={250}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="unit" tick={{ fontSize: 12, fontFamily: 'archia' }} />
                    <YAxis
                        interval="preserveStartEnd"
                        tick={{ fontSize: 12, fontFamily: 'archia' }}
                        label={{
                            value: 'Number of Patients',
                            angle: -90,
                            position: 'Left',
                            fontFamily: 'archia',
                            fontSize: 12,
                            fontColo: "black"
                        }}
                    />
                    <Tooltip wrapperStyle={{ fontFamily: 'archia' }} />
                    <Legend
                        wrapperStyle={{ fontSize: '12px', fontFamily: 'archia' }}
                        align="center"
                    />
                    
                    <Bar dataKey="Admissions" fill="#8c510a" />
                    <Bar dataKey="Discharges" fill="#35978f" />
                    <Bar dataKey="Transfers" fill="#d8b365" />
                </BarChart>
            </div>
        );
    }
}
