// Commands.jsx
const handleOpenCommands = (message, readResponse, openApp) => {
    try {
      if (message.includes("google")) {
        window.open("https://google.com", "_blank");
        readResponse("Opening Google...");
      } else if (message.includes("youtube")) {
        window.open("https://youtube.com", "_blank");
        readResponse("Opening YouTube...");
      } else if (message.includes("facebook")) {
        window.open("https://facebook.com", "_blank");
        readResponse("Opening Facebook...");
      } else if (message.includes("calculator")) {
        openApp("Calculator:///");
        readResponse("Opening Calculator...");
      } else if (message.includes("notepad")) {
        openApp("Notepad:///");
        readResponse("Opening Notepad...");
      } else if (message.includes("paint")) {
        openApp("mspaint:///");
        readResponse("Opening Paint...");
      } else if (
        message.includes("command prompt") ||
        message.includes("cmd")
      ) {
        openApp("cmd:///");
        readResponse("Opening Command Prompt...");
      } else if (message.includes("explorer")) {
        openApp("explorer:///");
        readResponse("Opening File Explorer...");
      } else if (message.includes("settings")) {
        openApp("ms-settings:///");
        readResponse("Opening Settings...");
      } else if (message.includes("news")) {
        window.open("https://www.indiatoday.in/cities/chennai-news", "_blank");
        readResponse("Opening News...");
      } else {
        const searchQuery = message.replace("open ", "");
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
          "_blank"
        );
        readResponse(`Searching for ${searchQuery} on Google...`);
      }
    } catch (error) {
      console.error("Error handling open command:", error);
      readResponse("Sorry, I couldn't complete the command.");
    }
  };
  
  export default handleOpenCommands;
  