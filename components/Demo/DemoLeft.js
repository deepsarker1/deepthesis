"use client"
import {useEffect, useState} from "react";
import useStartPrediction from "@/customHooks/useStartPrediction";
import useGetPredictionData from "@/customHooks/useGetPredictionData";
import useStore from "@/store/store";
const DemoLeft = (props)=>{
    const [highLightDropZone, setHighlightDropZone] = useState(false)
    const {startPrediction, startPredictionResponse, setStartPredictionResponse} = useStartPrediction()
    const {predictionDataLoop} = useGetPredictionData()
    const uuid = useStore((state) => state.uuid)
    const predictionStatus = useStore((state) => state.predictionStatus)
    const loading = useStore((state) => state.loading)
    const clearAllFields = useStore((state)=>state.clearAllFields)

    const preventDefaultHandler = (e)=>{
        e.preventDefault()
        e.stopPropagation()
    }
    const handleFileUpload = (event, type)=>{
        let tempFile
        if (type === "click"){
            if (!event.target.files || event.target.files.length === 0) {
                return; // User canceled file selection
            }
            tempFile = event.target.files[0]
        }
        else if(type === "drag"){
            if (!event.dataTransfer.files || event.dataTransfer.files.length === 0) {
                return; // User canceled file selection
            }
            const files = Array.from(event.dataTransfer.files);
            tempFile = files[0]
        }
        props.handleSetFile(tempFile)
        clearAllFields()
    }

    const predictButtonHandler = ()=>{
        if (props.file !== null){
            startPrediction(props.file)
        }
    }

    useEffect(() => {
        if (startPredictionResponse){
            setStartPredictionResponse(false)
            predictionDataLoop(uuid)
        }
    }, [startPredictionResponse]);


    return (
        <>
            <div className={"text-center mt-4 ml-2 mr-2 flex flex-col justify-center items-center gap-6"}>
                <div className="flex items-center justify-center w-full"
                     onDragOver={(e) => {
                         preventDefaultHandler(e);
                         setHighlightDropZone(true);
                     }}
                     onDragEnter={(e) => {
                         preventDefaultHandler(e);
                         setHighlightDropZone(true);
                     }}
                     onDragLeave={(e) => {
                         preventDefaultHandler(e);
                         setHighlightDropZone(false);
                     }}
                     onDrop={(e) => {
                         preventDefaultHandler(e);
                         handleFileUpload(e, "drag")
                         setHighlightDropZone(false);
                     }}>
                    <label htmlFor="dropzone-file"
                           className={`flex flex-col items-center justify-center w-full h-64 border-2 ${highLightDropZone ? "border-blue": "border-gray-300"} border-dashed rounded-lg cursor-pointer bg-gray-50`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (224x224px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>{
                            handleFileUpload(e, "click")
                        }}/>
                    </label>
                </div>
                {
                    props.file && <div className={"flex flex-col gap-4 w-full"}>
                        <p className={"font-bold"}>File Name:&nbsp;
                            <span className={"font-normal"}>{props.file.name}</span>
                        </p>
                        <p className={"font-bold"}>File Size:&nbsp;
                            <span className={"font-normal"}>{(props.file.size / (1024 * 1024)).toFixed(2)} MB</span>
                        </p>
                        <button className={`w-full border-blue border-2 ${!loading && "hover:bg-blue hover:text-white"} rounded-md pt-2 pb-2`}
                            onClick={predictButtonHandler} disabled={loading}>Predict Image</button>
                        {
                            predictionStatus !== "" &&
                            <button disabled type="button"
                                    className={`w-full text-white bg-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 flex"`}>
                                {
                                    predictionStatus !== "COMPLETED" &&
                                    <svg aria-hidden="true" role="status"
                                         className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101"
                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"/>
                                    </svg>
                                }
                                {predictionStatus.split("_").join(" ")}
                            </button>
                        }
                    </div>
                }

            </div>
        </>
    )
}

export default DemoLeft