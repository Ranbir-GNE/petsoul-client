import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Avoid re-adding scripts if already loaded
    if (document.querySelector('script[src*="botpress.cloud"]')) return;

    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    script1.onerror = () => console.error("Failed to load inject.js");
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2024/11/17/07/20241117075158-Z6K79EL2.js";
    script2.async = true;
    script2.onerror = () => console.error("Failed to load chatbot config script");
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return <div id="bp-web-widget" />;
};

export default Chatbot;
