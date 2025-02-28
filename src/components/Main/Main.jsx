import React,{useContext, useState} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context.jsx'




const Main = () => {

    const { onSent, recentPrompt, showResult, loading, result, setInput, input } = useContext(Context);

  return (
    <div className="main">
        <div className="nav">
            <p>Venky Assist</p>
            <img src={assets.user_icon} alt="user_icon"/>
        </div>
        <div className="main-container">
            {
                !showResult?<>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="compass_icon"/>
                </div>
                <div className="card">
                    <p>Breifly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="bulb_icon"/>
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="message_icon"/>
                </div>
                <div className="card">
                    <p>Improve the readability of the code</p>
                    <img src={assets.code_icon} alt="code_icon"/>
                </div>

                <div className="main-bottom">
            <div className="search-box" onSubmit={(e) => { e.preventDefault(); onSent(e.target.elements.prompt.value); }}>
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" name="prompt" placeholder='Enter a prompt here' onFocus={() => setInput('')}/>


                        <div>
                            <img src={assets.gallery_icon} alt=""/>
                            <img src={assets.mic_icon} alt=""/>
                            <img onClick={()=>onSent()} src={assets.send_icon} alt="sendicon"/>
                        </div>
                    </div>
                        <p className='bottom-info'> 
                        AI agent may display inaccurate info, including about people, so double-check its responses. Your privacy and Venky Assist
                        </p>
                </div>
            </div>
                </>
                :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon}alt=""/>
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="resultdata">
                        <img src={assets.gemini_icon}alt=""/>
                        {loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>:<p dangerouslySetInnerHTML={{__html:result}}></p>}
                        
                    </div>

                </div>
 
            }
        </div>
    </div>
  )
}

export default Main 