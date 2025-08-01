import React from 'react';

interface ControlPanelProps {
  hipAngle: number;
  kneeAngle: number;
  ankleAngle: number;
  isAutoMode: boolean;
  setHipAngle: (angle: number) => void;
  setKneeAngle: (angle: number) => void;
  setAnkleAngle: (angle: number) => void;
  toggleAutoMode: () => void;
  resetPosition: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  hipAngle,
  kneeAngle,
  ankleAngle,
  isAutoMode,
  setHipAngle,
  setKneeAngle,
  setAnkleAngle,
  toggleAutoMode,
  resetPosition
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Controls Section */}
      <div className="flex-1 overflow-hidden overflow-y-auto p-12 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          CPM Machine Control
        </h1>
        
        {/* Hip Joint Control */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-sm">
          <h3 className="flex items-center gap-3 mb-4 text-gray-700 font-semibold">
            <span className="w-5 h-5 bg-red-500 rounded-full inline-block"></span>
            Hip Joint
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <input
              type="range"
              min="0"
              max="90"
              value={hipAngle}
              onChange={(e) => setHipAngle(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={isAutoMode}
            />
            <div className="min-w-16 text-center font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded text-sm">
              {hipAngle.toFixed(1)}°
            </div>
          </div>
          <small className="text-gray-500">Range: 0° - 90° (Extension to Flexion)</small>
        </div>

        {/* Knee Joint Control */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-sm">
          <h3 className="flex items-center gap-3 mb-4 text-gray-700 font-semibold">
            <span className="w-5 h-5 bg-blue-500 rounded-full inline-block"></span>
            Knee Joint
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <input
              type="range"
              min="0"
              max="120"
              value={kneeAngle}
              onChange={(e) => setKneeAngle(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={isAutoMode}
            />
            <div className="min-w-16 text-center font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded text-sm">
              {kneeAngle.toFixed(1)}°
            </div>
          </div>
          <small className="text-gray-500">Range: 0° - 120° (Extension to Flexion)</small>
        </div>

        {/* Ankle Joint Control */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-sm">
          <h3 className="flex items-center gap-3 mb-4 text-gray-700 font-semibold">
            <span className="w-5 h-5 bg-green-500 rounded-full inline-block"></span>
            Ankle Joint
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <input
              type="range"
              min="-90"
              max="0"
              value={ankleAngle}
              onChange={(e) => setAnkleAngle(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={isAutoMode}
            />
            <div className="min-w-16 text-center font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded text-sm">
              {-ankleAngle.toFixed(1)}°
            </div>
          </div>
          <small className="text-gray-500">Range: 0° to 90° (Plantarflexion to Dorsiflexion)</small>
        </div>
      </div>

      {/* Auto Controls */}
      <div className="text-center p-12">
        <button
          onClick={toggleAutoMode}
          className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 mr-2 transform hover:scale-105 ${
            isAutoMode
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isAutoMode ? 'Stop Auto Cycle' : 'Start Auto Cycle'}
        </button>
        <button
          onClick={resetPosition}
          className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          Reset Position
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;