import { useEffect, useMemo, useRef, useState } from 'react'
import IconItem from './IconItem'

const initialItems = [
  { id: '1', type: 'folder', name: 'Projects', x: 32, y: 32 },
  { id: '2', type: 'folder', name: 'Photos', x: 32, y: 128 },
  { id: '3', type: 'file', name: 'Notes.txt', x: 32, y: 224 },
  { id: '4', type: 'file', name: 'Readme.md', x: 32, y: 320 },
]

export default function Desktop() {
  const containerRef = useRef(null)
  const [items, setItems] = useState(initialItems)
  const [selectedId, setSelectedId] = useState(null)
  const [focusedId, setFocusedId] = useState(null)
  const [dragging, setDragging] = useState(null) // {id, offsetX, offsetY}
  const [isDragging, setIsDragging] = useState(false)

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => (a.y - b.y) || (a.x - b.x))
  }, [items])

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!dragging) return
      setIsDragging(true)
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const newX = Math.max(8, Math.min(rect.width - 80, e.clientX - rect.left - dragging.offsetX))
      const newY = Math.max(8, Math.min(rect.height - 96, e.clientY - rect.top - dragging.offsetY))
      setItems((prev) => prev.map((it) => it.id === dragging.id ? { ...it, x: newX, y: newY } : it))
    }
    const onPointerUp = () => {
      if (dragging) {
        setDragging(null)
        // slight delay to differentiate click from drag end
        setTimeout(() => setIsDragging(false), 50)
      }
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [dragging])

  const handlePointerDown = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDragging({ id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top })
    setSelectedId(id)
    setFocusedId(id)
  }

  const handleKeyDown = (e) => {
    if (!focusedId) return
    const idx = sorted.findIndex((i) => i.id === focusedId)
    if (idx < 0) return

    const step = 96
    const modItem = (deltaX, deltaY) => {
      setItems((prev) => prev.map((it) => it.id === focusedId ? {
        ...it,
        x: Math.max(8, it.x + deltaX),
        y: Math.max(8, it.y + deltaY)
      } : it))
    }

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        modItem(step, 0)
        break
      case 'ArrowLeft':
        e.preventDefault()
        modItem(-step, 0)
        break
      case 'ArrowDown':
        e.preventDefault()
        modItem(0, step)
        break
      case 'ArrowUp':
        e.preventDefault()
        modItem(0, -step)
        break
      case 'Enter':
      case ' ': {
        e.preventDefault()
        setSelectedId((s) => s === focusedId ? null : focusedId)
        break
      }
      case 'Tab': {
        // roving tabindex among icons
        e.preventDefault()
        const dir = e.shiftKey ? -1 : 1
        const next = (idx + dir + sorted.length) % sorted.length
        setFocusedId(sorted[next].id)
        break
      }
      default:
        break
    }
  }

  return (
    <div
      ref={containerRef}
      role="grid"
      aria-label="Desktop"
      aria-multiselectable="false"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full h-full outline-none bg-[repeating-linear-gradient(45deg,_rgba(255,255,255,0.35)_0px,_rgba(255,255,255,0.35)_2px,_rgba(0,0,0,0.02)_2px,_rgba(0,0,0,0.02)_4px)]"
    >
      {/* subtle vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.25)]" />

      {items.map((item) => (
        <IconItem
          key={item.id}
          id={item.id}
          name={item.name}
          type={item.type}
          x={item.x}
          y={item.y}
          selected={selectedId === item.id}
          focused={focusedId === item.id}
          onPointerDown={handlePointerDown}
          onFocus={() => setFocusedId(item.id)}
          onBlur={() => setFocusedId((f) => (f === item.id ? null : f))}
          aria-posinset={sorted.findIndex((i) => i.id === item.id) + 1}
          aria-setsize={items.length}
        />
      ))}

      {isDragging && (
        <div aria-hidden className="absolute pointer-events-none border-2 border-dashed border-blue-400/60 rounded-md" style={{ left: items.find(i=>i.id===dragging?.id)?.x, top: items.find(i=>i.id===dragging?.id)?.y, width: 80, height: 96 }} />
      )}
    </div>
  )
}
