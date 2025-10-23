import { Wifi, Settings, Monitor } from 'lucide-react'

export default function ShellWindow({ title, subtitle, children }) {
  return (
    <div className="relative flex flex-col min-h-[calc(100vh-36px)] pb-9">{/* leave space for taskbar */}
      <div
        role="region"
        aria-label="Main System Window"
        className="mx-auto mt-4 w-[95vw] md:w-[90vw] lg:w-[80vw] h-[calc(100vh-72px)] rounded-lg border border-slate-400/70 bg-[radial-gradient(circle_at_20%_20%,_#f3f0ea_0%,_#d9d2c7_60%,_#c2bbaf_100%)] shadow-[inset_2px_2px_0_#ffffff,inset_-2px_-2px_0_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="flex items-center justify-between h-10 px-3 bg-gradient-to-b from-slate-200 to-slate-300 border-b border-slate-500/40 shadow-[inset_0_1px_0_#fff]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#3a7ca5] shadow-[inset_-1px_-1px_0_rgba(0,0,0,.3),inset_1px_1px_0_rgba(255,255,255,.6)]" aria-hidden />
            <div className="h-3 w-3 rounded-full bg-[#b08968] shadow-[inset_-1px_-1px_0_rgba(0,0,0,.3),inset_1px_1px_0_rgba(255,255,255,.6)]" aria-hidden />
            <div className="h-3 w-3 rounded-full bg-[#6c757d] shadow-[inset_-1px_-1px_0_rgba(0,0,0,.3),inset_1px_1px_0_rgba(255,255,255,.6)]" aria-hidden />
            <div className="ml-3">
              <div className="text-xs uppercase tracking-widest text-slate-800/90">{title}</div>
              <div className="text-[10px] text-slate-700/80">{subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <Monitor className="h-4 w-4" aria-hidden />
            <Wifi className="h-4 w-4" aria-hidden />
            <Settings className="h-4 w-4" aria-hidden />
          </div>
        </div>
        <div className="relative h-[calc(100%-40px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
