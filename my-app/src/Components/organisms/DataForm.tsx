
import DataFormField from "../molecules/DataFormField"
import Button from "../atoms/Button"

type DataFormProps={
  handleSubmit: (e:React.FormEvent<HTMLFormElement>)=>void,
  title:string,
  setTitle:(title:string)=>void,
  expiry:string,
  setExpiry:(expiry:string)=>void,
  mode:"Create" | "Edit",
  resetToCreateMode:()=>void
}

function DataForm({handleSubmit, title, setTitle, expiry, setExpiry,mode,resetToCreateMode}:DataFormProps) {
  
  return (
       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
        <DataFormField topic="🍉 Item Name" type="text"Data={title} setData={setTitle} />  
        <DataFormField topic="⏰ Expiry Date" type="date" Data={expiry} setData={setExpiry} />
        
        <div className="flex gap-3">
          <Button type="submit" className="h-10 rounded-md bg-blue-700 px-4 text-white text-sm font-semibold hover:bg-blue-800"
          children={mode === "Create" ? "ADD TO FRIDGE" : "UPDATE ITEM"}></Button>
          
          {mode === "Edit" && (
          <Button type="button" className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100"
          children="Cancel" onClick={resetToCreateMode}></Button>
          )}
        </div>
        
        </form>

        <p className="mt-3 text-xs text-slate-400">
          ⚠️ We don’t want more than one piece of the same food in our fridge.
        </p>
      </div>
  )
}

export default DataForm