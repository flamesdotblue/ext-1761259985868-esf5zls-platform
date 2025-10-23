import { Folder, FileText } from 'lucide-react'

export default function IconItem({ id, name, type, x, y, selected, focused, onPointerDown, onFocus, onBlur, ...aria }) {
  const Icon = type === 'folder' ? Folder : FileText

  return (
    <button
      role="gridcell"
      aria-selected={selected}
      {...aria}
      tabIndex={focused ? 0 : -1}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerDown={(e) => onPointerDown(e, id)}
      className={[
        'group absolute flex flex-col items-center justify-start w-20 h-24 p-1',
        'text-slate-800 outline-none',
      ].join(' ')}
      style={{ left: x, top: y }}
    >
      <div className="w-full h-16 rounded-md bg-gradient-to-br from-slate-50 to-slate-200 border border-slate-400 shadow-[inset_1px_1px_0_#fff,0_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center">
        <div className="relative">
          <Icon className="h-7 w-7 text-[#2e5c79] drop-shadow-[1px_1px_0_#fff]" aria-hidden />
          <div className="absolute inset-0 rounded-sm pointer-events-none shadow-[inset_2px_2px_0_rgba(255,255,255,0.8),inset_-2px_-2px_0_rgba(0,0,0,0.15)]" />
        </div>
      </div>
      <div
        className={[
          'mt-1 w-full text-[11px] leading-tight text-center px-1 rounded-sm break-words',
          selected ? 'bg-[#3a7ca5]/20 text-[#1d3b4e] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_rgba(0,0,0,0.15)] border border-[#3a7ca5]/30' : 'text-slate-800/90'
        ].join(' ')}
      >
        {name}
      </div>
      {/* focus ring */}
      <span aria-hidden className={[
        'pointer-events-none absolute -inset-[2px] rounded-md',
        focused ? 'ring-2 ring-offset-0 ring-[#3a7ca5]' : 'ring-0'
      ].join(' ')} />
    </button>
  )
}
