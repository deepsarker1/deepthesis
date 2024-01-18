import Image from "next/image";
const DemoRight = (props)=>{
    return (
        <div className={"flex flex-col items-center"}>
            {
                props.image &&
                <div className={"flex items-center justify-evenly w-full"}>
                    <Image src={URL.createObjectURL(props.image)} width={224} height={224} alt={"Input Image"}/>
                    {
                        props.prediction !== "" &&
                        <div className={"font-bold text-2xl"}>{props.prediction}</div>
                    }
                </div>
            }
            {
                props.images.map((obj, index)=>{
                    if (obj !== null){
                        return <Image key={index} src={obj} width={1000} height={100} alt={"Model Interpretations"}/>
                    }
                })
            }
        </div>
    )
}

export default DemoRight