import { useContext, useEffect } from "react"
import SidebarContext from "@/SidebarContext"

const Analytics = () => {
  const{ setActiveItem } = useContext(SidebarContext)

  useEffect(()=>{
    setActiveItem("/analytics")
  },[])

  return (
    <div className='relative left-[285px]'>
       <h1 className="ml-5 mt-5 font-semibold text-gray-800 text-3xl">ANALYTICS</h1>
       <hr className="m-2" /> 
       <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Performance</h2>
                    <p className="text-3xl font-bold mt-2">92%</p>
                </div>
                <div className="bg-white p-3 rounded-full">
                    <svg className="text-blue-700 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-sm">Overall system performance</span>
            </div>
        </div>
    </div>
  )
}

export default Analytics