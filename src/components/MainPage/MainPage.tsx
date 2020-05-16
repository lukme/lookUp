import React from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';

const MainPage = () => {
    return (
        <div className="main">
            <div className="main__banner">
                <div className="main__image"></div>
                <div className="main__textbox">
                    <p>
                        Conveniently synthesize cost effective.
                    </p>
                </div>
            </div>
            <div className="main__selectContainer">
                <CustomSelect source='ORIGIN' />
                <CustomSelect source='DEPARTURE' />
                <CustomSelect source='DESTINATION' />
                <CustomSelect source='PASSENGERS' />
                <CustomSelect source='LUGGAGE' />
            </div>
        </div>
    )
}

export default MainPage;