import { useState, useEffect, useCallback, } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import toast, { Toaster } from 'react-hot-toast';

// --- НАСТРОЙКА SUPABASE ---
// Клиент Supabase создается один раз при загрузке модуля, чтобы избежать множественных экземпляров.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// --- ИКОНКИ ---
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const TruckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.34a1 1 0 0 0-.24-.64L19.5 12.5" /><path d="M10 6H4" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
);
const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const GasStationIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="15" x2="15" y1="13" y2="17" /><path d="M8.5 19H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-.5" /><path d="M18 13h-5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v0" /></svg>
);
const CreditCardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);
const FileTextIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
);
const DeleteIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
);
const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
);
const PrinterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
);
const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
const GarageIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 19v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/><path d="M4 15V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9"/><path d="M12 15v-4"/><path d="M4 19h16"/></svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);


// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
const formatISODateToShort = (isoDate) => {
    if (!isoDate) return '';
    return new Date(isoDate).toLocaleDateString('ru-RU');
};

const getISODateString = (date) => {
    if(!date) return '';
    return date.toISOString().split('T')[0];
};

const calculateTotalTime = (trips) => {
    let totalMinutes = 0;
    trips.forEach(trip => {
        const timeString = trip.time || '';
        const parts = timeString.split(' ');
        let hours = 0;
        let minutes = 0;
        const hourIndex = parts.indexOf('ч');
        if (hourIndex > -1) hours = parseInt(parts[hourIndex - 1], 10) || 0;
        const minIndex = parts.indexOf('мин');
        if (minIndex > -1) minutes = parseInt(parts[minIndex - 1], 10) || 0;
        totalMinutes += (hours * 60) + minutes;
    });
    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    return `${finalHours} ч ${finalMinutes} мин`;
};

const calculateTotalWorkTime = (trips) => {
    let totalMinutes = 0;
    trips.forEach(trip => {
        const timeString = trip.work_time || '';
        const parts = timeString.split(' ');
        let hours = 0;
        let minutes = 0;
        const hourIndex = parts.indexOf('ч');
        if (hourIndex > -1) hours = parseInt(parts[hourIndex - 1], 10) || 0;
        const minIndex = parts.indexOf('мин');
        if (minIndex > -1) minutes = parseInt(parts[minIndex - 1], 10) || 0;
        totalMinutes += (hours * 60) + minutes;
    });
    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    return `${finalHours} ч ${finalMinutes} мин`;
};

const calculateTotalDistance = (trips) => {
    let totalKm = 0;
    trips.forEach(trip => {
        const start = Number(trip.start_km) || 0;
        const end = Number(trip.end_km) || 0;
        if (end > start) {
            totalKm += end - start;
        }
    });
    return `${totalKm.toLocaleString('ru-RU')} км`;
};

const calculateTotalExpenses = (expenses, fuelings) => {
    let total = 0;
    expenses.forEach(expense => {
        total += Number(expense.amount) || 0;
    });
    fuelings.forEach(fueling => {
        total += Number(fueling.cost) || 0;
    });
    return `${total.toLocaleString('ru-RU', { style: 'currency', currency: 'EUR' })}`;
};

const calculateAverageConsumption = (fuelings) => {
    const sortedFuelings = fuelings
        .filter(f => f.odometer)
        .sort((a, b) => a.odometer - b.odometer);

    if (sortedFuelings.length < 2) {
        return '---';
    }

    const firstOdometer = sortedFuelings[0].odometer;
    const lastOdometer = sortedFuelings[sortedFuelings.length - 1].odometer;
    const totalDistance = lastOdometer - firstOdometer;

    let totalVolume = 0;
    for (let i = 1; i < sortedFuelings.length; i++) {
        totalVolume += Number(sortedFuelings[i].volume) || 0;
    }

    if (totalDistance <= 0 || totalVolume <= 0) {
        return '---';
    }

    const consumption = (totalVolume / totalDistance) * 100;
    return `${consumption.toFixed(2)} л/100км`;
};


