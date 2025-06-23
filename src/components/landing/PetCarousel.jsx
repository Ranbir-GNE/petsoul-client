import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import petTraining from "../../assets/petTraining.jpg";
import petPersonalProfile1 from "../../assets/petPersonalProfile1.jpg";
import personalisedPet from "../../assets/personalised_pet.webp";
import petChart from "../../assets/pet_charts.avif";
import petHealth from "../../assets/pet_health.webp";
import petRecords from "../../assets/pet_records.jpeg";
import petVaccination from "../../assets/pet_vaccine.webp";
import petChatBot from "../../assets/pet_chatbot.jpg";

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
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto inset-0 object-cover"
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
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Dashboard helps to glance through the trends of vitals like temperature, heart rate, blood pressure and more of your pets in a graphical representation.",
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
const DummyContent3 = () => {
  return (
    <>
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Create Health Reports for your pets' health checkup and access them anytime.",
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

const DummyContent4 = () => {
  return (
    <>
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Manage Full Medical Record for your pets to keep track of pet's health.",
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

const DummyContent5 = () => {
  return (
    <>
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Ask your queries to our AI ChatBot curated through AI and multiple pet healthcare books.",
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

const DummyContent6 = () => {
  return (
    <>
      {[...new Array(1)].map((_, index) => {
        const sampleData = [
          {
            text: "Get Vaccination Records for your pets to keep track of pet's health.",
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
    category: "Personalisation",
    title: "Personalised Pet Profile",
    src: personalisedPet,
    content: <DummyContent1 />,
  },
  {
    category: "Ease of Use",
    title:"Information Through Visualisation",
    src: petChart,
    content: <DummyContent2 />,
  },
  {
    category: "Accessibility",
    title: "Health Reports",
    src: petHealth,
    content: <DummyContent3 />,
  },
  {
    category: "Managability",
    title: "Health Records",
    src: petRecords,
    content: <DummyContent4 />,
  },

  {
    category: "Query",
    title:
      "AI ChatBot",
    src: petChatBot,
    content: <DummyContent5 />,
  },
  {
    category: "Reminder",
    title: "Vaccination Records",
    src: petVaccination,
    content: <DummyContent6 />,
  },
];
