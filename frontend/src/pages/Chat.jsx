import { useState, useEffect } from "react";
import axios from "axios";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import img2 from "../assets/logo2.jpeg";
import handleOpenCommands from  "../components/Commands"
import DropdownMenu from "../components/DropdownMenu";
import { ToastContainer } from "react-toastify";

const Chat = () => {
  const [isSpeaking, setSpeaking] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [voicePrompt, setVoicePrompt] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecognitionRunning, setIsRecognitionRunning] = useState(false);
  const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);
  const [initialMessageRead, setInitialMessageRead] = useState(false);
  const [isReading, setIsReading] = useState(false);

  




  useEffect(() => {
    if (!recognition && window.webkitSpeechRecognition) {
      try {
        const newRecognition = new window.webkitSpeechRecognition();
        newRecognition.continuous = true;
        newRecognition.interimResults = true;
        newRecognition.lang = "en-US";

        newRecognition.onresult = (event) => {
          const transcript =
            event.results[event.results.length - 1][0].transcript;
          setVoicePrompt(transcript);
        };

        newRecognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          setIsRecognitionRunning(false);
          setSpeaking(false);
        };

        newRecognition.onend = () => {
          setIsRecognitionRunning(false);
          setSpeaking(false);
        };

        setRecognition(newRecognition);
      } catch (error) {
        console.error("Speech recognition setup failed:", error);
      }
    }

    if (!initialMessageRead) {
      const getHours = new Date().getHours();
      let greeting = "";

      if (getHours < 12) {
        greeting = "Good morning";
      } else if (getHours < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }
      const initialMessage = `Hello ${greeting} How can I help you`;
      readResponse(initialMessage);
      setInitialMessageRead(true);
    }

    // Trigger voice fetching
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, [recognition, initialMessageRead]);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    processCommand(prompt);
  };

  const processCommand = async (message) => {
    message = message.toLowerCase();

    if (message.includes("open")) {
      handleOpenCommands(message, readResponse, openApp);
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post("https://virtual-assit-api.vercel.app/ask", {
          message: message,
        });
        setPrompt("");
        setIsLoading(false);
        console.log(response.data.message)
        readResponse(response.data.message);
        
      } catch (error) {
        console.error("Error sending message to server:", error);
        setIsLoading(false);
      }
    }
  };

 

  const handleStop = async () => {
    if (!voicePrompt.trim()) {
      setSpeaking(false);
      if (recognition) {
        recognition.stop();
        setIsRecognitionRunning(false);
      }
      return;
    }
    setSpeaking(false);
    if (recognition) {
      recognition.stop();
    }
    processCommand(voicePrompt);
    setVoicePrompt(""); // Clear the voice prompt after processing
  };

  const readResponse = (text) => {
    if ("speechSynthesis" in window) {
      try {
        const utterances = [];
        const maxChunkLength = 50; // Shorter chunks to reduce the chance of stopping
  
        // Split the text into smaller chunks
        for (let i = 0; i < text.length; i += maxChunkLength) {
          const chunk = text.slice(i, i + maxChunkLength);
          const utterance = new SpeechSynthesisUtterance(chunk);
  
          // Find a female voice
          const voices = window.speechSynthesis.getVoices();
          const femaleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("woman")
          );
  
          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }
  
          utterances.push(utterance);
        }
  
        // Read the chunks sequentially with a small delay between them
        let currentUtteranceIndex = 0;
  
        const speakNextChunk = () => {
          if (currentUtteranceIndex < utterances.length) {
            const currentUtterance = utterances[currentUtteranceIndex];
  
            currentUtterance.onstart = () => {
              setSpeaking(true);
              setIsReading(true);
            };
  
            currentUtterance.onend = () => {
              currentUtteranceIndex++;
              setTimeout(speakNextChunk, 100); // Add a short delay before the next chunk
            };
  
            currentUtterance.onerror = (error) => {
              console.error("Speech synthesis error:", error);
              setSpeaking(false);
              setIsReading(false);
            };
  
            window.speechSynthesis.speak(currentUtterance);
          } else {
            setSpeaking(false);
            setIsReading(false);
          }
        };
  
        // Start speaking the first chunk
        speakNextChunk();
  
      } catch (error) {
        console.error("Speech synthesis failed:", error);
      }
    } else {
      console.log("Speech synthesis is not supported in this browser.");
    }
  };
  
  const handleOpenSpeak = () => {
    if (!isRecognitionRunning && recognition) {
      setVoicePrompt(""); // Clear the previous voice prompt before starting a new one
      setSpeaking(true);
      setIsRecognitionRunning(true);
  
      try {
        // Stop any ongoing recognition before starting a new one
        recognition.stop();
        recognition.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
        setIsRecognitionRunning(false);
        setSpeaking(false);
      }
    }
  };
  

  const openApp = (uri) => {
    try {
      window.open(uri);
    } catch (error) {
      console.error("Failed to open app:", error);
      readResponse("Sorry, I couldn't open the application.");
    }
  };

  const handleCancel = () => {
    setSpeaking(false);
    if (speechSynthesisInstance) {
      speechSynthesisInstance.cancel();
    }
    setIsReading(false);
    setPrompt("");
    setVoicePrompt(""); // Clear the voice prompt when canceled
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="flex flex-col w-full h-full rounded-lg overflow-hidden">
        <div className="flex flex-col p-2">
          <div className="flex justify-between">
         
            <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition">
              <input
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
            <DropdownMenu/>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center flex-1">
           <img
              className="w-64 h-64 bg-gray-600 rounded-full"
              src={img2}
              alt=""
            />
            <div className="text-3xl pt-6 font-mono animate-pulse">
              Processing...
            </div>
          </div>
        ) : isReading ? (
          <div className="flex justify-center items-center h-screen bg-black">
            <div className="flex justify-between h-32 w-48 ">
              <div className="box animate-quiet"></div>
              <div className="box animate-normal"></div>
              <div className="box animate-quiet"></div>
              <div className="box animate-loud"></div>
              <div className="box animate-quiet"></div>
            </div>
          </div>
        ) : isSpeaking ? (
          <div className="flex flex-col justify-center items-center flex-1">
            <img
              className="w-64 h-64 bg-gray-600 rounded-full"
              src={img2}
              alt=""
            />
            <div className="text-3xl pt-6 font-mono animate-pulse">
            {voicePrompt || prompt }
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center flex-1">
            <img
              className="w-64 h-64 bg-gray-600 rounded-full"
              src={img2}
              alt=""
            />
            <div className="text-3xl pt-6 font-mono animate-pulse">
              <div className="text-3xl pt-6 font-mono animate-pulse">
                Start Speaking
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-end">
          <div className="flex items-center justify-center mb-14 flex-col lg:flex-row ml-4 mr-4">
            {" "}
            {/* Added mb-8 for bottom space */}
            {isChecked && (
              <input
                placeholder="Type your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className=" flex-grow p-2 mt-2 bg-gray-800 rounded-md outline-none text-white"
              />
            )}
            <div className="flex space-x-2 mt-4 p-4">
              {" "}
              {/* Added mt-4 for top space */}
              {isReading && (
                <button className="bg-red-600 rounded-full h-16 w-16 flex items-center justify-center">
                  <AiFillStop
                    className="text-white cursor-pointer text-4xl"
                    onClick={handleCancel}
                  />
                </button>
              )}
              {isSpeaking ? (
                <button className="bg-yellow-500 rounded-full h-16 w-16 flex items-center justify-center">
                  <FaStop
                    className="text-white cursor-pointer text-4xl"
                    onClick={handleStop}
                  />
                </button>
              ) : (
                !isChecked && ( // Check if isChecked is false to show CiMicrophoneOn
                  <button className="bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
                    <CiMicrophoneOn
                      className="text-white text-4xl cursor-pointer"
                      onClick={handleOpenSpeak}
                    />
                  </button>
                )
              )}
              {isChecked && (
                <button className="bg-blue-600 rounded-full h-16 w-16 flex items-center justify-center">
                  <IoSend
                    className="text-white cursor-pointer text-3xl ml-2"
                    onClick={handleSend}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

    
export default Chat;
