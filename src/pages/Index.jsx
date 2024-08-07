import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const [isExercising, setIsExercising] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState('rest'); // 'contract', 'hold', or 'rest'

  useEffect(() => {
    let interval;
    if (isExercising) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 15) {
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
  }, [isExercising]);

  const toggleExercise = () => {
    setIsExercising(!isExercising);
    setTimer(0);
    setPhase('rest');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kegel Exercise Visualizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold mb-2">
              {phase === 'contract' ? 'Contract' : phase === 'hold' ? 'Hold' : 'Relax'}
            </p>
            <Progress value={(timer / 15) * 100} className="w-full h-2" />
            <p className="mt-2">{15 - timer} seconds</p>
          </div>
          <div className="flex justify-center mb-6">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
              phase === 'contract' ? 'bg-red-500 animate-pulse' :
              phase === 'hold' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              <div className={`w-24 h-24 rounded-full ${
                phase === 'contract' ? 'bg-red-600' :
                phase === 'hold' ? 'bg-yellow-600' : 'bg-green-600'
              }`}></div>
            </div>
          </div>
          <Button onClick={toggleExercise} className="w-full">
            {isExercising ? 'Stop Exercise' : 'Start Exercise'}
          </Button>
          <div className="mt-4 text-sm text-gray-600 flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
            <p>Remember to breathe normally and only contract the pelvic floor muscles.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
