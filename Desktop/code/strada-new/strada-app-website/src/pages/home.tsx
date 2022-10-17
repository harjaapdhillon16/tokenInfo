import React from "react";

import { Header } from "../components/header";
import { FeatureCard } from "../components/featureCard";
import { Roadmap } from "../components/roadmap";
import { DownloadBanner } from "../components/downloadBanner";

const cardsData = [
  { title: "Ap Dhillon", subtitle: "The best artist for fast music around !" },
  { title: "Shubh", subtitle: "The new age baller take industry by the balls" },
  { title: "Gurinder Gill", subtitle: "The best one in the brown boys TRIO" },
  { title: "Tyson Sidhu", subtitle: "GODSPEED is coming up right now man !" },
  { title: "Sidhu Moosewala", subtitle: "The All time GOAT Forever !" },
  { title: "Karan Aujla", subtitle: "The best one in the RAP GAME HERE !" },
];

export const Home = () => {
  const hero = (
    <div className="relative w-[98%] mx-auto">
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19')",
        }}
        className="h-[90vh] rounded-3xl "
      />
      <div className="absolute top-0 h-[90vh] flex justify-between p-10 items-center bg-black w-full rounded-3xl bg-opacity-[0.2]">
        <h1 className="text-white text-6xl headingFont font-[900] w-[420px]">
          FIND THE TOP ARTWORKS AROUND THE WORLD THAT YOU LIKE !
        </h1>
        <img
          className="h-[85vh] md:block hidden w-[400px] object-cover mx-10"
          alt="Phone"
          src="https://media.croma.com/image/upload/v1619095632/Croma%20Assets/Communication/Mobiles/Images/234254_zoivp2.png"
        />
        <div className="absolute bottom-10 left-10 flex space-x-3">
          <img
            src="https://i.pinimg.com/736x/21/77/87/217787e5e056ef51dfde6dbf8f2321bf.jpg"
            alt="google play"
            className="rounded-full h-10 w-10"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-J7F1-yDUZp77V-ta5qaEO0_P88dHVwqLGQXiRk-c-ulCn5vNHuG792q0f4qMV2n2r5k&usqp=CAU"
            alt="apple"
            className="rounded-full h-10 w-10"
          />
        </div>
      </div>
    </div>
  );

  const features = (
    <div className="text-center my-10 w-[98%] mx-auto">
      <p className="text-3xl font-[200]">
        STRADA : The most exclusive artwork database on the planet!
      </p>
      <div className="grid md:grid-cols-3 mt-5 gap-3">
        {cardsData.map((item) => (
          <FeatureCard {...item} key={item.title} />
        ))}
      </div>
    </div>
  );

  const roadmap = (
    <div className="px-4">
      <p className="text-4xl font-[200] mb-2">Roadmap</p>
      <Roadmap />
    </div>
  );

  return (
    <>
      <Header />
      {hero}
      {features}
      {roadmap}
      <DownloadBanner />
    </>
  );
};
