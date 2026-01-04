type DataFormLabelProps = {
    topic: string
}

function DataFormLabel({topic}:DataFormLabelProps) {
  return (
    <label className="block text-xs font-medium text-slate-600 mb-1">
              {topic}
    </label>
  )
}

export default DataFormLabel