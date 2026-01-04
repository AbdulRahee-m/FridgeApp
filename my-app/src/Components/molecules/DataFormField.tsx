import DataFormInput from "../atoms/DataFormInput"
import DataFormLabel from "../atoms/DataFormLabel"

type DataFormFieldProps = {
  topic: string,
  type: string,
  Data:any,
  setData: (Data: any) => void
}
function DataFormField({topic, type, Data, setData}:DataFormFieldProps) {
  return (
    <div>
          <DataFormLabel topic={topic} /> 
          <DataFormInput title={Data} setTitle={setData} type={type} />
    </div>
  )
}

export default DataFormField