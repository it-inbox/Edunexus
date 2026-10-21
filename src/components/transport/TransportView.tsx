import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { busRoutesData } from '../../data/mockData';
import { 
  Bus, MapPin, Phone, ShieldCheck, Users, 
  AlertTriangle, Navigation, Clock, CheckCircle2 
} from 'lucide-react';

export const TransportView: React.FC = () => {
  const { addToast } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(busRoutesData[0].id);

  const selectedRoute = busRoutesData.find(r => r.id === selectedRouteId) || busRoutesData[0];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Transportation', route: '/transport' },
        { label: 'Fleet & Route GPS Operations' }
      ]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">School Bus Transport Fleet</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            RTA certified fleet tracking, live GPS stop telemetry & driver verification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>4 Active Routes · 177 Students Commuting</span>
          </span>
        </div>
      </div>

      {/* Route Cards Carousel / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {busRoutesData.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white border-gray-100 hover:border-gray-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">{route.routeNo}</span>
                <StatusBadge status={route.status} />
              </div>
              <h4 className="text-xs font-semibold text-gray-800 truncate">{route.name}</h4>
              <p className="text-[11px] text-gray-500 font-mono mt-0.5">{route.busNumber}</p>
              
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-gray-500">Utilization</span>
                <span className="font-bold text-indigo-700">{route.assignedStudents} / {route.capacity} seats</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 cols: Stops and Map Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">{selectedRoute.name}</h3>
              <p className="text-xs text-gray-500">{selectedRoute.busNumber} · {selectedRoute.stops.length} Designated Neighborhood Stops</p>
            </div>
            <button
              onClick={() => {
                addToast({
                  type: 'info',
                  title: 'GPS Signal Pinged',
                  message: `Current location: Near Al Saada Street (ETA School: 12 min)`
                });
              }}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ping Live GPS</span>
            </button>
          </div>

          {/* Interactive Stops Timeline */}
          <div className="space-y-3 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200">
            {selectedRoute.stops.map((stop, idx) => (
              <div key={idx} className="relative flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-2xs" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{stop.name}</h4>
                  <p className="text-[11px] text-gray-500 font-mono mt-0.5">Scheduled: {stop.time}</p>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-700 bg-white px-2.5 py-1 rounded border border-gray-200">
                  {stop.studentsCount} Students Picked Up
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 col: Driver & Regulatory Certifications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Assigned Crew & Compliance
          </h3>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">RTA Licensed Driver</span>
            <div className="font-bold text-gray-900 text-sm">{selectedRoute.driverName}</div>
            <div className="flex items-center gap-1.5 text-indigo-600 font-mono">
              <Phone className="w-3.5 h-3.5" />
              <span>{selectedRoute.driverPhone}</span>
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Certified Bus Assistant</span>
            <div className="font-bold text-gray-900">{selectedRoute.assistantName}</div>
            <p className="text-[11px] text-gray-500">Child Safeguarding & Pediatric First-Aid Certified</p>
          </div>

          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>RTA Safety Inspection: Passed</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Vehicle speed limiter (80 km/h), electronic child check switch, and interior CCTV verified.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
