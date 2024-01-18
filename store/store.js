import {create} from "zustand"

const useStore = create(
    (set) => ({
        loading: false,
        uuid: "",
        predictionStatus: "",
        prediction: "",
        images: [],
        setLoading: (newLoading) => set((state) => ({loading: newLoading})),
        setUuid: (newUuid)=> set((state) => ({uuid:newUuid})),
        setPredictionStatus: (newPredictionStatus)=> set((state) => ({predictionStatus:newPredictionStatus})),
        setPrediction: (newPrediction)=> set((state) => ({prediction:newPrediction})),
        setImages: (newImageList)=> set((state) => ({images:newImageList})),
        clearAllFields: ()=> set((state) => ({
                uuid: "",
                predictionStatus: "",
                prediction: "",
                images: []
        }))
    })
)

export default useStore