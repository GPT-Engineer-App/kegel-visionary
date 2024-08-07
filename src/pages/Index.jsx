import { useState, useEffect } from 'react';
import { Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';

const AppleWatchKegelApp = () => {
  const [isExercising, setIsExercising] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('rest'); // 'contract', 'hold', or 'rest'
  const [duration, setDuration] = useState(5); // Exercise duration in seconds

  useEffect(() => {
    let interval;
    if (isExercising) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= duration) {
            setPhase((prevPhase) => {
              switch (prevPhase) {
                case 'contract':
                  return 'hold';
                case 'hold':
                  return 'rest';
                case 'rest':
                  return 'contract';
              }
            });
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExercising, duration]);

  const toggleExercise = () => {
    setIsExercising(!isExercising);
    setTimer(0);
    setPhase('rest');
  };

  const handleDigitalCrownRotation = (direction) => {
    setDuration((prev) => Math.max(1, Math.min(10, prev + (direction === 'clockwise' ? 1 : -1))));
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'contract':
        return 'bg-red-500';
      case 'hold':
        return 'bg-yellow-500';
      case 'rest':
        return 'bg-green-500';
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white p-2">
      <div className="w-40 h-40 rounded-full border-4 border-gray-800 flex items-center justify-center mb-2">
        <div className={`w-36 h-36 rounded-full ${getPhaseColor()} flex items-center justify-center`}>
          <div className="text-center">
            <p className="text-xl font-bold">
              {phase === 'contract' ? 'Contract' : phase === 'hold' ? 'Hold' : 'Relax'}
            </p>
            <p className="text-3xl font-bold">{duration - timer}s</p>
          </div>
        </div>
      </div>
      <button
        onClick={toggleExercise}
        className={`w-12 h-12 rounded-full flex items-center justify-center ${isExercising ? 'bg-red-500' : 'bg-green-500'}`}
      >
        {isExercising ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <div className="mt-2 flex items-center">
        <button onClick={() => handleDigitalCrownRotation('counterclockwise')} className="p-1">
          <ChevronDown size={16} />
        </button>
        <span className="mx-2 text-sm">{duration}s</span>
        <button onClick={() => handleDigitalCrownRotation('clockwise')} className="p-1">
          <ChevronUp size={16} />
        </button>
      </div>
    </div>
  );
};

export default AppleWatchKegelApp;
