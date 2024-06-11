import { useState, useEffect } from 'react';

const useTimer = (initialState = 0) => {
    const [elapsedTime, setElapsedTime] = useState<number>(initialState);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (!timer) {
            const newTimer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
            setTimer(newTimer);
        }
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timer]);

    return { elapsedTime, startTimer, stopTimer, setElapsedTime };
};

export default useTimer;