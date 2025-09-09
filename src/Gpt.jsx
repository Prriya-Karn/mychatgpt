import { Fragment, useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { ArrowUp, Loader, Plus, Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Gpt = () => {
    const [input, setInput] = useState("");
    const [finalInput, setFinal] = useState("");
    const [res, setRes] = useState("Hey, priya. Ready to dive in?");
    const [loading, setLoading] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const api = import.meta.env.VITE_API_KEY;

    const handletextinput = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        setFinal(input);
        setInput("");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(finalInput);
        toast.success("Copied to clipboard!");
    };

    const data = async (prompt) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${api}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: prompt },
                                ],
                            },
                        ],
                    }),
                }
            );

            const result = await res.json();
            setRes(result.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error("Error fetching Gemini API:", error);
            setRes("Oops! Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (finalInput) {
            data(finalInput);
        }
    }, [finalInput]);

    return (
        <Fragment>
            {/* Toast Container */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="mt-20">
                <div className="flex flex-col gap-4">
                    {/* Final Input on Right */}
                    {finalInput && (
                        <div
                            className="flex tracking-wide justify-end items-center space-x-2"
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <p className="md:text-lg leading-5 bg-[#FAFAFA] px-3 py-1 rounded-3xl cursor-pointer">
                                {finalInput}
                            </p>

                            {isHover && (
                                <Copy
                                    className="w-3 h-3 cursor-pointer text-gray-500"
                                    onClick={handleCopy}
                                    title="Copy"
                                />
                            )}
                        </div>
                    )}

                    {/* Response on Left */}
                    <div className="flex tracking-wide sm:ml-10 sm:mr-10 md:ml-20 md:mr-20 justify-start min-h-[80px]">
                        {loading ? (
                            <div className="flex justify-center items-center w-full">
                                <Loader className="animate-spin w-8 h-8 text-gray-500" />
                            </div>
                        ) : (
                            <h1
                                className={`${res === "Hey, priya. Ready to dive in?"
                                    ? "text-2xl leading-relaxed font-medium"
                                        : "md:text-lg leading-5"
                                    } p-4`}
                            >
                                {res}
                            </h1>
                        )}
                    </div>

                    {/* Input Box */}
                    <div className="input-wrapper sm:ml-10 sm:mr-10 md:ml-20 md:mr-20 relative">
                        <Plus className="absolute w-4 h-4 rounded-full cursor-pointer p-1 ml-1 hover:bg-[#FAFAFA] left-2 top-1/2 transform -translate-y-1/2" />
                        <Input
                            value={input}
                            placeholder="Ask anything"
                            onChange={handletextinput}
                            className="pr-10 pl-12 py-8 rounded-3xl"
                            disabled={loading}
                        />
                        <ArrowUp
                            className={`absolute w-4 h-4 rounded-full p-1 mr-1 text-white right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black"
                                }`}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Gpt;
