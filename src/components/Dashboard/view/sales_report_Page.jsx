import { useState, React } from 'react';
import SalesChart, { BarChart, ScatterChart } from '../widgets/salesChart';
import { chartData } from '../widgets/data';

function SalesReportPage() {

  const [selectedChart, setSelectedChart] = useState('sales');

  const startDate = new Date('2023-04-01');
  const endDate = new Date('2023-04-23');
  const salesData = [
    { date: new Date('2023-04-01'), sales: 100 },
    { date: new Date('2023-04-02'), sales: 120 },
    { date: new Date('2023-04-03'), sales: 130 },
    // more sales data...
  ];
  const data = {
    labels: ['Red', 'Orange', 'Blue'],
    datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        backgroundColor: [
          'red', 'green', 'blue'
        ],
        borderWidth: 1,
      }
    ]
  };
  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  }

  const chartOptions = [
    { value: 'sales', component: <SalesChart key="sales-chart" startDate={startDate} endDate={endDate} salesData={salesData}   /> },
    { value: 'bar', component: <div key="bar-chart" className='sm:w-2/3 sm:h-1/2/' ><BarChart chartData={data} /></div> },
    { value: 'scatter', component: <div key="scatter-chart" className='sm:w-2/3 sm:h-fit' ><ScatterChart chartData={chartData} /></div> },
  ];




  const DropDownMenue = <select value={selectedChart} onChange={handleChartChange} className=" p-2 rounded-lg shadow-lg">
    <option value="sales">Sales Chart</option>
    <option value="bar">Bar Chart</option>
    <option value="scatter">Scatter Chart</option>
  </select>;
  return (
    <div className="sm:col-span-4   transition-transform duration-700 ease-in-out  w-full  h-full  p-2 ">

      <h1 className="flex flex-row items-center justify-between p-4 pl-10 pr-10 sm:text-lg font-bold text-dark-blue  mb-2 bg-white rounded-lg shadow-lg  sm:w-full text-center h-fit ">Monthely Sales     {DropDownMenue}</h1>


      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-evenly w-full  bg-white rounded-lg shadow-lg  ">

        {chartOptions.map((option) => {
          if (selectedChart === option.value) {
            return option.component;
          }
          else {
            return null;
          }
        })}
      </div>

    </div>
  );
}

export default SalesReportPage;