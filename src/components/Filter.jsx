import React, { useEffect, useState } from "react";
import { allRecords } from "../global";
import { useNavigate } from "react-router-dom";

function Filter({ data }) {
  const { tasks, setTasks, setUpdated, setUpdatedStatus, setTaskStatus } = data;

  const navigate = useNavigate();

  function showAll() {
    setUpdatedStatus(false);
    setTaskStatus(true);
  }

  function showOverDue() {
    setTaskStatus(false);
    setUpdatedStatus(true);
    let updated = tasks?.filter((record) => record.overDue == "YES");
    updated ? setUpdated([...updated]) : setUpdated([]);
  }

  function addRecord() {
    navigate("/add");
  }

  return (
    <>
      <section className="w-full flex flex-col justify-start items-start gap-6">
        <h1 className="text-lg font-medium">Records Information</h1>

        <div className="flex w-full justify-between items-center  px-4 overflow-auto">
          <div className="flex gap-10">
            <button
              onClick={addRecord}
              className="rounded px-4 py-2 hover:cursor-pointer hover:bg-black/10"
            >
              Add Record<span className="px-2">➕</span>
            </button>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-1 justify-center items-center">
              <label
                htmlFor="all"
                className="text-sm opacity-80 font-normal mb-1"
              >
                All
              </label>
              <input
                onChange={showAll}
                name="filter"
                id="all"
                type="radio"
                className="px-2 py-1 border-[1px] border-black/20 hover:cursor-pointer h-4 w-4"
              />
            </div>

            <div className="flex flex-col gap-1 justify-center items-center">
              <label
                htmlFor="overdue"
                className="text-sm opacity-80 font-normal mb-1"
              >
                Overdue
              </label>
              <input
                onChange={showOverDue}
                name="filter"
                id="overdue"
                type="radio"
                className="px-2 py-1 border-[1px] border-black/20 hover:cursor-pointer h-4 w-4"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Filter;
