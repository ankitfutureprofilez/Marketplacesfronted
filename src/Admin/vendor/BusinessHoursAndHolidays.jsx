import  { useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
const BusinessHourRow = ({ day, initialOpen, initialClose, initialActive, onToggleChange, onTimeChange }) => {
    const [isActive, setIsActive] = useState(initialActive);
    const [openTime, setOpenTime] = useState(initialOpen);
    const [closeTime, setCloseTime] = useState(initialClose);

    const handleToggle = () => {
        const newState = !isActive;
        setIsActive(newState);
        onToggleChange(day, newState);
    };

    const handleOpenChange = (e) => {
        setOpenTime(e.target.value);
        onTimeChange(day, e.target.value, closeTime);
    };

    const handleCloseChange = (e) => {
        setCloseTime(e.target.value);
        onTimeChange(day, openTime, e.target.value);
    };

    const timeOptions = Array.from({ length: 14 }, (_, i) => {
        const hour = 9 + i; 
        const displayHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? 'Pm' : 'Am';
        return `${displayHour.toString().padStart(2, '0')}:00 ${period}`;
    });

    return (
        <div className={`flex items-center justify-between border-b ${day !== 'Sun' ? 'pb-4 mb-4 border-gray-100' : 'pb-0 border-none'}`}>
            <span className="text-gray-900 w-12 font-medium">{day}</span>
            <div className="flex-grow flex justify-center space-x-2 mx-4">
                {isActive ? (
                    <>
                        <select
                            value={openTime}
                            onChange={handleOpenChange}
                            className="p-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-blue-500 focus:border-blue-500 w-full"
                        >
                            {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                        <span className="text-gray-500 flex items-center">-</span>
                        <select
                            value={closeTime}
                            onChange={handleCloseChange}
                            className="p-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-blue-500 focus:border-blue-500 w-full"
                        >
                            {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                    </>
                ) : (
                    <>
                        <span className="text-gray-400 p-2 border border-gray-200 bg-gray-100 rounded-lg text-sm w-full text-center">Open</span>
                        <span className="text-gray-500 flex items-center">-</span>
                        <span className="text-gray-400 p-2 border border-gray-200 bg-gray-100 rounded-lg text-sm w-full text-center">Close</span>
                    </>
                )}
            </div>
            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={handleToggle}
                    className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${isActive ? 'translate-x-full border-white' : ''}`}></div>
                </div>
            </label>
        </div>
    );
};

const BusinessHoursAndHolidays = ({setHours ,  hours,  setExtraHoliday , extraHoliday}) => {

    const handleToggle = (day, isActive) => {
        setHours(prevHours => ({
            ...prevHours,
            [day]: { ...prevHours[day], active: isActive }
        }));
    };

    const handleTimeChange = (day, openTime, closeTime) => {
        setHours(prevHours => ({
            ...prevHours,
            [day]: { ...prevHours[day], open: openTime, close: closeTime }
        }));
    };

    const handleSave = () => {
        console.log("Saving Business Hours and Holidays:", { hours, extraHoliday });
        // Add your API call or persistence logic here
        alert("Settings Saved! Check console for data.");
    };

    return (
        <div className="p-4 mb-24">
            <h2 className="text-md font-medium text-gray-700 mb-4">Opening Hours</h2>
            <div className="space-y-2">
                {Object.keys(hours).map(day => (
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
                    value={extraHoliday.split('-').reverse().join('-')} 
                    onChange={(e) => setExtraHoliday(e.target.value.split('-').reverse().join('-'))} 
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 pr-12 appearance-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
                    <BiCalendar className="h-6 w-6" />
                </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Selected Holiday: {extraHoliday}</p>
        </div>
    );
};

export default BusinessHoursAndHolidays;