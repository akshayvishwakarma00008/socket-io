import { useEffect, useState } from "react"
import styles from "./homepage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Buffer } from "buffer";

const HomePage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === null || name.length === 0 || name === "") {
            alert("Please enter your name")
        }
        else {

            const { data } = await axios.post("http://localhost:5000/api/auth/register", {
                username: name,
                isAvatarImage: avatar !== null ? true : false,
                avatarImage: avatar !== null ? avatar : ""
            })
            if (data.status === true) {
                navigate(`chat/${data?.newUser?._id}`)
            }
        }
    }

    const generateAvatar = async () => {
        const image = await axios.get(`https://api.multiavatar.com/${Math.random() * 10000}`)
        const buffer = new Buffer(image.data);
        setAvatar(buffer.toString("base64"))
    }
    useEffect(() => {
        generateAvatar()
    }, [])
    return (
        <header className={`bg-gray-900 w-full h-screen ${styles.pattern} object-cover`}>
            <div className="container px-6 mx-auto">
                <nav className="flex flex-col py-6 sm:flex-row sm:justify-between sm:items-center">
                    <a href="#">
                        <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="" />
                    </a>
                </nav>

                <div className="flex items-center justify-center py-6 h-4/5">
                    <div className="flex mt-8 lg:w-1/2 lg:justify-center lg:mt-0">
                        <div className="w-full max-w-md bg-white rounded-lg dark:bg-gray-800">
                            <div className="px-6 py-8 text-center">
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white fo">Enter Your Name To Chat</h2>

                                <form action="#">
                                    <div className="mt-4">
                                        <input className="block w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:ring-blue-300 focus:outline-none focus:ring" type="text" placeholder="Enter Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <button className="px-6 py-2 font-medium text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-800 dark:focus:bg-gray-700" onClick={(e) => handleSubmit(e)}>Enter </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HomePage