import axios from "axios";
import useStore from "@/store/store";
import {useState} from "react";
const useStartPrediction = ()=>{
    const [startPredictionResponse, setStartPredictionResponse] = useState(false)
    const [setLoading, setUuid] = useStore((state) => [state.setLoading, state.setUuid])
    const startPrediction = (file)=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("file", file, file.name);

        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/ai/predict`, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then(res => {
            if (res.data.status){
                setUuid(res.data.uuid)
                setStartPredictionResponse(true)
            }
        }).catch(err=>{
            console.log("Error On useStartPrediction Hook")
        })
    }
    return {
        startPrediction,
        startPredictionResponse,
        setStartPredictionResponse
    }

}

export default useStartPrediction