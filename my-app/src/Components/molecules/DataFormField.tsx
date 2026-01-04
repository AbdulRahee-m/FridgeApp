import DataFormInput from "../atoms/DataFormInput"
import DataFormLabel from "../atoms/DataFormLabel"

type DataFormFieldProps = {
  topic: string,
  Data:any,
  setData: (Data: any) => void
}
function DataFormField({topic, Data, setData}:DataFormFieldProps) {
  return (
    <div>
          <DataFormLabel topic={topic} /> 
          <DataFormInput title={Data} setTitle={setData} />
    </div>
  )
}

export default DataFormField