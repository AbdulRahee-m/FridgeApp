type TemplateProps={
    Header:React.ReactNode;
    DataForm:React.ReactNode;
    Counter:React.ReactNode;
    ItemList:React.ReactNode;
    DeleteAlert:React.ReactNode;
}
export default function FridgeTemplate({Header,DataForm,Counter,ItemList,DeleteAlert}:TemplateProps){
    return(
        <>
        <div className="min-h-screen bg-slate-50 px-6 py-10">
            {Header}
            {DataForm}
            {Counter}
            {ItemList}
            {DeleteAlert}
        </div>
        </>
    )
}