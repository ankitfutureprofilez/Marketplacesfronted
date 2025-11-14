import { useState } from 'react';
import { BiCalendar } from 'react-icons/bi';

const BusinessHourRow = ({
  day,
  initialOpen,
  initialClose,
  initialActive,
  onToggleChange,
  onTimeChange
}) => {
  const [isActive, setIsActive] = useState(initialActive);
  const [openTime, setOpenTime] = useState(initialOpen);
  const [closeTime, setCloseTime] = useState(initialClose);

  // Format time to always be HH:mm
  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
  };

  // Generate list of times every hour
  const timeOptions = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
  );

  // Close times must be after open time
  const closeTimeOptions = timeOptions.filter(
    (time) => parseInt(time.split(':')[0]) > parseInt(openTime?.split(':')[0])
  );

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggleChange(day, newState);
  };

  const handleOpenChange = (e) => {
    const newOpen = formatTime(e.target.value);
    setOpenTime(newOpen);

    // Auto-adjust close time if before open
    if (
      closeTime &&
      parseInt(closeTime.split(':')[0]) <= parseInt(newOpen.split(':')[0])
    ) {
      const firstValidClose = closeTimeOptions[0] || newOpen;
      setCloseTime(firstValidClose);
      onTimeChange(day, newOpen, firstValidClose);
    } else {
      onTimeChange(day, newOpen, closeTime);
    }
  };

  const handleCloseChange = (e) => {
    const newClose = formatTime(e.target.value);
    setCloseTime(newClose);
    onTimeChange(day, openTime, newClose);
  };

  return (
    <div
      className={`flex items-center justify-between border-b ${
        day !== 'Sun'
          ? 'pb-4 mb-4 border-gray-100'
          : 'pb-0 border-none'
      }`}
    >
      <span className="text-gray-900 w-12 font-medium">{day}</span>
      <div className="flex-grow flex justify-center space-x-2 mx-4">
        {isActive ? (
          <>
            <input
              type="time"
              value={formatTime(openTime)}
              onChange={handleOpenChange}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <span className="text-gray-500 flex items-center">-</span>
            <input
              type="time"
              value={formatTime(closeTime)}
              onChange={handleCloseChange}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </>
        ) : (
          <>
            <span className="text-gray-400 p-2 border border-gray-200 bg-gray-100 rounded-lg text-sm w-full text-center">
              Open
            </span>
            <span className="text-gray-500 flex items-center">-</span>
            <span className="text-gray-400 p-2 border border-gray-200 bg-gray-100 rounded-lg text-sm w-full text-center">
              Close
            </span>
          </>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={handleToggle}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 rounded-full peer transition-colors ${
            isActive ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <div
            className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
              isActive ? 'translate-x-full border-white' : ''
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

const BusinessHoursAndHolidays = ({ setHours, hours, setExtraHoliday, extraHoliday }) => {
  const handleToggle = (day, isActive) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], active: isActive }
    }));
  };

  const handleTimeChange = (day, openTime, closeTime) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: openTime, close: closeTime }
    }));
  };

  // Convert DD-MM-YYYY → YYYY-MM-DD for date input
  const formattedHoliday = extraHoliday
    ? extraHoliday.split('-').reverse().join('-')
    : '';

  // Convert back to DD-MM-YYYY on change
  const handleDateChange = (e) => {
    const val = e.target.value.split('-').reverse().join('-');
    setExtraHoliday(val);
  };

  return (
    <div className="p-4">
      <h2 className="text-md font-medium text-gray-700 mb-4">Opening Hours</h2>
      <div className="space-y-2">
        {Object.keys(hours).map((day) => (
          <BusinessHourRow
            key={day}
            day={day}
            initialOpen={hours[day].open}
            initialClose={hours[day].close}
            initialActive={hours[day].active}
            onToggleChange={handleToggle}
            onTimeChange={handleTimeChange}
          />
        ))}
      </div>

      <hr className="my-6 border-t border-gray-200" />

      <h2 className="text-md font-medium text-gray-700 mb-4">Extra Holidays</h2>

      <div className="relative">
        <input
          type="date"
          value={formattedHoliday}
          onChange={handleDateChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 pr-12 appearance-none"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
          <BiCalendar className="h-6 w-6" />
        </div>
      </div>
      {extraHoliday && (
        <p className="mt-2 text-sm text-gray-500">
          Selected Holiday: {extraHoliday}
        </p>
      )}
    </div>
  );
};

export default BusinessHoursAndHolidays;
