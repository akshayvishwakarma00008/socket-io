import { Divider } from "antd";
const Contacts = ({contacts,SetSelectedContact}) => {
    return (
        <div className="relative flex flex-col gap-4 py-5 mt-10 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            {contacts.map((data, index) => (<div key={index}><div className="flex items-center gap-2 px-5 cursor-pointer" onClick={()=>SetSelectedContact(data)}>
                <div className="w-12 h-12 rounded-full bg-slate-300" ></div>
                <div className="flex items-center justify-center">
                    <h1 className="text-lg font-semibold text-neutral-600">{data?.name}</h1>
                </div>
            </div>
                <div className="px-5">
                    <Divider style={{marginTop:"10px",marginBottom:"10px"}}/>
                </div>
            </div>))}
        </div>
    )
}

export default Contacts