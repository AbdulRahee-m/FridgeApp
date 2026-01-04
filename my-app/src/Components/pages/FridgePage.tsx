import DataForm from "../organisms/DataForm"
import Header from "../organisms/Header"
import Counter from "../organisms/Counter"
import ItemList from "../organisms/ItemList"
import DeleteAlert from "../organisms/DeleteAlert"
import FridgeTemplate from "../templates/FridgeTemplate"
import { useFridge } from "../../hooks/useFridge"
  
function FridgePage() {
  const {
    items,
    mode,
    title,
    expiry,
    loading,
    showDeleteAlert,
    deleteId,
    setTitle,
    setExpiry,
    setShowDeleteAlert,
    setDeleteId,
    handleDelete,
    handleSubmit,
    handleEdit,
    resetToCreateMode} = useFridge();
  return (
    <FridgeTemplate Header={<Header/>} 
                    DataForm={<DataForm handleSubmit={handleSubmit} title={title} setTitle={setTitle} expiry={expiry} setExpiry={setExpiry} mode={mode} resetToCreateMode={resetToCreateMode}/>} 
                    Counter={<Counter items={items}/>} 
                    ItemList={<ItemList items={items} loading={loading} handleEdit={handleEdit} setDeleteId={setDeleteId} setShowDeleteAlert={setShowDeleteAlert}/>} 
                    DeleteAlert={<DeleteAlert showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteId={deleteId} setDeleteId={setDeleteId} handleDelete={handleDelete}/>} />
  )
}

export default FridgePage