import React, { useEffect } from "react";

function RecordCard({
  caseNo,
  caseName,
  third,
  fourth,
  fifth,
  sixth,
  seven,
  eight,
  ftcStatus,
  spcStatus,
}) {
  useEffect(() => {}, []);

  return (
    <div className="flex">
      <div
        className={`w-full my-8 ${
          seven == 50 ? "bg-blue-50" : "bg-blue-100"
        } overflow-auto  px-2  py-1 gap-8  flex justify-evenly`}
      >
        <div className="min-w-[100px]  ">
          <p className="w-auto text-nowrap">{caseNo}</p>
        </div>
        <div className="min-w-[100px] ">
          <p className="w-full text-nowrap">{caseName}</p>
        </div>
        <div className="min-w-[100px] ">
          <p className="w-full text-nowrap">{third}</p>
        </div>
        <div className="min-w-[100px] ">
          <p className="w-full text-nowrap">{fourth}</p>
        </div>
        <div className="min-w-[100px] ">
          <p className="w-full text-nowrap">{fifth}</p>
        </div>
        <div className="min-w-[100px] ">
          <p className="w-full text-nowrap">{sixth}</p>
        </div>
        {spcStatus && ftcStatus && (
          <div className="min-w-[100px] ">
            <p className="w-full text-nowrap">{eight}</p>
          </div>
        )}
      </div>
      {ftcStatus && (
        <div className="flex justify-center items-center px-2">
          <span>✏️</span>
        </div>
      )}
    </div>
  );
}

export default RecordCard;
