type DataFormInputProps = {
    title: string,
    type:string,
    setTitle: (title: string) => void
}
function DataFormInput({title, type, setTitle}: DataFormInputProps) {
  return (
    <input
              type={type}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
  )
}

export default DataFormInput