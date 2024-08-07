import { useState, useEffect } from 'react';

const AppleWatchKegelApp = () => {
  const [isExercising, setIsExercising] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('rest'); // 'contract', 'hold', or 'rest'

  useEffect(() => {
    let interval;
    if (isExercising) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 5) { // Shorter intervals for Apple Watch
            setPhase((prevPhase) => {
              switch (prevPhase) {
                case 'contract':
                  // Simulate haptic feedback for phase change
                  console.log('Haptic: Hold');
                  return 'hold';
                case 'hold':
                  console.log('Haptic: Rest');
                  return 'rest';
                case 'rest':
                  console.log('Haptic: Contract');
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
  }, [isExercising]);

  const toggleExercise = () => {
    setIsExercising(!isExercising);
    setTimer(0);
    setPhase('rest');
    // Simulate haptic feedback for start/stop
    console.log('Haptic: Start/Stop Exercise');
  };

  // Simulate Digital Crown interaction
  const handleDigitalCrownRotation = (direction) => {
    if (direction === 'clockwise') {
      // Increase exercise duration or intensity
      console.log('Increase exercise duration/intensity');
    } else {
      // Decrease exercise duration or intensity
      console.log('Decrease exercise duration/intensity');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center mb-4">
        <p className="text-2xl font-bold">
          {phase === 'contract' ? 'Contract' : phase === 'hold' ? 'Hold' : 'Relax'}
        </p>
        <p className="text-xl">{5 - timer}s</p>
      </div>
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
        phase === 'contract' ? 'bg-red-500 animate-pulse' :
        phase === 'hold' ? 'bg-yellow-500' : 'bg-green-500'
      }`}>
        <div className={`w-20 h-20 rounded-full ${
          phase === 'contract' ? 'bg-red-600' :
          phase === 'hold' ? 'bg-yellow-600' : 'bg-green-600'
        }`}></div>
      </div>
      <button
        onClick={toggleExercise}
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        {isExercising ? 'Stop' : 'Start'}
      </button>
      <div className="mt-4">
        <p className="text-xs text-center">Rotate Crown to adjust</p>
        <div className="flex justify-between w-full mt-2">
          <button onClick={() => handleDigitalCrownRotation('counterclockwise')} className="text-xs">-</button>
          <button onClick={() => handleDigitalCrownRotation('clockwise')} className="text-xs">+</button>
        </div>
      </div>
    </div>
  );
};

export default AppleWatchKegelApp;
