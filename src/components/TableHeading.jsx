import React from "react";

function TableHeading() {
  return (
    <>
      <div className="w-full heading sticky top-0 bg-white   px-2 overflow-auto  py-1 gap-8 flex justify-evenly  items-center mb-4">
        <div className="">
          <p className="min-w-[100px] text-nowrap w-auto font-bold ">caseNo</p>
        </div>
        <div className="">
          <p className="min-w-[100px] text-nowrap font-bold ">caseName</p>
        </div>
        <div className="">
          <p className="min-w-[100px] text-nowrap font-bold ">Task</p>
        </div>
        <div className="">
          <p className="min-w-[100px] text-nowrap font-bold ">dueDate</p>
        </div>
        <div className="">
          <p className="min-w-[100px] text-nowrap font-bold ">Overdue</p>
        </div>
        <div className="">
          <p className="min-w-[100px] text-nowrap font-bold ">bucket</p>
        </div>
      </div>
    </>
  );
}

export default TableHeading;
