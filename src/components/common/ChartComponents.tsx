import React, { useState } from 'react';

// === 1. AREA TREND CHART ===
interface AreaTrendChartProps {
  data: { label: string; value: number; secondary?: number }[];
  height?: number;
  color?: string;
  secondaryColor?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  data,
  height = 200,
  color = '#6366F1',
  secondaryColor = '#0EA5E9',
  valuePrefix = '',
  valueSuffix = ''
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.secondary || 0))) * 1.15 || 100;
  const minVal = 0;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - ((d.value - minVal) / (maxVal - minVal)) * graphHeight;
    return { x, y, ...d };
  });

  const pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

  let secondaryPathD = '';
  if (data[0].secondary !== undefined) {
    const secPoints = data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * graphWidth;
      const y = padding.top + graphHeight - (((d.secondary || 0) - minVal) / (maxVal - minVal)) * graphHeight;
      return { x, y };
    });
    secondaryPathD = `M ${secPoints[0].x} ${secPoints[0].y} ` + secPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  }

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={`area-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + graphHeight * (1 - ratio);
          const val = Math.round(minVal + ratio * (maxVal - minVal));
          return (
            <g key={i}>
              <line 
                x1={padding.left} 
                y1={y} 
                x2={width - padding.right} 
                y2={y} 
                stroke="#F3F4F6" 
                strokeDasharray={ratio === 0 ? '0' : '4 4'}
              />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-[10px] fill-gray-400 font-mono">
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
              </text>
            </g>
          );
        })}

        {/* Filled Area */}
        <path d={areaD} fill={`url(#area-grad-${color.replace('#', '')})`} />

        {/* Primary Stroke Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Optional Secondary Line */}
        {secondaryPathD && (
          <path d={secondaryPathD} fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
        )}

        {/* Interactive Data points */}
        {points.map((p, idx) => (
          <g key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === idx ? 5.5 : 3.5}
              fill="#FFFFFF"
              stroke={color}
              strokeWidth="2.5"
              className="transition-all duration-150"
            />
            {/* Label along X */}
            <text x={p.x} y={height - 8} textAnchor="middle" className="text-[11px] fill-gray-500 font-medium">
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Tooltip */}
      {hoveredIndex !== null && (
        <div 
          className="absolute z-20 pointer-events-none px-3 py-1.5 bg-gray-900 text-white rounded-md shadow-lg text-xs"
          style={{
            left: `${(points[hoveredIndex].x / width) * 100}%`,
            top: `${(points[hoveredIndex].y / height) * 100}%`,
            transform: 'translate(-50%, -130%)'
          }}
        >
          <div className="font-semibold text-gray-200">{points[hoveredIndex].label}</div>
          <div className="font-mono text-indigo-300 font-bold">
            {valuePrefix}{points[hoveredIndex].value.toLocaleString()}{valueSuffix}
          </div>
          {points[hoveredIndex].secondary !== undefined && (
            <div className="text-[11px] text-sky-300 font-mono">
              Secondary: {valuePrefix}{(points[hoveredIndex].secondary || 0).toLocaleString()}{valueSuffix}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// === 2. BAR COMPARISON CHART ===
interface BarChartProps {
  data: { label: string; value: number; secondary?: number; color?: string }[];
  height?: number;
  valueSuffix?: string;
  horizontal?: boolean;
}

export const BarComparisonChart: React.FC<BarChartProps> = ({
  data,
  height = 220,
  valueSuffix = '',
  horizontal = false
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxVal = Math.max(...data.map(d => Math.max(d.value, d.secondary || 0))) * 1.15 || 100;

  if (horizontal) {
    return (
      <div className="space-y-3 w-full">
        {data.map((item, idx) => {
          const pct = Math.min(100, (item.value / maxVal) * 100);
          return (
            <div key={idx} className="group cursor-pointer">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-mono font-semibold text-gray-900">{item.value.toLocaleString()}{valueSuffix}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.color || '#6366F1'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const width = 500;
  const padding = { top: 20, right: 20, bottom: 35, left: 40 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  const barWidth = Math.min(36, (graphWidth / data.length) * 0.55);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Horizontal gridlines */}
        {[0, 0.33, 0.66, 1].map((r, i) => {
          const y = padding.top + graphHeight * (1 - r);
          const val = Math.round(r * maxVal);
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F3F4F6" strokeDasharray="3 3" />
              <text x={padding.left - 6} y={y + 3} textAnchor="end" className="text-[10px] fill-gray-400 font-mono">
                {val}
              </text>
            </g>
          );
        })}

        {data.map((d, idx) => {
          const x = padding.left + (idx + 0.5) * (graphWidth / data.length) - barWidth / 2;
          const barHeight = (d.value / maxVal) * graphHeight;
          const y = padding.top + graphHeight - barHeight;
          const barColor = d.color || '#6366F1';
          const isHovered = hoveredIdx === idx;

          return (
            <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer">
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={barColor}
                opacity={hoveredIdx !== null && !isHovered ? 0.65 : 1}
                className="transition-all duration-200"
              />
              <text
                x={x + barWidth / 2}
                y={height - 12}
                textAnchor="middle"
                className="text-[11px] fill-gray-600 font-medium"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div 
          className="absolute z-20 pointer-events-none px-2.5 py-1 bg-gray-900 text-white rounded shadow text-xs"
          style={{
            left: `${((padding.left + (hoveredIdx + 0.5) * (graphWidth / data.length)) / width) * 100}%`,
            top: '20%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-semibold">{data[hoveredIdx].label}</div>
          <div className="font-mono text-indigo-300 font-bold">
            {data[hoveredIdx].value.toLocaleString()}{valueSuffix}
          </div>
        </div>
      )}
    </div>
  );
};

// === 3. DONUT BREAKDOWN CHART ===
interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  innerRadiusRatio?: number;
  centerLabel?: string;
  centerValue?: string;
}

export const DonutBreakdownChart: React.FC<DonutChartProps> = ({
  data,
  size = 180,
  innerRadiusRatio = 0.68,
  centerLabel,
  centerValue
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  let cumulativeAngle = -90; // Start at 12 o'clock

  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const radius = size / 2 - 8;
    const innerRadius = radius * innerRadiusRatio;
    const center = size / 2;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;
    const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return { ...d, pathD, percentage: ((d.value / total) * 100).toFixed(1) };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform transition-all">
          {segments.map((seg, idx) => (
            <path
              key={idx}
              d={seg.pathD}
              fill={seg.color}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              opacity={hoveredIdx !== null && hoveredIdx !== idx ? 0.6 : 1}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer transition-all duration-200"
            />
          ))}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-xl font-bold text-gray-900 font-mono tracking-tight">
            {hoveredIdx !== null ? `${segments[hoveredIdx].percentage}%` : centerValue || '100%'}
          </span>
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            {hoveredIdx !== null ? segments[hoveredIdx].label : centerLabel || 'Total'}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-2 flex-1 w-full">
        {segments.map((item, idx) => (
          <div 
            key={idx} 
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between text-xs py-1 px-2 rounded cursor-pointer transition-colors ${
              hoveredIdx === idx ? 'bg-gray-100 font-medium' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-gray-700 truncate max-w-[140px]">{item.label}</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-gray-500 text-[11px]">{item.percentage}%</span>
              <span className="font-semibold text-gray-900">{item.value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === 4. ATTENDANCE HEATMAP GRID ===
interface HeatmapProps {
  grades: string[];
  days: string[];
  matrix: number[][]; // rows: grades, cols: days
}

export const AttendanceHeatmap: React.FC<HeatmapProps> = ({ grades, days, matrix }) => {
  const [hoveredCell, setHoveredCell] = useState<{ grade: string; day: string; rate: number } | null>(null);

  const getColor = (rate: number) => {
    if (rate >= 96) return 'bg-emerald-500 text-white';
    if (rate >= 93) return 'bg-emerald-400 text-white';
    if (rate >= 90) return 'bg-emerald-200 text-emerald-900';
    if (rate >= 85) return 'bg-amber-300 text-amber-950';
    return 'bg-rose-400 text-white';
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[420px]">
        {/* Days Header */}
        <div className="grid grid-cols-6 gap-1.5 mb-1.5 text-xs font-semibold text-gray-500">
          <div className="text-left pl-1">Grade Level</div>
          {days.map((day, dIdx) => (
            <div key={dIdx} className="text-center">{day}</div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="space-y-1.5">
          {grades.map((grade, rIdx) => (
            <div key={rIdx} className="grid grid-cols-6 gap-1.5 items-center">
              <div className="text-xs font-medium text-gray-700 truncate pl-1">{grade}</div>
              {days.map((day, cIdx) => {
                const rate = matrix[rIdx]?.[cIdx] ?? 95;
                const cellClass = getColor(rate);
                return (
                  <div
                    key={cIdx}
                    onMouseEnter={() => setHoveredCell({ grade, day, rate })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`h-8 rounded flex items-center justify-center text-xs font-mono font-medium transition-transform duration-100 cursor-pointer hover:scale-105 shadow-xs ${cellClass}`}
                  >
                    {rate}%
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mt-4 pt-3 border-t border-gray-100">
          <span>Scale:</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> ≥96% (Optimal)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 inline-block" /> 90-95% (Acceptable)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-300 inline-block" /> 85-89% (At-risk)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-400 inline-block" /> &lt;85% (Critical)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// === 5. SPIDER / RADAR CHART (FOR STUDENT SUBJECT MASTERY) ===
interface RadarChartProps {
  subjects: { name: string; score: number; classAvg?: number }[];
  size?: number;
}

export const RadarSubjectChart: React.FC<RadarChartProps> = ({ subjects, size = 260 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const count = subjects.length;

  const getCoordinates = (index: number, score: number) => {
    const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
    const r = (score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const studentPoints = subjects.map((s, i) => getCoordinates(i, s.score));
  const studentPolygon = studentPoints.map(p => `${p.x},${p.y}`).join(' ');

  const avgPoints = subjects.map((s, i) => getCoordinates(i, s.classAvg || 75));
  const avgPolygon = avgPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] h-auto">
        {/* Background Circles / Webs */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="#E5E7EB"
            strokeDasharray={scale === 1 ? '0' : '2 2'}
          />
        ))}

        {/* Spokes */}
        {subjects.map((_, i) => {
          const edge = getCoordinates(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={edge.x}
              y2={edge.y}
              stroke="#E5E7EB"
            />
          );
        })}

        {/* Class Average Polygon */}
        <polygon
          points={avgPolygon}
          fill="#94A3B8"
          fillOpacity="0.2"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Student Polygon */}
        <polygon
          points={studentPolygon}
          fill="#6366F1"
          fillOpacity="0.35"
          stroke="#4F46E5"
          strokeWidth="2.5"
        />

        {/* Student Vertices */}
        {studentPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2" />
        ))}

        {/* Labels */}
        {subjects.map((s, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const labelRadius = radius + 22;
          const lx = center + labelRadius * Math.cos(angle);
          const ly = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              textAnchor="middle"
              className="text-[10px] fill-gray-700 font-medium"
            >
              {s.name} ({s.score}%)
            </text>
          );
        })}
      </svg>

      <div className="flex items-center gap-4 text-xs mt-2 text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" /> Ahmed's Score
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" /> Class Average
        </span>
      </div>
    </div>
  );
};