// --- ФОРМЫ И ДРУГИЕ КОМПОНЕНТЫ В МОДАЛЬНЫХ ОКНАХ ---
function EditTripForm({ onSave, onCancel, trip = {} }) {
    const parseTime = (timeString) => {
        if (!timeString) return { hours: '', minutes: '' };
        const parts = timeString.split(' ');
        let hours = '';
        let minutes = '';
        const hourIndex = parts.indexOf('ч');
        if (hourIndex > -1) hours = parseInt(parts[hourIndex - 1], 10) || '';
        const minIndex = parts.indexOf('мин');
        if (minIndex > -1) minutes = parseInt(parts[minIndex - 1], 10) || '';
        return { hours, minutes };
    };

    const { hours: initialHours, minutes: initialMinutes } = parseTime(trip.time);
    const { hours: initialWorkHours, minutes: initialWorkMinutes } = parseTime(trip.work_time);

    const [formData, setFormData] = useState({
        date: trip.date || getISODateString(new Date()),
        start_point: trip.start_point || '',
        end_point: trip.end_point || '',
        start_km: trip.start_km || '',
        end_km: trip.end_km || '',
        hours: initialHours,
        minutes: initialMinutes,
        work_hours: initialWorkHours,
        work_minutes: initialWorkMinutes,
        status: trip.status || 'В пути',
        notes: trip.notes || '',
    });
    const [isLocatingStart, setIsLocatingStart] = useState(false);
    const [isLocatingEnd, setIsLocatingEnd] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGetLocation = async (field) => {
        if (!navigator.geolocation) {
            toast.error('Геолокация не поддерживается вашим браузером.');
            return;
        }

        if (field === 'start_point') setIsLocatingStart(true);
        else if (field === 'end_point') setIsLocatingEnd(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`);
                const data = await response.json();
                const address = data.display_name || 'Не удалось определить адрес';
                setFormData(prev => ({ ...prev, [field]: address }));
            } catch (error) {
                console.error("Ошибка при получении адреса:", error);
                toast.error('Не удалось получить адрес. Пожалуйста, введите вручную.');
            } finally {
                if (field === 'start_point') setIsLocatingStart(false);
                else if (field === 'end_point') setIsLocatingEnd(false);
            }
        }, (error) => {
            console.error("Ошибка геолокации:", error);
            toast.error('Не удалось определить геолокацию. Убедитесь, что вы предоставили доступ.');
            if (field === 'start_point') setIsLocatingStart(false);
            else if (field === 'end_point') setIsLocatingEnd(false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { hours, minutes, work_hours, work_minutes, start_km, end_km, ...rest } = formData;

        const parsedStartKm = start_km === '' ? null : Number(start_km);
        const parsedEndKm = end_km === '' ? null : Number(end_km);
        const parsedHours = hours === '' ? null : Number(hours);
        const parsedMinutes = minutes === '' ? null : Number(minutes);
        const parsedWorkHours = work_hours === '' ? null : Number(work_hours);
        const parsedWorkMinutes = work_minutes === '' ? null : Number(work_minutes);

        const timeString = `${parsedHours || 0} ч ${parsedMinutes || 0} мин`;
        const workTimeString = `${parsedWorkHours || 0} ч ${parsedWorkMinutes || 0} мин`;

        onSave({
            ...trip,
            ...rest,
            start_km: parsedStartKm,
            end_km: parsedEndKm,
            time: timeString,
            work_time: workTimeString,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-white">{trip.id ? 'Редактировать поездку' : 'Новая поездка'}</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="start_point" className="block text-sm font-medium text-slate-400 mb-2">Начальная точка</label>
                        <div className="relative">
                            <input type="text" name="start_point" id="start_point" value={formData.start_point} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10" placeholder="Город А" />
                            <button type="button" onClick={() => handleGetLocation('start_point')} disabled={isLocatingStart} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-white disabled:text-slate-600">
                                {isLocatingStart ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : (
                                    <MapPinIcon className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="end_point" className="block text-sm font-medium text-slate-400 mb-2">Конечная точка</label>
                        <div className="relative">
                            <input type="text" name="end_point" id="end_point" value={formData.end_point} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10" placeholder="Город Б" />
                            <button type="button" onClick={() => handleGetLocation('end_point')} disabled={isLocatingEnd} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-white disabled:text-slate-600">
                                {isLocatingEnd ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : (
                                    <MapPinIcon className="h-5 w-5"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="start_km" className="block text-sm font-medium text-slate-400 mb-2">Начальный км</label>
                        <input type="number" name="start_km" id="start_km" value={formData.start_km} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                    </div>
                     <div>
                        <label htmlFor="end_km" className="block text-sm font-medium text-slate-400 mb-2">Конечный км</label>
                        <input type="number" name="end_km" id="end_km" value={formData.end_km} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Дата</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Время в пути</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input type="number" name="hours" id="hours" value={formData.hours} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Часы" min="0" />
                        </div>
                        <div>
                            <input type="number" name="minutes" id="minutes" value={formData.minutes} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Минуты" min="0" max="59" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Время работы</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input type="number" name="work_hours" id="work_hours" value={formData.work_hours} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Часы" min="0" />
                        </div>
                        <div>
                            <input type="number" name="work_minutes" id="work_minutes" value={formData.work_minutes} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Минуты" min="0" max="59" />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-slate-400 mb-2">Заметки</label>
                    <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Любая дополнительная информация о поездке..."/>
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-400 mb-2">Статус</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 appearance-none">
                        <option>В пути</option><option>В процессе</option><option>Завершено</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Отмена</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">Сохранить</button>
            </div>
        </form>
    );
}

function FuelingForm({ onSave, onCancel, fueling = {} }) {
    const [formData, setFormData] = useState({
        date: fueling.date || getISODateString(new Date()),
        location: fueling.location || '',
        volume: fueling.volume || '',
        cost: fueling.cost || '',
        odometer: fueling.odometer || '',
    });
    const [isLocating, setIsLocating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataToSave = {
            ...formData,
            volume: formData.volume === '' ? null : Number(formData.volume),
            cost: formData.cost === '' ? null : Number(formData.cost),
            odometer: formData.odometer === '' ? null : Number(formData.odometer),
        };

        onSave({ ...fueling, ...dataToSave });
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Геолокация не поддерживается вашим браузером.');
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`);
                const data = await response.json();
                const address = data.display_name || 'Не удалось определить адрес';
                setFormData(prev => ({ ...prev, location: address }));
            } catch (error) {
                console.error("Ошибка при получении адреса:", error);
                toast.error('Не удалось получить адрес. Пожалуйста, введите вручную.');
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            console.error("Ошибка геолокации:", error);
            toast.error('Не удалось определить геолокацию. Убедитесь, что вы предоставили доступ.');
            setIsLocating(false);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-white">{fueling.id ? 'Редактировать заправку' : 'Новая заправка'}</h2>
            <div className="space-y-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-2">Дата</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-400 mb-2">Местоположение</label>
                    <div className="relative">
                        <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10" placeholder="Например, АЗС 'Shell', Берлин" />
                        <button type="button" onClick={handleGetLocation} disabled={isLocating} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-white disabled:text-slate-600">
                            {isLocating ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <MapPinIcon className="h-5 w-5"/>
                            )}
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="odometer" className="block text-sm font-medium text-slate-400 mb-2">Пробег (одометр)</label>
                    <input type="number" name="odometer" id="odometer" value={formData.odometer} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
                <div>
                    <label htmlFor="volume" className="block text-sm font-medium text-slate-400 mb-2">Объем (л)</label>
                    <input type="number" step="0.01" name="volume" id="volume" value={formData.volume} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-slate-400 mb-2">Стоимость (€)</label>
                    <input type="number" step="0.01" name="cost" id="cost" value={formData.cost} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors">Отмена</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Сохранить</button>
            </div>
        </form>
    );
}

function ExpenseForm({ onSave, onCancel, expense = {}, categories = [] }) {
    const [formData, setFormData] = useState({
        date: expense.date || getISODateString(new Date()),
        name: expense.name || '',
        category: expense.category || 'Другое',
        amount: expense.amount || '',
    });
    
    const defaultCategories = ['Парковка', 'Платные дороги', 'Мойка', 'Штрафы', 'Техобслуживание', 'Другое'];
    const allCategories = [...new Set([...defaultCategories, ...categories.map(c => c.name)])];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            amount: formData.amount === '' ? null : Number(formData.amount),
        };
        onSave({ ...expense, ...dataToSave });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-white">{expense.id ? 'Редактировать расход' : 'Новый расход'}</h2>
            <div className="space-y-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-2">Дата</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Название</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Например, Платная дорога A1" />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-2">Категория</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 appearance-none">
                        {allCategories.map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-400 mb-2">Сумма (€)</label>
                    <input type="number" step="0.01" name="amount" id="amount" value={formData.amount} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" />
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors">Отмена</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Сохранить</button>
            </div>
        </form>
    );
}

