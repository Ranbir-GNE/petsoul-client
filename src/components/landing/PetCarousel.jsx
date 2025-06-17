import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import chatBot from "../../assets/chatBot.png";
import petTraining from "../../assets/petTraining.jpg";
import petVaccination from "../../assets/petVaccinations.jpg";
import petHealthRecord from "../../assets/petHealthRecord.jpg";
import petHealthReports from "../../assets/petHealthReports.jpg";
import petPersonalProfile from "../../assets/petPersonalProfile.jpg";
import petHealthChart from "../../assets/petHealthChart.jpg";
import petAIChatbot from "../../assets/petAIChatbot.png";
import petPersonalProfile1 from "../../assets/petPersonalProfile1.jpg";

const AppleCarousel = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your Pet Soul
      </h2>
      <Carousel items={cards} />
    </div>
  );
};
export default AppleCarousel;

const DummyContent1 = () => {
  return (
    <>
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Create a individual personalised Profile for your pets.",
            imgSrc: petPersonalProfile1,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
        ];

        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {sampleData[index].text}
              </span>{" "}
            </p>
            <img
              src={sampleData[index].imgSrc}
              alt={sampleData[index].imgAlt}
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
const DummyContent2 = () => {
  return (
    <>
      {[...new Array(3)].map((_, index) => {
        const sampleData = [
          {
            text: "Dashboard helps to glance through the trends of vitals of your pets in a graphical representation.",
            imgSrc: petTraining,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
          {
            text: "Track various vitals like temperature, heart rate, blood pressure and more.",
            imgSrc: petTraining,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
          {
            text: "The Charts are updated after every new report added.",
            imgSrc: petTraining,
            imgAlt: "Macbook mockup from Aceternity UI",
          },
        ];

        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Create a individual personalised Profile for your pets.
              </span>{" "}
              {sampleData[index].text}
            </p>
            <img
              src={sampleData[index].imgSrc}
              alt={sampleData[index].imgAlt}
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Personal Profile",
    title: "Create a individual personalised Profile for your pets.",
    src: petPersonalProfile,
    content: <DummyContent1 />,
  },
  {
    category: "Ease of Use",
    title:
      "Glance thorugh the trends of vitals of your pets in a graphical representation.",
    src: petHealthChart,
    content: <DummyContent2 />,
  },
  {
    category: "Accessibility",
    title: "Manage your pets Health Reports and access them anytime.",
    src: petHealthReports,
    content: <DummyContent1 />,
  },
  {
    category: "Managability",
    title: "Manage Medical Record for your pets to keep track of pet's health.",
    src: petHealthRecord,
    content: <DummyContent2 />,
  },

  {
    category: "Product",
    title:
      "ChatBot curated through AI and multiple pet heathcare books answers all your queries.",
    src: petAIChatbot,
    content: <DummyContent1 />,
  },
  {
    category: "Vaccinations",
    title: "Vaccination record and reminders for your pet and timely updates.",
    src: petVaccination,
    content: <DummyContent2 />,
  },
];
