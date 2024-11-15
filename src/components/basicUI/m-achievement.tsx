import React, { useState } from "react";
import MProgress from "./m-progress";

interface IMAchievementProps {
  image: string;
  title: string;
  progress: number;
  titleProgress: string;
}
const MAchievement: React.FC<IMAchievementProps> = ({
  image,
  title,
  progress,
  titleProgress,
}) => {
  const [isOpenProgress, setIsOpenProgress] = useState(false);
  return (
    <>
      <div
        className="m-achievement-normal"
        onClick={() => setIsOpenProgress(true)}
      >
        <img src={image} className="image" />
        <p className="title">{title}</p>
      </div>
      <MProgress
        title={titleProgress}
        percentProgress={progress}
        isOpen={isOpenProgress}
        onClose={() => setIsOpenProgress(false)}
      />
    </>
  );
};

export default MAchievement;
