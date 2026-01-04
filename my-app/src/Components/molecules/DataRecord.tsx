
import type { FridgeList } from "../../helpers/helpers";
import { formatDateDMY } from "../../helpers/helpers";
import Button from "../atoms/Button";
import StatusFlag from "../atoms/StatusFlag";
function DataRecord({ item, handleEdit, setDeleteId, setShowDeleteAlert }: { item: FridgeList, handleEdit: (item: FridgeList) => void, setDeleteId: (id: string | null) => void, setShowDeleteAlert: (show: boolean) => void }) {
 
  function handleDeleteClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();
    setDeleteId(item._id);
    setShowDeleteAlert(true);
  }

  function getStatusClass() {
    if (item.status === "Expired") return "bg-red-100 text-red-700";
    if (item.status === "Expiring Soon") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  }
  return (
         <li
              key={item._id}
              onClick={() => handleEdit(item)}
              className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">
                  Expiry date — {formatDateDMY(item.expiry)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <StatusFlag
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass()}`
                    }
                  content={item.status}
                />

                <Button
                  onClick={handleDeleteClick}
                  className="text-slate-400 hover:text-red-600"
                  children="🗑"
                />
              </div>
            </li>
  )
}

export default DataRecord