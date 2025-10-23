import { useEffect, useRef } from 'react'
import { Folder, FileText, Settings, Power, Monitor } from 'lucide-react'

const shortcuts = [
  { id: 's1', label: 'File Explorer', icon: Folder },
  { id: 's2', label: 'Text Editor', icon: FileText },
  { id: 's3', label: 'Control Panel', icon: Settings },
  { id: 's4', label: 'System', icon: Monitor },
]

export default function StartMenu({ open, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (!open) return
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.()
      }
    }
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div role="dialog" aria-label="Start Menu" aria-modal="false" className="fixed bottom-9 left-2 z-50">
      <div
        ref={panelRef}
        className="w-64 rounded-md border border-slate-500/60 bg-[radial-gradient(circle_at_30%_20%,_#f0ece6_0%,_#d3ccc1_60%,_#bdb6aa_100%)] shadow-[inset_2px_2px_0_#fff,0_10px_24px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div className="px-3 py-2 text-[11px] uppercase tracking-widest bg-gradient-to-b from-slate-200 to-slate-300 border-b border-slate-500/40">Programs</div>
        <ul role="menu" className="max-h-72 overflow-auto py-1">
          {shortcuts.map((s, idx) => {
            const Icon = s.icon
            return (
              <li key={s.id} role="none">
                <button
                  role="menuitem"
                  tabIndex={idx === 0 ? 0 : -1}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#3a7ca5]/15 active:bg-[#3a7ca5]/25 focus:outline-none focus:ring-2 focus:ring-[#3a7ca5]"
                >
                  <Icon className="h-4 w-4 text-[#2e5c79]" aria-hidden />
                  <span>{s.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-500/40 bg-gradient-to-b from-slate-200 to-slate-300">
          <div className="text-[10px] text-slate-700">RetroDesk 98</div>
          <button onClick={onClose} className="flex items-center gap-1 text-xs px-2 py-1 rounded-sm border border-slate-500/60 bg-gradient-to-b from-[#dcd6cc] to-[#b7b0a6] hover:brightness-105 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#3a7ca5]">
            <Power className="h-3.5 w-3.5" />
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
