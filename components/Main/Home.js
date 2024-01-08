import HeaderComponent from "@/components/Main/Header";

const HomeComponent = ()=>{
    return (
        <div>
            <HeaderComponent/>
            <div>
                <div className={"bg-hero-content bg-contain h-136 flex flex-col items-center justify-around"}>
                    <div className={"flex flex-col items-center justify-center gap-8"}>
                        <div className={"text-white text-6xl"}><strong>Deep</strong> Vision</div>
                        <div className={"text-white font-light text-lg"}>A natural language processing platform for
                            building state-of-the-art models
                        </div>
                        <div className={"flex gap-8 mt-8"}>
                            <button className={"bg-blue text-white uppercase pl-10 pr-10 pt-4 pb-4"}>Live Demo</button>
                            <button className={"bg-blue text-white uppercase pl-10 pr-10 pt-4 pb-4"}>Get Started
                            </button>
                        </div>
                    </div>
                    <div className={"text-white font-extralight"}>AllenNLP is a free, open-source project from AI2, built on
                        PyTorch.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComponent