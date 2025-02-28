import { createContext, useState } from "react";
import run from "../config/gemini"; 

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput]=useState('');
    const [recentPrompt,setRecentPrompt]=useState("");
    const [previousprompt,setPreviousPrompt]=useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result,setResult]=useState('')

    const delayPara = (index,nextword) =>
        {
            setTimeout(function (){
                setResult(prev=>prev+nextword);
            },75*index)
        }

    const newChat = () =>{
        setLoading(false)
        setshowResult(false)
    }
    const onSent = async (prompt) => {
        setResult("")
        setLoading(true)
        setshowResult(true)
        let response;
        if(prompt!==undefined)
        {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else
        {
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input);
        }
       
        let responseArray = response.split("**");
        let newResponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i===0 ||i%2!==1){
                newResponse +=responseArray[i];

            }
            else{
                newResponse +="<b>"+ responseArray[i]+"</b>";
            }
        }
        let newResponse2=newResponse.split("*").join("</br")
        let newResponseArray=newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextword= newResponseArray[i];
            delayPara(i,nextword+" ");
        }
        setLoading(false)
        // setInput('') // Commenting out to retain input after displaying result


    }

    const ContextValue = {
        previousprompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        input,
        setInput,
        newChat
    }

   
    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;