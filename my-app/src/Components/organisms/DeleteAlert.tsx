
import Button from "../atoms/Button"

type DeleteAlertProps = {
  showDeleteAlert:boolean,
  setShowDeleteAlert:(show:boolean)=>void,
  deleteId:string | null,
  setDeleteId:(id:string | null)=>void,
  handleDelete:(id:string)=>Promise<void>
}
function DeleteAlert({showDeleteAlert, setShowDeleteAlert, deleteId, setDeleteId, handleDelete}:DeleteAlertProps) {
  return (
    <>
    {showDeleteAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">
              Delete item?
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to remove this item from your fridge?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button"
              onClick={() => {
                  setShowDeleteAlert(false);
                  setDeleteId(null);
                }}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              children="Cancel" />

              <Button type="button"
                onClick={async () => {
                  if (deleteId) await handleDelete(deleteId);
                  setShowDeleteAlert(false);
                  setDeleteId(null);
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                children="Delete"
              />  
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteAlert