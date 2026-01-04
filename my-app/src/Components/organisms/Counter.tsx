type CounterProps={
  items:FridgeList[]
}
import type { FridgeList } from "../../helpers/helpers";
function Counter({items}:CounterProps) {
  return (
    <div className="max-w-4xl mx-auto flex justify-end text-xs text-slate-500 mb-2">
        Total items — {items.length.toString().padStart(2, "0")}
      </div>
  )
}

export default Counter