import React, { useState, useEffect } from 'react';

const Speedometer = () => {
    const [speedData, setSpeedData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/speed-data/');
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched speed data:', data);
                setSpeedData(data); // Update state with new data
                setError(null); // Clear any previous errors
            } else {
                console.error('Failed to fetch speed data:', response.statusText);
                setError('Failed to fetch speed data');
            }
        } catch (error) {
            console.error('Error fetching speed data:', error);
            setError('Error fetching speed data');
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data initially

        const intervalId = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    return (
        <div>
            <h1>Speedometer</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                speedData ? (
                    <div>
                        <p>Speed: {speedData.speed} km/h</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            )}
        </div>
    );
};

export default Speedometer;
