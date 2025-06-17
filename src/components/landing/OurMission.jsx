import { FocusCards } from "@/components/ui/focus-cards";
import chatBot from "../../assets/chatBot.png";

const OurMission = () => {
  const cards = [
    {
      title: "Forest Adventure",
      src: chatBot,
    },
    {
      title: "Valley of life",
      src: chatBot,
    },
    {
      title: "Sala behta hi jayega",
      src: chatBot,
    },
    {
      title: "Camping is for pros",
      src: chatBot,
    },
    {
      title: "The road not taken",
      src: chatBot,
    },
    {
      title: "The First Rule",
      src: chatBot,
    },
  ];

  return <FocusCards cards={cards} />;
};

export default OurMission;
