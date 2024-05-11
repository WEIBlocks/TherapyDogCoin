import React from "react";

const MemberComp = ({name,desigination,profilePic}) => {
  return (
    <>
      <div className="rounded-full min-w-[190px] p-[20px] flex flex-col md:gap-0.5 gap-[3px] goverflow-hidden items-center ">
        <div className="lg:w-[140px] lg:h-[140px] md:w-[130px] md:h-[130px] w-[120px] h-[120px] object-cover rounded-full border-[4px] border-primary overflow-hidden ">
          <img
            src={profilePic}
            alt="teammember"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <h4 className="lg:text-2xl md:text-xl text-lg md:font-bold font-semibold capitalize text-grey">
          {name}
        </h4>
        <span className="lg:text-xl md:text-base text-sm md:font-semibold font-medium uppercase text-grey">
          {desigination}
        </span>
      </div>
    </>
  );
};

export default MemberComp;
