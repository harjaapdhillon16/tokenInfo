import React from "react";
import { Text } from "@nextui-org/react";

export const Hero = () => {
  return (
    <div className="text-center items-center">
      <span className="flex justify-center items-center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
            "@mdMax": {
              fontSize: "$lg",
            },
          }}
          weight="bold"
        >
          TOKEN-INFO.COM
        </Text>
        <span className="lg:text-[60px] hidden md:block text-[20px] ml-4">
           🌏
        </span>
      </span>
      <Text color="white" size={20}>
        Information on the latest tokens in the crypto market
      </Text>
    </div>
  );
};
