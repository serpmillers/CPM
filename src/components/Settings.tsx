import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [speed, setSpeed] = useState(50);
  const [maxAngle, setMaxAngle] = useState({
    hip: 90,
    knee: 120,
    ankle: 90
  });


  const handleMaxAngleChange = (joint: 'hip' | 'knee' | 'ankle', value: number) => {
    setMaxAngle(prev => ({
      ...prev,
      [joint]: value
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-12 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Machine Settings
        </h1>

        {/* Speed Settings */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-sm">
          <h3 className="flex items-center gap-3 mb-4 text-gray-700 font-semibold">
            <span className="w-5 h-5 bg-purple-500 rounded-full inline-block"></span>
            Motion Speed
          </h3>
          <div className="flex items-center gap-4 mb-2">
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="min-w-16 text-center font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded text-sm">
              {speed}%
            </div>
          </div>
          <small className="text-gray-500">Auto cycle motion speed</small>
        </div>

        {/* Maximum Angle Limits */}
        <div className="mb-6 p-5 bg-white rounded-xl shadow-sm">
          <h3 className="text-gray-700 font-semibold mb-4">Maximum Angle Limits</h3>
          
          {/* Hip Max Angle */}
          <div className="mb-4">
            <label className="flex items-center gap-3 mb-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Hip Maximum: {maxAngle.hip}°
            </label>
            <input
              type="range"
              min="30"
              max="120"
              value={maxAngle.hip}
              onChange={(e) => handleMaxAngleChange('hip', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Knee Max Angle */}
          <div className="mb-4">
            <label className="flex items-center gap-3 mb-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Knee Maximum: {maxAngle.knee}°
            </label>
            <input
              type="range"
              min="60"
              max="150"
              value={maxAngle.knee}
              onChange={(e) => handleMaxAngleChange('knee', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Ankle Max Angle */}
          <div className="mb-4">
            <label className="flex items-center gap-3 mb-2 text-sm text-gray-600">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Ankle Maximum: {maxAngle.ankle}°
            </label>
            <input
              type="range"
              min="30"
              max="120"
              value={maxAngle.ankle}
              onChange={(e) => handleMaxAngleChange('ankle', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="text-center px-12 pt-8 border-t border-gray-200">
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;