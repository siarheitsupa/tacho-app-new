import React, { useState, useEffect, useCallback } from 'react';
// ИСПРАВЛЕНИЕ: Стандартный импорт для Vercel после установки пакета
import { createClient } from '@supabase/supabase-js';

// --- НАСТРОЙКА SUPABASE ---
// Ключи будут браться из переменных окружения Vercel
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
// -------------------------

// Создаем клиент Supabase, только если ключи доступны
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
const WrenchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
);
const FileTextIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
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

const calculateTotalFuel = (fuelings) => {
    let totalLiters = 0;
    fuelings.forEach(fueling => {
        totalLiters += Number(fueling.volume) || 0;
    });
    return `${totalLiters.toLocaleString('ru-RU')} л`;
};

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
                    { name: 'Поездки', icon: TruckIcon },
                    { name: 'Рабочее время', icon: ClockIcon },
                    { name: 'Заправки', icon: GasStationIcon },
                    { name: 'Техобслуживание', icon: WrenchIcon },
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


const Header = ({activePage, dateRange, onDateFilterClick, onMenuToggle}) => {
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
                <button onClick={onDateFilterClick} className="flex items-center space-x-2 text-white bg-[#1e293b] px-3 py-1 lg:px-4 lg:py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm lg:text-base">
                    <CalendarIcon className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400"/>
                    <span className="hidden sm:inline">
                        {dateRange.from && dateRange.to ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}` : "Весь период"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400"/>
                </button>
                <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="bg-blue-500 h-8 w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center font-bold text-white text-sm lg:text-base">ИП</div>
                    <div className="hidden sm:block">
                        <p className="font-semibold text-white text-sm lg:text-base">Иван Петров</p>
                        <p className="text-xs lg:text-sm text-green-400">● В пути</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg flex-1 transition-transform transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg bg-${color}-500/20`}>{icon}</div>
            <button className="text-slate-500 hover:text-white">...</button>
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
    return (<span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[status] || 'bg-slate-500/20 text-slate-400'}`}>{status}</span>);
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
                            <th className="p-4">Время</th>
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
                                    <td className="p-4"><StatusBadge status={trip.status} /></td>
                                    {!isReport && (
                                        <td className="p-4">
                                            <div className="flex justify-center items-center space-x-2">
                                                <button onClick={() => onEdit(trip)} className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><EditIcon /></button>
                                                <button onClick={() => onDelete(trip)} className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><DeleteIcon /></button>
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
                            <td className="p-4">{fueling.volume}</td>
                            <td className="p-4">{fueling.cost}</td>
                            <td className="p-4">
                                <div className="flex justify-center items-center space-x-2">
                                    <button onClick={() => onEdit(fueling)} className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><EditIcon /></button>
                                    <button onClick={() => onDelete(fueling)} className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><DeleteIcon /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full mt-20 text-slate-500">
        <WrenchIcon className="w-24 h-24 mb-4"/>
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

const ReportsPage = ({ trips }) => {
    const totalTrips = trips.length;
    const totalDistance = calculateTotalDistance(trips);
    const totalTime = calculateTotalTime(trips);
    
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
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                </div>
                 <TripsTable trips={trips} isReport={true} />
            </div>
        </div>
    )
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
export default function App() {
    const [trips, setTrips] = useState([]);
    const [fuelings, setFuelings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
    const [activeMenu, setActiveMenu] = useState('Главная');
    const [dateRange, setDateRange] = useState({ from: null, to: null });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = useCallback(async () => {
        if (!supabase) return; // Не выполнять, если supabase не инициализирован
        setLoading(true);
        console.log(`Fetching data for range: ${dateRange.from} to ${dateRange.to}`);
        
        let tripsQuery = supabase.from('trips').select('*').order('date', { ascending: false });
        let fuelingsQuery = supabase.from('fuelings').select('*').order('date', { ascending: false });
        
        if(dateRange.from && dateRange.to) {
            tripsQuery = tripsQuery.gte('date', dateRange.from).lte('date', dateRange.to);
            fuelingsQuery = fuelingsQuery.gte('date', dateRange.from).lte('date', dateRange.to);
        }

        const [tripsResult, fuelingsResult] = await Promise.all([tripsQuery, fuelingsQuery]);

        if (tripsResult.error) console.error('Ошибка получения поездок:', tripsResult.error);
        else setTrips(tripsResult.data || []);

        if (fuelingsResult.error) console.error('Ошибка получения заправок:', fuelingsResult.error);
        else setFuelings(fuelingsResult.data || []);
        
        setLoading(false);
    }, [dateRange]);

    useEffect(() => {
        if (supabase) {
            const channel = supabase.channel('schema-db-changes')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public' },
                    (payload) => {
                        console.log('Change received!', payload);
                        fetchData();
                    }
                )
                .subscribe();

            fetchData(); // Initial fetch

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [fetchData]);


    // --- ОБРАБОТЧИКИ ДЕЙСТВИЙ ---
    const handleDeleteTrip = async (trip) => {
        await supabase.from('trips').delete().eq('id', trip.id);
        closeModal();
    };
    
    const handleAddTrip = async (newTrip) => {
        await supabase.from('trips').insert([newTrip]);
        closeModal();
    };

    const handleUpdateTrip = async (updatedTrip) => {
        const { id, ...tripData } = updatedTrip;
        await supabase.from('trips').update(tripData).eq('id', id);
        closeModal();
    };

    const handleDeleteFueling = async (fueling) => {
        await supabase.from('fuelings').delete().eq('id', fueling.id);
        closeModal();
    };
    
    const handleAddFueling = async (newFueling) => {
        await supabase.from('fuelings').insert([newFueling]);
        closeModal();
    };

    const handleUpdateFueling = async (updatedFueling) => {
        const { id, ...fuelingData } = updatedFueling;
        await supabase.from('fuelings').update(fuelingData).eq('id', id);
        closeModal();
    };

    const closeModal = () => setModal({ isOpen: false, type: null, data: null });
    const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
    
    if (!supabase) {
        return <div className="bg-[#0f172a] min-h-screen flex items-center justify-center text-white text-xl">Настройка подключения к базе данных...</div>
    }
    
    const totalDrivingTime = calculateTotalTime(trips);
    const totalDistance = calculateTotalDistance(trips);
    const totalFuel = calculateTotalFuel(fuelings);
    
    const stats = [
        { icon: <TruckIcon className="h-6 w-6 text-blue-400"/>, value: totalDistance, label: 'Пробег за период', color: 'blue'},
        { icon: <ClockIcon className="h-6 w-6 text-green-400"/>, value: totalDrivingTime, label: 'Время за рулем', color: 'green'},
        { icon: <ClockIcon className="h-6 w-6 text-red-400"/>, value: '32 ч', label: 'Время отдыха', color: 'red'},
        { icon: <GasStationIcon className="h-6 w-6 text-yellow-400"/>, value: totalFuel, label: 'Расход топлива', color: 'yellow'},
    ];

    const renderContent = () => {
        if (loading) return <div className="text-center py-10">Загрузка...</div>;

        switch (activeMenu) {
            case 'Главная':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
                        </div>
                        <TripsTable trips={trips} onEdit={(trip) => openModal('EDIT_TRIP', trip)} onDelete={(trip) => openModal('DELETE_TRIP', trip)} onAdd={() => openModal('ADD_TRIP')} />
                    </>
                );
            case 'Поездки':
                return <TripsTable trips={trips} onEdit={(trip) => openModal('EDIT_TRIP', trip)} onDelete={(trip) => openModal('DELETE_TRIP', trip)} onAdd={() => openModal('ADD_TRIP')} />;
            case 'Рабочее время':
                return <WorkingTimePage totalTime={totalDrivingTime} />;
            case 'Заправки':
                return <FuelingsTable fuelings={fuelings} onEdit={(f) => openModal('EDIT_FUELING', f)} onDelete={(f) => openModal('DELETE_FUELING', f)} onAdd={() => openModal('ADD_FUELING')} />;
            case 'Отчеты':
                 return <ReportsPage trips={trips} />;
            default:
                return <PlaceholderPage title={activeMenu} />;
        }
    };

    return (
        <div className="bg-[#0f172a] min-h-screen font-sans text-white">
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
                />
                <main className="p-4 lg:p-8">
                    {renderContent()}
                </main>
            </div>

            {modal.isOpen && (
                <Modal onClose={closeModal}>
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
                </Modal>
            )}
        </div>
    );
}

// --- ФОРМЫ И ДРУГИЕ КОМПОНЕНТЫ В МОДАЛЬНЫХ ОКНАХ ---
const EditTripForm = ({ onSave, onCancel, trip = {} }) => {
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

    const [formData, setFormData] = useState({
        date: trip.date || getISODateString(new Date()),
        start_point: trip.start_point || '',
        end_point: trip.end_point || '',
        start_km: trip.start_km || '',
        end_km: trip.end_km || '',
        hours: initialHours,
        minutes: initialMinutes,
        status: trip.status || 'В пути',
    });
    const [isLocatingStart, setIsLocatingStart] = useState(false);
    const [isLocatingEnd, setIsLocatingEnd] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGetLocation = async (field) => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером.');
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
                alert('Не удалось получить адрес. Пожалуйста, введите вручную.');
            } finally {
                if (field === 'start_point') setIsLocatingStart(false);
                else if (field === 'end_point') setIsLocatingEnd(false);
            }
        }, (error) => {
            console.error("Ошибка геолокации:", error);
            alert('Не удалось определить геолокацию. Убедитесь, что вы предоставили доступ.');
            if (field === 'start_point') setIsLocatingStart(false);
            else if (field === 'end_point') setIsLocatingEnd(false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { hours, minutes, ...rest } = formData;
        const timeString = `${hours || 0} ч ${minutes || 0} мин`;
        onSave({ ...trip, ...rest, time: timeString });
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
};

const FuelingForm = ({ onSave, onCancel, fueling = {} }) => {
    const [formData, setFormData] = useState({
        date: fueling.date || getISODateString(new Date()),
        location: fueling.location || '',
        volume: fueling.volume || '',
        cost: fueling.cost || '',
    });
    const [isLocating, setIsLocating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...fueling, ...formData });
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером.');
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
                alert('Не удалось получить адрес. Пожалуйста, введите вручную.');
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            console.error("Ошибка геолокации:", error);
            alert('Не удалось определить геолокацию. Убедитесь, что вы предоставили доступ.');
            setIsLocating(false);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-white">{fueling.id ? 'Редактировать заправку' : 'Новая заправка'}</h2>
            <div className="space-y-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-400 mb-2">Дата</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" required />
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-400 mb-2">Местоположение</label>
                    <div className="relative">
                        <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 pr-10" placeholder="Например, АЗС 'Shell', Берлин" required />
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
                    <label htmlFor="volume" className="block text-sm font-medium text-slate-400 mb-2">Объем (л)</label>
                    <input type="number" step="0.01" name="volume" id="volume" value={formData.volume} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" required />
                </div>
                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-slate-400 mb-2">Стоимость (€)</label>
                    <input type="number" step="0.01" name="cost" id="cost" value={formData.cost} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3" required />
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors">Отмена</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Сохранить</button>
            </div>
        </form>
    );
};

const DateRangePickerModal = ({ initialRange, onApply, onCancel }) => {
    const [range, setRange] = useState(initialRange);

    const handleApply = () => {
        if(!range.from && !range.to) {
            onApply({from: null, to: null});
        } else if (range.from && range.to) {
             onApply(range);
        } else {
            alert("Пожалуйста, выберите и начальную, и конечную дату.")
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
};
