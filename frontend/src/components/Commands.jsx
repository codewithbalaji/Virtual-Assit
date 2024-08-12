const handleOpenCommands = (message, readResponse, openApp) => {
  try {
    if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      readResponse("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      readResponse("Opening YouTube...");
    } else if (message.includes("search youtube for")) {
      const searchQuery = message.replace("search youtube for", "").trim();
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, "_blank");
      readResponse(`Searching YouTube for ${searchQuery}...`);
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      readResponse("Opening Facebook...");
    } else if (message.includes("open calculator")) {
      openApp("Calculator:///");
      readResponse("Opening Calculator...");
    } else if (message.includes("open notepad")) {
      openApp("Notepad:///");
      readResponse("Opening Notepad...");
    } else if (message.includes("open paint")) {
      openApp("mspaint:///");
      readResponse("Opening Paint...");
    } else if (
      message.includes("open command prompt") ||
      message.includes("open cmd")
    ) {
      openApp("cmd:///");
      readResponse("Opening Command Prompt...");
    } else if (message.includes("open explorer")) {
      openApp("explorer:///");
      readResponse("Opening File Explorer...");
    } else if (message.includes("open settings")) {
      openApp("ms-settings:///");
      readResponse("Opening Settings...");
    } else if (message.includes("open news")) {
      window.open("https://www.indiatoday.in/cities/chennai-news", "_blank");
      readResponse("Opening News...");
    } else if (message.includes("open spotify")) {
      openApp("spotify:///");
      readResponse("Opening Spotify...");
    } else if (message.includes("play song")) {
      const songName = message.replace("play song", "").trim();
      window.open(`spotify:search:${encodeURIComponent(songName)}`);
      readResponse(`Playing ${songName} on Spotify...`);
    } else if (message.includes("open vs code")) {
      const projectName = message.replace("open vs code", "").trim();
      if (projectName) {
        openApp(`vscode://file/${encodeURIComponent(projectName)}`);
        readResponse(`Opening VS Code project: ${projectName}...`);
      } else {
        openApp("vscode:///");
        readResponse("Opening Visual Studio Code...");
      }
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
