import React, { useState } from 'react';
import './App.scss';
import { MainPage, FlightData } from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import SummaryPage from './components/SummaryPage/SummaryPage';

function App() {
    const [flightData, setFlightData] = useState<FlightData>();
    !flightData && setFlightData({
        departure: "2020-06-04",
        destination: "Vienna",
        luggage: "Carry-on & trolley",
        origin: "Lodz",
        passengers: {
            adults: "3",
            babies: "1",
            children: "2",
        }
    })

    return (
        <div className="App">
            <Header />
            {!flightData
                ? <MainPage passDataBackwards={setFlightData} />
                : <SummaryPage flightData={flightData} />}
        </div>
    );
}

export default App;
