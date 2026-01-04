type ItemListProps={
  items:FridgeList[],
  loading:boolean,
  handleEdit:(item:FridgeList)=>void,
  setDeleteId:(id:string | null)=>void,
  setShowDeleteAlert:(show:boolean)=>void
}

import type { FridgeList } from "../../helpers/helpers";
import DataRecord from "../molecules/DataRecord";

function ItemList({items, loading, handleEdit, setDeleteId, setShowDeleteAlert}:ItemListProps) {
  return (
    <ul className="max-w-4xl mx-auto space-y-3">
        {loading && (
          <li className="text-center text-sm text-slate-500 py-6">
            Loading items...
          </li>
        )}

        {!loading && items.length === 0 && (
          <li className="text-center text-sm text-slate-400 py-6">
            No items in the fridge
          </li>
        )}

        {!loading &&
          items.map((item) => (
            <DataRecord 
              item={item}
              handleEdit={handleEdit}
              setDeleteId={setDeleteId}
              setShowDeleteAlert={setShowDeleteAlert}
            />
          ))}
      </ul>
  )
}

export default ItemList