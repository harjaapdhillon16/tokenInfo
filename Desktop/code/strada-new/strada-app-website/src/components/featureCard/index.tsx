import { AiOutlineDotChart } from "react-icons/ai";

import { colors } from "../../config/color";

interface Props {
  title: string;
  subtitle: string;
}

export const FeatureCard = ({ title, subtitle }: Props) => {
  return (
    <div className="shadow bg-white items-center p-5">
      <div className="text-3xl mx-auto">
        <AiOutlineDotChart color={colors.primaryColor} className={`mx-auto`} />
      </div>
      <p className="font-[600] text-2xl">{title}</p>
      <p className="text-xl font-[200]">{subtitle}</p>
    </div>
  );
};
