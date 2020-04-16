//["#fec44f","#402D54","#c994c7","#756bb1","#D18975","#8FD175"]
//[ 1W,1N,1S,BP,1E,SCU]

module.exports = {
  labels: ['Admissions', 'Discharges', 'Transfers'],
  datasets: [
    {
      label: '1N',
      data: [4, 4, 2],
      backgroundColor: '#402D54',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      label: '1S',
      data: [2, 2, 2],
      backgroundColor: '#c994c7',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      label: '1W',
      data: [2,1, 1],
      backgroundColor: '#fec44f',
      borderWidth: 1,
      borderColor: 'black',
    },
    // {
    //   label: '1E',
    //   data: [7, 0, 0],
    //   backgroundColor: '#D18975',
    //   borderWidth: 1,
    //   borderColor: 'black',
    // },
    {
      label: 'BP',
      data: [1, 2, 0],
      backgroundColor: '#756bb1',
      borderWidth: 1,
      borderColor: 'black',
    },
    {
      label: 'SCU',
      data: [2, 2, 1],
      backgroundColor: '#8FD175',
      borderWidth: 1,
      borderColor: 'black',
    },
  ],
};
