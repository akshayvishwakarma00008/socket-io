import { Divider } from "antd";
const Contacts = ({ contacts, SetSelectedContact }) => {
    return (
        <div className="relative flex flex-col gap-4 mt-10 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-h-[80vh] overflow-y-scroll">
            <div className="sticky top-0 z-10 flex items-center justify-center w-full h-16 p-8 font-bold bg-slate-50">Users To Chat</div>
            <div className="">
                {contacts.map((data, index) => (<div key={index}><div className="flex items-center gap-2 px-5 cursor-pointer" onClick={() => SetSelectedContact(data)}>
                    <div className="w-12 h-12 rounded-full bg-slate-300" >
                        <img src={`data:image/svg+xml;base64,${data?.avatarImage}`} alt="avatar" className="object-cover w-12 h-12 rounded-full" />
                    </div>
                    <div className="flex items-center justify-center">
                        <h1 className="text-lg font-semibold text-neutral-600">{data?.username}</h1>
                    </div>
                </div>
                    <div className="px-5">
                        <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Contacts