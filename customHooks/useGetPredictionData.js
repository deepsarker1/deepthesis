import useStore from "@/store/store";
import axios from "axios";
import {useState} from "react";
const useGetPredictionData = ()=>{
    const [setLoading, setPredictionStatus, setPrediction, setImages] = useStore((state) => [state.setLoading, state.setPredictionStatus, state.setPrediction, state.setImages])
    const predictionDataLoop = (uuid) => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/ai/prediction-status/${uuid}`)
            .then(res => {
                if (res.data.status){
                    setPredictionStatus(res.data["pred_status"])
                    setPrediction(res.data.prediction)
                    setImages(res.data.images)
                    if (res.data["pred_status"] !== "COMPLETED"){
                        setTimeout(()=>{
                            predictionDataLoop(uuid)
                        }, 5000)
                    }
                    else{
                        setLoading(false)
                    }
                }
            })
            .catch(err => {
                console.log("Error On useGetPredictionData Hook")
            })
    }
    return {
        predictionDataLoop
    }
}

export default useGetPredictionData