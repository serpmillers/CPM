import React, { useState, useEffect, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import Settings from './components/Settings';

interface CPMMachineProps {
  className?: string;
}

export const CPMMachine: React.FC<CPMMachineProps> = ({ className = '' }) => {
  const [hipAngle, setHipAngle] = useState(30);
  const [kneeAngle, setKneeAngle] = useState(45);
  const [ankleAngle, setAnkleAngle] = useState(-30);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [autoDirection, setAutoDirection] = useState(1);
  const [activeTab, setActiveTab] = useState<'control' | 'settings'>('control');
  
  const autoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto motion effect
  useEffect(() => {
    if (isAutoMode) {
      autoIntervalRef.current = setInterval(() => {
        setHipAngle(prev => {
          const newHip = prev + autoDirection * 0.5;
          setKneeAngle(prevKnee => {
            const newKnee = prevKnee + autoDirection * 0.8;
            setAnkleAngle(prevAnkle => {
              const newAnkle = prevAnkle + autoDirection * 0.3;
              
              // Reverse direction at limits
              if (newHip >= 80 || newHip <= 10) {
                setAutoDirection(prev => prev * -1);
              }
              
              // Keep within bounds
              return Math.max(-90, Math.min(0, newAnkle));
            });
            return Math.max(0, Math.min(120, newKnee));
          });
          return Math.max(0, Math.min(90, newHip));
        });
      }, 50);
    } else {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
        autoIntervalRef.current = null;
      }
    }

    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
      }
    };
  }, [isAutoMode, autoDirection]);

  const toggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  const resetPosition = () => {
    setHipAngle(0);
    setKneeAngle(0);
    setAnkleAngle(-30);
  };

  const totalRange = hipAngle + kneeAngle + Math.abs(ankleAngle);

  // Calculate joint positions for SVG
  const calculateJointPositions = () => {
    const hipX = 200;
    const hipY = 250;
    
    const hipRotation = -hipAngle;
    const hipRadians = (hipRotation * Math.PI) / 180;
    const kneeX = hipX + 120 * Math.cos(hipRadians);
    const kneeY = hipY + 120 * Math.sin(hipRadians);
    
    const kneeRotation = hipRotation - kneeAngle;
    const kneeRadians = (kneeRotation * Math.PI) / 180;
    const ankleX = kneeX + 100 * Math.cos(kneeRadians);
    const ankleY = kneeY + 100 * Math.sin(kneeRadians);
    
    const ankleRotation = kneeRotation + ankleAngle;
    
    return {
      hip: { x: hipX, y: hipY, rotation: hipRotation },
      knee: { x: kneeX, y: kneeY, rotation: kneeRotation },
      ankle: { x: ankleX, y: ankleY, rotation: ankleRotation }
    };
  };

  const positions = calculateJointPositions();

  return (
    <div className={`flex h-screen w-screen flex-col items-center bg-gradient-to-br from-slate-50 to-blue-100 p-5 ${className}`}>
      {/* Data Display */}
      <div className="bg-white text-gray-800 p-5 rounded-2xl shadow-2xl flex flex-row w-[90%] justify-around">
        <h3 className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${isAutoMode ? 'bg-green-400' : 'bg-gray-400'}`}></span>
          Machine Status
        </h3>
        <div className="space-2 gap-4 text-sm flex flex-row">
          <div className="flex justify-between gap-2">
            <span>Hip Angle: </span>
            <span>{hipAngle.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Knee Angle: </span>
            <span>{kneeAngle.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Ankle Angle: </span>
            <span>{ankleAngle.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Total Range: </span>
            <span>{totalRange.toFixed(1)}°</span>
          </div>
          <div className="flex justify-between gap-2">
            <span>Mode: </span>
            <span>{isAutoMode ? 'Auto Cycle' : 'Manual'}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-8 bg-white rounded-2xl shadow-2xl m-7 h-[85%] w-[90%]">
        <div className='bg-gray-50 border-r border-gray-200 h-[100%] flex flex-col rounded-bl-2xl rounded-tl-2xl'>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('control')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'control'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Control Panel
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0 p-6 overflow-y-auto">
            {activeTab === 'control' ? (
              <ControlPanel
                hipAngle={hipAngle}
                kneeAngle={kneeAngle}
                ankleAngle={ankleAngle}
                isAutoMode={isAutoMode}
                setHipAngle={setHipAngle}
                setKneeAngle={setKneeAngle}
                setAnkleAngle={setAnkleAngle}
                toggleAutoMode={toggleAutoMode}
                resetPosition={resetPosition}
              />
            ) : (
              <Settings />
            )}
          </div>
        </div>

        {/* Machine View */}
        <div className="flex-1 p-24 flex items-center justify-center bg-white rounded-br-2xl rounded-tr-2xl">
          <svg
            viewBox="0 0 600 400"
            className="border-2 border-gray-300 rounded-xl bg-gray-50"
          >
            {/* Base and Frame */}
            <rect x="50" y="320" width="500" height="20" fill="#374151" rx="10"/>
            <rect x="80" y="280" width="20" height="60" fill="#374151" rx="5"/>
            <rect x="480" y="280" width="20" height="60" fill="#374151" rx="5"/>
            
            {/* Rail System */}
            <rect x="100" y="285" width="380" height="10" fill="#6b7280" rx="5"/>
            <circle cx="120" cy="290" r="8" fill="#9ca3af"/>
            <circle cx="460" cy="290" r="8" fill="#9ca3af"/>
            
            {/* Support Structure */}
            <rect x="180" y="240" width="15" height="50" fill="#374151" rx="7"/>
            <rect x="380" y="240" width="15" height="50" fill="#374151" rx="7"/>
            
            {/* Hip Joint (Red) */}
            <circle cx={positions.hip.x} cy={positions.hip.y} r="12" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
            
            {/* Upper Leg (Thigh) */}
            <g transform={`rotate(${positions.hip.rotation}, ${positions.hip.x}, ${positions.hip.y})`}>
              <rect x="200" y="240" width="120" height="20" fill="#3b82f6" rx="10"/>
              <rect x="310" y="245" width="20" height="10" fill="#2563eb" rx="5"/>
            </g>
            
            {/* Knee Joint (Blue) */}
            <circle cx={positions.knee.x} cy={positions.knee.y} r="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
            
            {/* Lower Leg (Shin) */}
            <g transform={`rotate(${positions.knee.rotation}, ${positions.knee.x}, ${positions.knee.y})`}>
              <rect x={positions.knee.x} y={positions.knee.y - 10} width="100" height="20" fill="#8b5cf6" rx="10"/>
              <rect x={positions.knee.x + 90} y={positions.knee.y - 5} width="15" height="10" fill="#7c3aed" rx="5"/>
            </g>
            
            {/* Ankle Joint (Green) */}
            <circle cx={positions.ankle.x} cy={positions.ankle.y} r="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
            
            {/* Foot Platform */}
            <g transform={`rotate(${positions.ankle.rotation}, ${positions.ankle.x}, ${positions.ankle.y})`}>
              <rect x={positions.ankle.x} y={positions.ankle.y - 10} width="60" height="20" fill="#14b8a6" rx="10"/>
              <rect x={positions.ankle.x + 15} y={positions.ankle.y - 15} width="30" height="10" fill="#0d9488" rx="5"/>
              {/* Foot straps */}
              <rect x={positions.ankle.x + 10} y={positions.ankle.y - 25} width="40" height="5" fill="#374151" rx="2"/>
              <rect x={positions.ankle.x + 15} y={positions.ankle.y + 15} width="30" height="5" fill="#374151" rx="2"/>
            </g>
            
            {/* Joint Labels */}
            <text x="200" y="310" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">HIP</text>
            <text x="320" y="310" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">KNEE</text>
            <text x="425" y="310" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">ANKLE</text>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};