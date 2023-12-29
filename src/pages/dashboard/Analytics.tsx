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
    </div>
  )
}

export default Analytics