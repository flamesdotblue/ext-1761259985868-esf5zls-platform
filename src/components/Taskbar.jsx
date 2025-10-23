import { useEffect, useRef } from 'react'
import { Menu, Wifi, BatteryFull } from 'lucide-react'

export default function Taskbar({ clock, onStartClick, isStartOpen }) {
  const startRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (!isStartOpen) return
      if (startRef.current && !startRef.current.contains(e.target)) {
        // allow StartMenu to close itself via App
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [isStartOpen])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-9 bg-gradient-to-b from-[#c8c1b6] to-[#a9a296] border-t border-slate-600/40 shadow-[0_-2px_8px_rgba(0,0,0,0.3)] flex items-center px-2 gap-2">
      <button
        ref={startRef}
        onClick={onStartClick}
        aria-pressed={isStartOpen}
        aria-label="Open Start Menu"
        className={[
          'flex items-center gap-2 h-7 px-3 rounded-sm border border-slate-500/60',
          'bg-gradient-to-b from-[#dcd6cc] to-[#b7b0a6] shadow-[inset_1px_1px_0_#fff,0_2px_0_rgba(255,255,255,0.3)]',
          'active:translate-y-[1px] active:shadow-[inset_1px_1px_0_#fff] focus:outline-none focus:ring-2 focus:ring-[#3a7ca5]'
        ].join(' ')}
      >
        <Menu className="h-4 w-4 text-slate-800" aria-hidden />
        <span className="text-xs tracking-wide">Start</span>
      </button>

      <div className="ml-auto flex items-center gap-3 text-slate-800">
        <Wifi className="h-4 w-4" aria-label="Network Status: Connected" />
        <BatteryFull className="h-4 w-4" aria-label="Battery: Full" />
        <div aria-live="polite" className="min-w-[60px] text-xs text-right tabular-nums">{clock}</div>
      </div>
    </div>
  )
}
