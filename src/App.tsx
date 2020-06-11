import React, { useState } from 'react';

import './App.scss';
import { MainPage, FlightData } from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import SummaryPage from './components/SummaryPage/SummaryPage';

function App() {
    const [flightData, setFlightData] = useState<FlightData>(),
        [loginState, setLoginState] = useState(false),
        [loginConflict, setLoginConflict] = useState(false);

    return (
        <div className="App">
            <Header
                resetFlightData={() => setFlightData(undefined)}
                setGlobalLoginState={(arg) => setLoginState(arg)}
                loginConflict={loginConflict}
                resetLoginConflict={() => setLoginConflict(false)}
            />
            {!flightData
                ? <MainPage passDataBackwards={setFlightData} />
                : <SummaryPage
                    loginState={loginState}
                    flightData={flightData}
                    forceOpeningHeaderBox={() => setLoginConflict(true)}
                />}
        </div>
    );
}

export default App;
