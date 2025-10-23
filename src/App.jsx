import { useEffect, useMemo, useState } from 'react'
import ShellWindow from './components/ShellWindow'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'

export default function App() {
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const clock = useMemo(() => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }, [time])

  // Close Start Menu on global escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsStartOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(135deg,_#d9d2c7_0%,_#b7b0a6_100%)] text-slate-900 font-mono select-none">
      <ShellWindow title="RetroDesk 98" subtitle="Build 1.0">
        <Desktop />
      </ShellWindow>

      <Taskbar
        clock={clock}
        onStartClick={() => setIsStartOpen((s) => !s)}
        isStartOpen={isStartOpen}
      />

      <StartMenu open={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </div>
  )
}