// --- НОВЫЙ КОМПОНЕНТ: ФОРМА ДЛЯ АВТОМОБИЛЯ ---
function VehicleForm({ onSave, onCancel, vehicle = {} }) {
    const [formData, setFormData] = useState({
        name: vehicle.name || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        year: vehicle.year || '',
        license_plate: vehicle.license_plate || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            year: formData.year === '' ? null : Number(formData.year),
        };
        onSave({ ...vehicle, ...dataToSave });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-white">{vehicle.id ? 'Редактировать ТС' : 'Новое ТС'}</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Название (например, "Мой рабочий тягач")</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="make" className="block text-sm font-medium text-slate-400 mb-2">Марка</label>
                        <input type="text" name="make" id="make" value={formData.make} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Volvo" />
                    </div>
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-slate-400 mb-2">Модель</label>
                        <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="FH16" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-slate-400 mb-2">Год выпуска</label>
                        <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="2022" />
                    </div>
                    <div>
                        <label htmlFor="license_plate" className="block text-sm font-medium text-slate-400 mb-2">Гос. номер</label>
                        <input type="text" name="license_plate" id="license_plate" value={formData.license_plate} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="B-XY 1234" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors">Отмена</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Сохранить</button>
            </div>
        </form>
    );
}


function CategoryManagerModal({ categories, onAdd, onDelete, onCancel }) {
    const [newCategory, setNewCategory] = useState('');

    const handleAdd = () => {
        if (newCategory.trim()) {
            onAdd(newCategory.trim());
            setNewCategory('');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Управление категориями</h2>
            <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-slate-300">Добавить категорию</h3>
                <div className="flex space-x-2">
                    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-grow bg-slate-700 border border-slate-600 rounded-lg p-3" placeholder="Название новой категории" />
                    <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold">Добавить</button>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-300">Существующие категории</h3>
                {categories.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto space-y-2">
                        {categories.map(cat => (
                            <li key={cat.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                                <span>{cat.name}</span>
                                <button onClick={() => onDelete(cat)} className="p-2 text-slate-400 hover:text-red-400 transition-colors"><DeleteIcon width="16" height="16"/></button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500">Вы еще не добавили ни одной категории.</p>
                )}
            </div>
            <div className="flex justify-end mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Закрыть</button>
            </div>
        </div>
    );
}

function DateRangePickerModal({ initialRange, onApply, onCancel }) {
    const [range, setRange] = useState(initialRange);

    const handleApply = () => {
        if(!range.from && !range.to) {
            onApply({from: null, to: null});
        } else if (range.from && range.to) {
             onApply(range);
        } else {
            toast.error("Пожалуйста, выберите и начальную, и конечную дату.")
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Выберите период</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="date-from" className="block text-sm font-medium text-slate-400 mb-2">Начало периода</label>
                    <input 
                        type="date" 
                        id="date-from" 
                        value={range.from || ''}
                        onChange={(e) => setRange(prev => ({ ...prev, from: e.target.value }))}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3"
                    />
                </div>
                <div>
                    <label htmlFor="date-to" className="block text-sm font-medium text-slate-400 mb-2">Конец периода</label>
                    <input 
                        type="date" 
                        id="date-to" 
                        value={range.to || ''}
                        onChange={(e) => setRange(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3"
                    />
                </div>
            </div>
             <div className="text-center mt-4">
                 <button onClick={() => setRange({from: null, to: null})} className="text-blue-400 hover:text-blue-300 text-sm">Сбросить фильтр</button>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors">Отмена</button>
                <button type="button" onClick={handleApply} className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Применить</button>
            </div>
        </div>
    );
}

// --- КОМПОНЕНТЫ ИНТЕРФЕЙСА ---
const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div className="bg-[#1e293b] rounded-2xl shadow-lg p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);

const Sidebar = ({ activeItem, setActiveItem, isOpen, onClose }) => (
    <div className={`fixed inset-y-0 left-0 bg-[#1e293b] text-white w-64 p-6 flex flex-col z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out print:hidden`}>
        <div className="flex items-center space-x-2 mb-12">
            <TruckIcon className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">TachoApp</h1>
        </div>
        <nav className="flex-grow">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Меню</h2>
            <ul>
                {[
                    { name: 'Главная', icon: HomeIcon },
                    { name: 'Мой гараж', icon: GarageIcon },
                    { name: 'Поездки', icon: TruckIcon },
                    { name: 'Рабочее время', icon: ClockIcon },
                    { name: 'Заправки', icon: GasStationIcon },
                    { name: 'Расходы', icon: CreditCardIcon },
                    { name: 'Отчеты', icon: FileTextIcon },
                    { name: 'Настройки', icon: SettingsIcon },
                ].map((item) => (
                    <li 
                        key={item.name} 
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${activeItem === item.name ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
                        onClick={() => { setActiveItem(item.name); onClose(); }}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
);

const ProfileMenu = ({ user, onLogout }) => (
  <div className="relative group">
    <div className="flex items-center space-x-2 cursor-pointer">
      <div className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white">
        {user.email[0].toUpperCase()}
      </div>
      <ChevronDownIcon className="h-4 w-4 text-slate-400 group-hover:text-white" />
    </div>
    <div className="absolute right-0 top-full mt-2 w-48 bg-[#1e293b] rounded-lg shadow-lg py-2 z-50 hidden group-hover:block">
      <div className="px-4 py-2 border-b border-slate-700">
        <p className="font-semibold text-white break-words">{user.email}</p>
      </div>
      <button 
        onClick={onLogout}
        className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
      >
        Выйти
      </button>
    </div>
  </div>
);

// --- НОВЫЙ КОМПОНЕНТ: ВЫБОР АВТОМОБИЛЯ ---
const VehicleSelector = ({ vehicles, selectedVehicle, onSelectVehicle }) => {
    if (!selectedVehicle) return null;

    return (
        <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer bg-[#1e293b] px-3 py-1 lg:px-4 lg:py-2 rounded-lg hover:bg-slate-700 transition-colors">
                <TruckIcon className="h-5 w-5 text-slate-400" />
                <span className="font-semibold">{selectedVehicle.name}</span>
                <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="absolute left-0 top-full mt-2 w-64 bg-[#1e293b] rounded-lg shadow-lg py-2 z-50 hidden group-hover:block">
                {vehicles.map(vehicle => (
                    <button
                        key={vehicle.id}
                        onClick={() => onSelectVehicle(vehicle)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <span>{vehicle.name}</span>
                        {selectedVehicle.id === vehicle.id && <CheckCircleIcon className="h-5 w-5 text-blue-400" />}
                    </button>
                ))}
            </div>
        </div>
    );
};


const Header = ({activePage, dateRange, onDateFilterClick, onMenuToggle, user, onLogout, vehicles, selectedVehicle, onSelectVehicle}) => {
    const formatDate = (date) => new Date(date).toLocaleDateString('ru-RU');
    
    return (
        <header className="flex justify-between items-center p-4 lg:p-6 bg-slate-900 border-b border-slate-800 print:hidden">
            <div className="flex items-center">
                <button onClick={onMenuToggle} className="lg:hidden mr-4 text-white hover:text-blue-400">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl lg:text-2xl font-bold text-white">{activePage === "Главная" ? "Обзор деятельности" : activePage}</h1>
            </div>
            <div className="flex items-center space-x-3 lg:space-x-6">
                <VehicleSelector vehicles={vehicles} selectedVehicle={selectedVehicle} onSelectVehicle={onSelectVehicle} />
                <button onClick={onDateFilterClick} className="flex items-center space-x-2 text-white bg-[#1e293b] px-3 py-1 lg:px-4 lg:py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm lg:text-base">
                    <CalendarIcon className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400"/>
                    <span className="hidden sm:inline">
                        {dateRange.from && dateRange.to ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}` : "Весь период"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400"/>
                </button>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {user && <ProfileMenu user={user} onLogout={onLogout} />}
                </div>
            </div>
        </header>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg flex-1 transition-transform transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg bg-${color}-500/20`}>{icon}</div>
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-slate-400 mt-1">{label}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const statusClasses = {
        'Завершено': 'bg-green-500/20 text-green-400',
        'В процессе': 'bg-blue-500/20 text-blue-400',
        'В пути': 'bg-orange-500/20 text-orange-400',
    };
    return (<span className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${statusClasses[status] || 'bg-slate-500/20 text-slate-400'}`}>{status}</span>);
};

const TripsTable = ({ trips, onEdit, onDelete, onAdd, isReport = false }) => {
    return (
        <div className={`bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg ${isReport ? 'bg-white/5' : ''}`}>
            <div className={`flex justify-between items-center mb-6 ${isReport ? 'print:hidden' : ''}`}>
                <h2 className="text-xl font-bold text-white">{isReport ? 'Детализация поездок' : 'Последние поездки'}</h2>
                {!isReport && (
                    <button onClick={onAdd} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-200">
                        <span>+</span>
                        <span>Новая поездка</span>
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-400">
                    <thead className="border-b border-slate-700 text-sm uppercase">
                        <tr>
                            <th className="p-4">Маршрут</th>
                            <th className="p-4">Дата</th>
                            <th className="p-4">Пробег (км)</th>
                            <th className="p-4">Время в пути</th>
                            <th className="p-4">Время работы</th>
                            <th className="p-4">Статус</th>
                            {!isReport && <th className="p-4 text-center">Действия</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {trips.map(trip => {
                            const distance = (Number(trip.end_km) || 0) - (Number(trip.start_km) || 0);
                            return (
                                <tr key={trip.id} className="hover:bg-slate-800/50">
                                    <td className="p-4 font-semibold text-white">{trip.start_point} → {trip.end_point}</td>
                                    <td className="p-4">{formatISODateToShort(trip.date)}</td>
                                    <td className="p-4">{distance > 0 ? distance.toLocaleString('ru-RU') : '0'}</td>
                                    <td className="p-4">{trip.time}</td>
                                    <td className="p-4">{trip.work_time}</td>
                                    <td className="p-4"><StatusBadge status={trip.status} /></td>
                                    {!isReport && (
                                        <td className="p-4">
                                            <div className="flex justify-center items-center space-x-2">
                                                <button onClick={() => onEdit(trip)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-green-400 transition-colors"><EditIcon /></button>
                                                <button onClick={() => onDelete(trip)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const FuelingsTable = ({ fuelings, onEdit, onDelete, onAdd }) => (
  <div className="bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-white">Журнал заправок</h2>
      <button onClick={onAdd} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-200">
        <span>+</span>
        <span>Добавить заправку</span>
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-slate-400">
        <thead className="border-b border-slate-700 text-sm uppercase">
          <tr>
            <th className="p-4">Дата</th>
            <th className="p-4">Местоположение</th>
            <th className="p-4">Пробег (км)</th>
            <th className="p-4">Объем (л)</th>
            <th className="p-4">Стоимость (€)</th>
            <th className="p-4 text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {fuelings.map(fueling => (
            <tr key={fueling.id} className="hover:bg-slate-800/50">
              <td className="p-4 font-semibold text-white">{formatISODateToShort(fueling.date)}</td>
              <td className="p-4">{fueling.location}</td>
              <td className="p-4">{fueling.odometer}</td>
              <td className="p-4">{fueling.volume}</td>
              <td className="p-4">{fueling.cost}</td>
              <td className="p-4">
                <div className="flex justify-center items-center space-x-2">
                  <button onClick={() => onEdit(fueling)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-green-400 transition-colors"><EditIcon /></button>
                  <button onClick={() => onDelete(fueling)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"><DeleteIcon /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ExpensesTable = ({ expenses, onEdit, onDelete, onAdd, onManageCategories }) => (
  <div className="bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-white">Журнал расходов</h2>
      <div className="flex space-x-2">
          <button onClick={onManageCategories} className="bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-700 transition-all duration-200">
            <SettingsIcon className="h-5 w-5"/>
            <span>Категории</span>
          </button>
          <button onClick={onAdd} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-200">
            <span>+</span>
            <span>Добавить расход</span>
          </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-slate-400">
        <thead className="border-b border-slate-700 text-sm uppercase">
          <tr>
            <th className="p-4">Дата</th>
            <th className="p-4">Название</th>
            <th className="p-4">Категория</th>
            <th className="p-4">Сумма (€)</th>
            <th className="p-4 text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {expenses.map(expense => (
            <tr key={expense.id} className="hover:bg-slate-800/50">
              <td className="p-4 font-semibold text-white">{formatISODateToShort(expense.date)}</td>
              <td className="p-4">{expense.name}</td>
              <td className="p-4">{expense.category}</td>
              <td className="p-4">{expense.amount}</td>
              <td className="p-4">
                <div className="flex justify-center items-center space-x-2">
                  <button onClick={() => onEdit(expense)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-green-400 transition-colors"><EditIcon /></button>
                  <button onClick={() => onDelete(expense)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"><DeleteIcon /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- НОВЫЙ КОМПОНЕНТ: СТРАНИЦА ГАРАЖА ---
const GaragePage = ({ vehicles, onAdd, onEdit, onDelete, onSetDefault }) => {
    return (
        <div className="bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Мой гараж</h2>
                <button onClick={onAdd} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-200">
                    <span>+</span>
                    <span>Добавить ТС</span>
                </button>
            </div>
            {vehicles.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    <GarageIcon className="h-24 w-24 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300">Ваш гараж пуст</h3>
                    <p className="mt-2">Добавьте ваше первое транспортное средство, чтобы начать.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} className="bg-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
                                    {vehicle.is_default && (
                                        <div className="flex items-center text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                            <CheckCircleIcon className="h-4 w-4 mr-1"/>
                                            <span>Основной</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-slate-400">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                                <p className="text-slate-300 font-mono mt-2">{vehicle.license_plate}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                                {!vehicle.is_default && (
                                    <button onClick={() => onSetDefault(vehicle)} className="text-sm text-blue-400 hover:text-blue-300">Сделать основным</button>
                                )}
                                <div className="flex items-center space-x-2 ml-auto">
                                    <button onClick={() => onEdit(vehicle)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-green-400 transition-colors"><EditIcon width="18" height="18"/></button>
                                    <button onClick={() => onDelete(vehicle)} className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"><DeleteIcon width="18" height="18"/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full mt-20 text-slate-500">
        <CreditCardIcon className="w-24 h-24 mb-4"/>
        <h2 className="text-3xl font-bold text-slate-400">Раздел "{title}"</h2>
        <p className="mt-2 text-lg">Этот раздел находится в разработке.</p>
    </div>
);

const WorkingTimePage = ({ totalTime }) => (
    <div className="bg-[#1e293b] p-8 rounded-2xl mt-8 shadow-lg text-center">
        <ClockIcon className="w-24 h-24 mb-4 text-blue-400 mx-auto"/>
        <h2 className="text-3xl font-bold text-white">Общее рабочее время</h2>
        <p className="mt-4 text-5xl font-bold text-blue-400">{totalTime}</p>
        <p className="mt-2 text-slate-400">Суммарное время за рулем из всех поездок.</p>
    </div>
);

const ExpensesReportTable = ({ expenses, fuelings }) => {
    const combinedExpenses = [
        ...fuelings.map(f => ({
            id: `fuel-${f.id}`,
            date: f.date,
            name: f.location || 'Заправка',
            category: 'Топливо',
            amount: f.cost
        })),
        ...expenses.map(e => ({
            id: `exp-${e.id}`,
            date: e.date,
            name: e.name,
            category: e.category,
            amount: e.amount
        }))
    ];

    combinedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg bg-white/5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Детализация расходов</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-400">
                    <thead className="border-b border-slate-700 text-sm uppercase">
                        <tr>
                            <th className="p-4">Дата</th>
                            <th className="p-4">Название</th>
                            <th className="p-4">Категория</th>
                            <th className="p-4">Сумма (€)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {combinedExpenses.map(item => (
                            <tr key={item.id} className="hover:bg-slate-800/50">
                                <td className="p-4 font-semibold text-white">{formatISODateToShort(item.date)}</td>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.category}</td>
                                <td className="p-4">{Number(item.amount || 0).toLocaleString('ru-RU', { style: 'currency', currency: 'EUR' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const ReportsPage = ({ trips, expenses, fuelings }) => {
    const totalTrips = trips.length;
    const totalDistance = calculateTotalDistance(trips);
    const totalTime = calculateTotalTime(trips);
    const totalExpenses = calculateTotalExpenses(expenses, fuelings);
    
    return (
        <div className="bg-[#1e293b] p-8 rounded-2xl shadow-lg">
             <div className="flex justify-between items-center mb-8 print:hidden">
                <h2 className="text-3xl font-bold text-white">Сводный отчет</h2>
                <button onClick={() => window.print()} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-200">
                    <PrinterIcon className="h-5 w-5"/>
                    <span>Печать отчета</span>
                </button>
            </div>
            
            <div className="print:block">
                 <div className="hidden print:block text-center mb-8">
                    <h1 className="text-2xl font-bold">Сводный отчет по поездкам</h1>
                    <p className="text-slate-400">за период {formatISODateToShort(trips[trips.length - 1]?.date)} - {formatISODateToShort(trips[0]?.date)}</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800/50 p-6 rounded-xl text-center">
                        <p className="text-sm text-slate-400 uppercase">Всего поездок</p>
                        <p className="text-4xl font-bold mt-2">{totalTrips}</p>
                    </div>
                     <div className="bg-slate-800/50 p-6 rounded-xl text-center">
                        <p className="text-sm text-slate-400 uppercase">Общее расстояние</p>
                        <p className="text-4xl font-bold mt-2">{totalDistance}</p>
                    </div>
                     <div className="bg-slate-800/50 p-6 rounded-xl text-center">
                        <p className="text-sm text-slate-400 uppercase">Общее время</p>
                        <p className="text-4xl font-bold mt-2">{totalTime}</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl text-center">
                        <p className="text-sm text-slate-400 uppercase">Общие расходы</p>
                        <p className="text-4xl font-bold mt-2">{totalExpenses}</p>
                    </div>
                </div>
                 <TripsTable trips={trips} isReport={true} />
                 <ExpensesReportTable expenses={expenses} fuelings={fuelings} />
            </div>
        </div>
    )
};


// --- ЭКРАН АУТЕНТИФИКАЦИИ ---
const AuthScreen = ({ supabase }) => (
  <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
    <div className="bg-[#1e293b] p-8 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center justify-center mb-8">
        <TruckIcon className="h-12 w-12 text-blue-400" />
        <h1 className="text-3xl font-bold ml-2">TachoApp</h1>
      </div>
      <Auth
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#3b82f6',
                brandAccent: '#2563eb',
              }
            }
          }
        }}
        theme="dark"
        providers={['google']}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email",
              password_label: "Пароль",
              button_label: "Войти",
              loading_button_label: "Вход...",
              link_text: "Уже есть аккаунт? Войти"
            },
            sign_up: {
              email_label: "Email",
              password_label: "Пароль",
              button_label: "Зарегистрироваться",
              loading_button_label: "Регистрация...",
              link_text: "Нет аккаунта? Зарегистрироваться"
            }
          }
        }}
      />
    </div>
  </div>
);

// --- КОМПОНЕНТЫ-ЗАГЛУШКИ ДЛЯ ЗАГРУЗКИ ---
const StatCardSkeleton = () => (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg flex-1 animate-pulse">
        <div className="flex justify-between items-start">
            <div className="p-3 rounded-lg bg-slate-700 h-12 w-12"></div>
        </div>
        <div className="mt-4">
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2 mt-2"></div>
        </div>
    </div>
);

const TableRowSkeleton = () => (
    <tr className="animate-pulse">
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
        <td className="p-4"><div className="h-4 bg-slate-700 rounded"></div></td>
    </tr>
);

const DashboardSkeleton = () => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl mt-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <div className="h-6 bg-slate-700 rounded w-1/4"></div>
                <div className="h-10 bg-slate-700 rounded w-32"></div>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                        <th className="p-4"><div className="h-4 bg-slate-700 rounded"></div></th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                </tbody>
            </table>
        </div>
    </>
);


// --- ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
export default function App() {
    // Состояния для данных
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [trips, setTrips] = useState([]);
    const [fuelings, setFuelings] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    
    // Состояния для UI
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
    const [activeMenu, setActiveMenu] = useState('Главная');
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Состояния для аутентификации
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Эффект для проверки сессии и подписки на изменения состояния аутентификации
    useEffect(() => {
      if (!supabase) return;

      let isMounted = true;
      setAuthLoading(true);

      const checkSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!isMounted) return;
        
        if (error) console.error('Ошибка проверки сессии:', error);
        setUser(session?.user || null);
        setAuthLoading(false);
      };

      checkSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (isMounted) {
            setUser(session?.user || null);
            if (event === "SIGNED_OUT") {
                setVehicles([]);
                setSelectedVehicle(null);
            }
          }
        }
      );

      return () => {
        isMounted = false;
        subscription?.unsubscribe();
      };
    }, []);

    // Эффект для загрузки списка ТС и установки выбранного по умолчанию
    useEffect(() => {
        if (!supabase || !user) return;

        const fetchVehicles = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .eq('user_id', user.id)
                .order('name', { ascending: true });

            if (error) {
                toast.error('Не удалось загрузить автомобили.');
                console.error(error);
            } else {
                const vehiclesData = data || [];
                setVehicles(vehiclesData);
                
                // Логика выбора активного ТС
                const currentSelectedIsValid = selectedVehicle && vehiclesData.some(v => v.id === selectedVehicle.id);
                if (!currentSelectedIsValid) {
                     const defaultVehicle = vehiclesData.find(v => v.is_default);
                     const firstVehicle = vehiclesData.length > 0 ? vehiclesData[0] : null;
                     setSelectedVehicle(defaultVehicle || firstVehicle);
                }
            }
            setLoading(false);
        };

        fetchVehicles();
    }, [supabase, user, selectedVehicle]); // Зависит только от пользователя

    // Эффект для загрузки данных, связанных с выбранным ТС
    useEffect(() => {
        if (!supabase || !user || !selectedVehicle) {
           setTrips([]);
           setFuelings([]);
           setExpenses([]);
           return;
        };

        const fetchDataForVehicle = async () => {
            setLoading(true);
            let tripsQuery = supabase.from('trips').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
            let fuelingsQuery = supabase.from('fuelings').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
            let expensesQuery = supabase.from('expenses').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
            let categoriesQuery = supabase.from('expense_categories').select('*').eq('user_id', user.id);

            if(dateRange.from && dateRange.to) {
                tripsQuery = tripsQuery.gte('date', dateRange.from).lte('date', dateRange.to);
                fuelingsQuery = fuelingsQuery.gte('date', dateRange.from).lte('date', dateRange.to);
                expensesQuery = expensesQuery.gte('date', dateRange.from).lte('date', dateRange.to);
            }

            const [tripsResult, fuelingsResult, expensesResult, categoriesResult] = await Promise.all([tripsQuery, fuelingsQuery, expensesQuery, categoriesQuery]);

            if (tripsResult.error) console.error('Ошибка получения поездок:', tripsResult.error); else setTrips(tripsResult.data || []);
            if (fuelingsResult.error) console.error('Ошибка получения заправок:', fuelingsResult.error); else setFuelings(fuelingsResult.data || []);
            if (expensesResult.error) console.error('Ошибка получения расходов:', expensesResult.error); else setExpenses(expensesResult.data || []);
            if (categoriesResult.error) console.error('Ошибка получения категорий:', categoriesResult.error); else setExpenseCategories(categoriesResult.data || []);
            
            setLoading(false);
        };

        fetchDataForVehicle();
    }, [supabase, user, selectedVehicle, dateRange]); // Зависит от выбранного ТС и диапазона дат


    const refreshVehicles = async (selectLast = false) => {
         if (!supabase || !user) return;
         const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });
        
        if (error) {
            toast.error("Не удалось обновить список ТС");
        } else {
            const vehiclesData = data || [];
            setVehicles(vehiclesData);
            if (selectLast && vehiclesData.length > 0) {
                setSelectedVehicle(vehiclesData[vehiclesData.length - 1]);
            }
        }
    }


    // --- ОБРАБОТЧИКИ ДЕЙСТВИЙ С ТС ---
    const handleAddVehicle = async (newVehicle) => {
        if (!supabase || !user) return;
        const isFirstVehicle = vehicles.length === 0;
        const { error } = await supabase.from('vehicles').insert([{ ...newVehicle, user_id: user.id, is_default: isFirstVehicle }]);
        
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('ТС успешно добавлено!');
            await refreshVehicles(true); // Обновляем список и выбираем только что добавленное ТС
        }
        closeModal();
    };

    const handleUpdateVehicle = async (updatedVehicle) => {
        if (!supabase) return;
        const { id, ...vehicleData } = updatedVehicle;
        await supabase.from('vehicles').update(vehicleData).eq('id', id);
        toast.success('ТС успешно обновлено!');
        await refreshVehicles();
        closeModal();
    };
    
    const handleDeleteVehicle = async (vehicle) => {
        if (!supabase) return;
        await supabase.from('vehicles').delete().eq('id', vehicle.id);
        toast.success('ТС удалено.');
        
        const remainingVehicles = vehicles.filter(v => v.id !== vehicle.id);
        setVehicles(remainingVehicles);

        if (selectedVehicle && selectedVehicle.id === vehicle.id) {
             const defaultVehicle = remainingVehicles.find(v => v.is_default);
             const firstVehicle = remainingVehicles.length > 0 ? remainingVehicles[0] : null;
             setSelectedVehicle(defaultVehicle || firstVehicle);
        }
        closeModal();
    };

    const handleSetDefaultVehicle = async (vehicle) => {
        if (!supabase || !user) return;
        await supabase.from('vehicles').update({ is_default: false }).eq('user_id', user.id);
        await supabase.from('vehicles').update({ is_default: true }).eq('id', vehicle.id);
        toast.success(`"${vehicle.name}" установлено как ТС по умолчанию.`);
        await refreshVehicles();
    };

    // --- ОБРАБОТЧИКИ ДЕЙСТВИЙ С ДАННЫМИ ---
    const fetchDataForCurrentVehicle = useCallback(async () => {
        if (supabase && user && selectedVehicle) {
             let tripsQuery = supabase.from('trips').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
             let fuelingsQuery = supabase.from('fuelings').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
             let expensesQuery = supabase.from('expenses').select('*').eq('vehicle_id', selectedVehicle.id).order('date', { ascending: false });
             const [tripsResult, fuelingsResult, expensesResult] = await Promise.all([tripsQuery, fuelingsQuery, expensesQuery]);
             if (tripsResult.error) console.error('Ошибка получения поездок:', tripsResult.error); else setTrips(tripsResult.data || []);
             if (fuelingsResult.error) console.error('Ошибка получения заправок:', fuelingsResult.error); else setFuelings(fuelingsResult.data || []);
             if (expensesResult.error) console.error('Ошибка получения расходов:', expensesResult.error); else setExpenses(expensesResult.data || []);
        }
    }, [supabase, user, selectedVehicle]);


    const handleDeleteTrip = async (trip) => {
        if (!supabase) return;
        await supabase.from('trips').delete().eq('id', trip.id);
        toast.success('Поездка удалена.');
        fetchDataForCurrentVehicle();
        closeModal();
    };
    
    const handleAddTrip = async (newTrip) => {
        if (!supabase || !user || !selectedVehicle) return;
        await supabase.from('trips').insert([{ ...newTrip, user_id: user.id, vehicle_id: selectedVehicle.id }]);
        toast.success('Поездка успешно добавлена!');
        fetchDataForCurrentVehicle();
        closeModal();
    };

    const handleUpdateTrip = async (updatedTrip) => {
        if (!supabase) return;
        const { id, ...tripData } = updatedTrip;
        await supabase.from('trips').update(tripData).eq('id', id);
        toast.success('Поездка успешно обновлена!');
        fetchDataForCurrentVehicle();
        closeModal();
    };

    const handleDeleteFueling = async (fueling) => {
        if (!supabase) return;
        await supabase.from('fuelings').delete().eq('id', fueling.id);
        toast.success('Заправка удалена.');
        fetchDataForCurrentVehicle();
        closeModal();
    };
    
    const handleAddFueling = async (newFueling) => {
        if (!supabase || !user || !selectedVehicle) return;
        await supabase.from('fuelings').insert([{ ...newFueling, user_id: user.id, vehicle_id: selectedVehicle.id }]);
        toast.success('Заправка успешно добавлена!');
        fetchDataForCurrentVehicle();
        closeModal();
    };

    const handleUpdateFueling = async (updatedFueling) => {
        if (!supabase) return;
        const { id, ...fuelingData } = updatedFueling;
        await supabase.from('fuelings').update(fuelingData).eq('id', id);
        toast.success('Заправка успешно обновлена!');
        fetchDataForCurrentVehicle();
        closeModal();
    };

    const handleDeleteExpense = async (expense) => {
        if (!supabase) return;
        await supabase.from('expenses').delete().eq('id', expense.id);
        toast.success('Расход удален.');
        fetchDataForCurrentVehicle();
        closeModal();
    };
    
    const handleAddExpense = async (newExpense) => {
        if (!supabase || !user || !selectedVehicle) return;
        await supabase.from('expenses').insert([{ ...newExpense, user_id: user.id, vehicle_id: selectedVehicle.id }]);
        toast.success('Расход успешно добавлен!');
        fetchDataForCurrentVehicle();
        closeModal();
    };

    const handleUpdateExpense = async (updatedExpense) => {
        if (!supabase) return;
        const { id, ...expenseData } = updatedExpense;
        await supabase.from('expenses').update(expenseData).eq('id', id);
        toast.success('Расход успешно обновлен!');
        fetchDataForCurrentVehicle();
        closeModal();
    };
    
    const handleAddCategory = async (name) => {
        if (!supabase || !user) return;
        await supabase.from('expense_categories').insert([{ name, user_id: user.id }]);
        toast.success('Категория добавлена!');
        const { data, error } = await supabase.from('expense_categories').select('*').eq('user_id', user.id);
        if(!error) setExpenseCategories(data || []);
    };
    const handleDeleteCategory = async (category) => {
        if (!supabase) return;
        await supabase.from('expense_categories').delete().eq('id', category.id);
        toast.success('Категория удалена.');
        const { data, error } = await supabase.from('expense_categories').select('*').eq('user_id', user.id);
        if(!error) setExpenseCategories(data || []);
    };

    const closeModal = () => setModal({ isOpen: false, type: null, data: null });
    const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
    
    const handleLogout = async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Ошибка выхода:', error);
        setUser(null);
    };

    if (authLoading || !supabase) {
        return (
            <div className="bg-[#0f172a] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-slate-400">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <AuthScreen supabase={supabase} />;
    }
    
    const totalDrivingTime = calculateTotalTime(trips);
    const totalWorkTime = calculateTotalWorkTime(trips); 
    const totalDistance = calculateTotalDistance(trips);
    const totalExpenses = calculateTotalExpenses(expenses, fuelings);
    const averageConsumption = calculateAverageConsumption(fuelings);
    
    const stats = [
        { icon: <TruckIcon className="h-6 w-6 text-blue-400"/>, value: totalDistance, label: 'Пробег за период', color: 'blue'},
        { icon: <GasStationIcon className="h-6 w-6 text-yellow-400"/>, value: averageConsumption, label: 'Средний расход', color: 'yellow'},
        { icon: <ClockIcon className="h-6 w-6 text-purple-400"/>, value: totalWorkTime, label: 'Время работы', color: 'purple'},
        { icon: <CreditCardIcon className="h-6 w-6 text-red-400"/>, value: totalExpenses, label: 'Общие расходы', color: 'red'},
    ];

    const renderContent = () => {
        if (loading) return <DashboardSkeleton />;
        if (vehicles.length > 0 && !selectedVehicle) {
             return <div className="text-center mt-20"><h2 className="text-2xl">Выберите ТС для начала работы</h2></div>
        }
        if (vehicles.length === 0 && activeMenu !== 'Мой гараж') {
            return (
                <div className="text-center py-12 text-slate-500 mt-10">
                    <GarageIcon className="h-24 w-24 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300">Сначала добавьте автомобиль</h3>
                    <p className="mt-2">Перейдите в раздел "Мой гараж", чтобы добавить ваше первое ТС.</p>
                     <button onClick={() => setActiveMenu('Мой гараж')} className="mt-6 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200">
                        Перейти в гараж
                    </button>
                </div>
            )
        }


        switch (activeMenu) {
            case 'Главная':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
                        </div>
                        <TripsTable trips={trips.slice(0, 5)} onEdit={(trip) => openModal('EDIT_TRIP', trip)} onDelete={(trip) => openModal('DELETE_TRIP', trip)} onAdd={() => openModal('ADD_TRIP')} />
                    </>
                );
            case 'Мой гараж':
                return <GaragePage vehicles={vehicles} onAdd={() => openModal('ADD_VEHICLE')} onEdit={(v) => openModal('EDIT_VEHICLE', v)} onDelete={(v) => openModal('DELETE_VEHICLE', v)} onSetDefault={handleSetDefaultVehicle} />;
            case 'Поездки':
                return <TripsTable trips={trips} onEdit={(trip) => openModal('EDIT_TRIP', trip)} onDelete={(trip) => openModal('DELETE_TRIP', trip)} onAdd={() => openModal('ADD_TRIP')} />;
            case 'Рабочее время':
                return <WorkingTimePage totalTime={totalDrivingTime} />;
            case 'Заправки':
                return <FuelingsTable fuelings={fuelings} onEdit={(f) => openModal('EDIT_FUELING', f)} onDelete={(f) => openModal('DELETE_FUELING', f)} onAdd={() => openModal('ADD_FUELING')} />;
            case 'Расходы':
                return <ExpensesTable expenses={expenses} onEdit={(e) => openModal('EDIT_EXPENSE', e)} onDelete={(e) => openModal('DELETE_EXPENSE', e)} onAdd={() => openModal('ADD_EXPENSE')} onManageCategories={() => openModal('MANAGE_CATEGORIES')} />;
            case 'Отчеты':
                 return <ReportsPage trips={trips} expenses={expenses} fuelings={fuelings} />;
            default:
                return <PlaceholderPage title={activeMenu} />;
        }
    };

    return (
        <div className="bg-[#0f172a] min-h-screen font-sans text-white">
            <Toaster position="top-center" toastOptions={{
                className: 'bg-slate-800 text-white',
            }}/>
            <Sidebar 
                activeItem={activeMenu} 
                setActiveItem={setActiveMenu} 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            <div className="lg:ml-64 print:ml-0">
                <Header 
                    activePage={activeMenu} 
                    dateRange={dateRange}
                    onDateFilterClick={() => openModal('DATE_PICKER')}
                    onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    user={user}
                    onLogout={handleLogout}
                    vehicles={vehicles}
                    selectedVehicle={selectedVehicle}
                    onSelectVehicle={setSelectedVehicle}
                />
                <main className="p-4 lg:p-8">
                    {renderContent()}
                </main>
            </div>

            {modal.isOpen && (
                <Modal onClose={closeModal}>
                    {/* Модальные окна для ТС */}
                    {modal.type === 'ADD_VEHICLE' && <VehicleForm onSave={handleAddVehicle} onCancel={closeModal} />}
                    {modal.type === 'EDIT_VEHICLE' && <VehicleForm vehicle={modal.data} onSave={handleUpdateVehicle} onCancel={closeModal} />}
                    {modal.type === 'DELETE_VEHICLE' && (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Удалить ТС?</h2>
                            <p className="text-slate-400 mb-2">Вы уверены, что хотите удалить <span className="font-bold text-white">{modal.data.name}</span>?</p>
                            <p className="text-slate-500 mb-8 text-sm">Все связанные поездки, заправки и расходы также будут удалены. Это действие необратимо.</p>
                            <div className="flex justify-center space-x-4"><button onClick={closeModal} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Отмена</button><button onClick={() => handleDeleteVehicle(modal.data)} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700">Удалить</button></div>
                        </div>
                    )}
                    
                    {/* Остальные модальные окна */}
                    {modal.type === 'DATE_PICKER' && (
                        <DateRangePickerModal 
                            initialRange={dateRange}
                            onApply={(newRange) => {
                                setDateRange(newRange);
                                closeModal();
                            }}
                            onCancel={closeModal}
                        />
                    )}
                    {modal.type === 'ADD_TRIP' && <EditTripForm onSave={handleAddTrip} onCancel={closeModal} />}
                    {modal.type === 'EDIT_TRIP' && <EditTripForm trip={modal.data} onSave={handleUpdateTrip} onCancel={closeModal} />}
                    {modal.type === 'DELETE_TRIP' && (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Удалить поездку?</h2>
                            <p className="text-slate-400 mb-8">Вы уверены, что хотите удалить поездку <span className="font-bold text-white">{modal.data.start_point} → {modal.data.end_point}</span>?</p>
                            <div className="flex justify-center space-x-4"><button onClick={closeModal} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Отмена</button><button onClick={() => handleDeleteTrip(modal.data)} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700">Удалить</button></div>
                        </div>
                    )}
                    
                    {modal.type === 'ADD_FUELING' && <FuelingForm onSave={handleAddFueling} onCancel={closeModal} />}
                    {modal.type === 'EDIT_FUELING' && <FuelingForm fueling={modal.data} onSave={handleUpdateFueling} onCancel={closeModal} />}
                    {modal.type === 'DELETE_FUELING' && (
                         <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Удалить заправку?</h2>
                            <p className="text-slate-400 mb-8">Вы уверены, что хотите удалить запись о заправке от <span className="font-bold text-white">{formatISODateToShort(modal.data.date)}</span>?</p>
                            <div className="flex justify-center space-x-4"><button onClick={closeModal} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Отмена</button><button onClick={() => handleDeleteFueling(modal.data)} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700">Удалить</button></div>
                        </div>
                    )}

                    {modal.type === 'ADD_EXPENSE' && <ExpenseForm onSave={handleAddExpense} onCancel={closeModal} categories={expenseCategories}/>}
                    {modal.type === 'EDIT_EXPENSE' && <ExpenseForm expense={modal.data} onSave={handleUpdateExpense} onCancel={closeModal} categories={expenseCategories}/>}
                    {modal.type === 'DELETE_EXPENSE' && (
                         <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Удалить расход?</h2>
                            <p className="text-slate-400 mb-8">Вы уверены, что хотите удалить запись <span className="font-bold text-white">{modal.data.name}</span>?</p>
                            <div className="flex justify-center space-x-4"><button onClick={closeModal} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700">Отмена</button><button onClick={() => handleDeleteExpense(modal.data)} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700">Удалить</button></div>
                        </div>
                    )}
                    {modal.type === 'MANAGE_CATEGORIES' && <CategoryManagerModal categories={expenseCategories} onAdd={handleAddCategory} onDelete={handleDeleteCategory} onCancel={closeModal} />}
                </Modal>
            )}
        </div>
    );
}
