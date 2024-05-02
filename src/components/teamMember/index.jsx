import React from "react";

const MemberComp = ({name,desigination,profilePic}) => {
  return (
    <>
      <div className="rounded-full min-w-[240px] p-[20px] flex flex-col md:gap-0.5 gap-1 goverflow-hidden items-center ">
        <div className="w-[140px] h-full object-cover rounded-full border-4 border-secondary ">
          <img
            src={profilePic}
            alt="teammember"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h4 className="lg:text-2xl md:text-xl text-lg md:font-bold font-semibold capitalize text-white">
          {name}
        </h4>
        <span className="lg:text-xl md:text-base text-sm md:font-semibold font-medium capitalize text-white">
          {desigination}
        </span>
      </div>
    </>
  );
};

export default MemberComp;
