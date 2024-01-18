"use client"
import DemoLeft from "@/components/Demo/DemoLeft";
import DemoRight from "@/components/Demo/DemoRight";
import {useState} from "react";
import useStore from "@/store/store";
const DemoMain = ()=>{
    const [file, setFile] = useState(null)
    const prediction = useStore((state) => state.prediction)
    const images = useStore((state) => state.images)
    const handleSetFile = (file) => {
        setFile(file)
    }

    return (
        <div className={"min-h-136 grid grid-cols-3"}>
            <div className={"grid-start-1 bg-sky border-r-blue border-r-2"}>
                <DemoLeft handleSetFile={handleSetFile} file={file}/>
            </div>
            <div className={"grid-start-2 col-span-2 overflow-y-scroll max-h-136"}>
                <DemoRight image={file} prediction={prediction} images={images}/>
            </div>
        </div>
    )
}

export default DemoMain