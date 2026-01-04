import type { FridgeList } from "../../helpers/helpers";
import { formatDateDMY } from "../../helpers/helpers";
import Button from "../atoms/Button";
import StatusFlag from "../atoms/StatusFlag";
function DataRecord({ item, handleEdit, setDeleteId, setShowDeleteAlert }: { item: FridgeList, handleEdit: (item: FridgeList) => void, setDeleteId: (id: string | null) => void, setShowDeleteAlert: (show: boolean) => void }) {
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
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Expired"
                      ? "bg-red-100 text-red-700"
                      : item.status === "Expiring Soon"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                  content={item.status}
                />

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(item._id);
                    setShowDeleteAlert(true);
                  }}
                  className="text-slate-400 hover:text-red-600"
                  children="🗑"
                />
              </div>
            </li>
  )
}

export default DataRecord