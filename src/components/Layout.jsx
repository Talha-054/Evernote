import React, { useEffect, useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import {
  getAllAdmins,
  getAnalytics,
  getAnalytics2,
  getFTC,
  getPspc,
  getSPC,
  getTasks,
} from "../firebase/auth";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import AreaGraph from "./AreaGraph";
import PieGraph from "./PiGraph";
import { analyticsParser, trafficParser } from "../Utils/analytics";
import Table from "./Table";
import { nextOverdue } from "../Utils/nextOverdue";
import { useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function Layout({
  showStatus,
  spcStatus,
  ftcStatus,
  taskStatus,
  adminTableStatus,
  updatedStatus,
  setUpdatedStatus,
  setTaskStatus,
  setFtcStatus,
  setSpcStatus,
  setAdminTableStatus,
}) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [tasks, setTasks] = useState();
  const [ftc, setFtc] = useState();
  const [spc, setSpc] = useState();
  const [pspc, setPspc] = useState();
  const [updated, setUpdated] = useState();
  const [traffic, setTraffic] = useState();
  const [chartType, setChartType] = useState("bar");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [admins, setAdmins] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      let res = await getTasks();
      setTasks([...res]);
    };

    const fetchFTC = async () => {
      let res = await getFTC();
      setFtc([...res]);
    };

    const fetchSPC = async () => {
      let res = await getSPC();
      setSpc([...res]);
    };

    const trafficData = async () => {
      let traffic = await getAnalytics();
      console.log(trafficParser(traffic));
    };

    const analytics = async () => {
      let analytics = await getAnalytics2();
      setTraffic([...analytics]);
    };

    const fetchAdmins = async () => {
      let admins = await getAllAdmins();
      setAdmins([...admins]);
      setLoading(false);
    };

    const fetchPspc = async () => {
      let res = await getPspc();
      setPspc([...res]);
    };

    // const users = async () => {
    //   let res = await listAllUsers();
    //   console.log(res);
    // };

    try {
      fetchTasks();
      fetchFTC();
      fetchSPC();
      trafficData();
      analytics();
      fetchAdmins();
      fetchPspc();
      console.log("done");
    } catch (error) {
      setLoading(false);
      console.log("some error occured while fetching data. error is: ", error);
    }
    console.log("render");
  }, [refresh]);

  // let filteredTraffic = trafficParser(traffic);
  let analytics = analyticsParser(traffic);
  let res = nextOverdue(tasks, ftc, spc, pspc);
  console.log(res);

  let users = [
    { name: "Registered", value: tasks?.length },
    {
      name: "OverDue",
      value: tasks?.filter((record) => record.overDue == "YES").length,
    },
  ];

  function handleChartChange(e) {
    setChartType(e.target.value);
  }

  return (
    <>
      <section className=" flex  flex-col px-4 pt-8 pb-4 bg-[#F2F2F2] justify-start items-center w-full overflow-hidden gap-6 text-black">
        <Header
          data={{
            setRefresh,
            tasks,
            ftc,
            spc,
            updated,
            setUpdated,
            taskStatus,
            ftcStatus,
            spcStatus,
            updatedStatus,
            setUpdatedStatus,
            setFtcStatus,
            setSpcStatus,
            setTaskStatus,
            adminTableStatus,
          }}
        />

        {(taskStatus || updatedStatus) && !showStatus && (
          <Filter
            data={{
              tasks,
              setTasks,
              setUpdated,
              setUpdatedStatus,
              setTaskStatus,
            }}
          />
        )}

        {!showStatus && (
          <div className="grow relative layout heading  border-[1px] border-black/10 bg-white w-full rounded-lg overflow-y-auto ">
            {(loading || navigation.state === "loading") && (
              <div className="flex justify-center  absolute top-0 h-full w-full bg-black/10 backdrop-blur-3xl items-center py-2 z-50">
                <Loader />
              </div>
            )}
            <Table
              tasks={tasks}
              ftc={ftc}
              spc={spc}
              admins={admins}
              updated={updated}
              updatedStatus={updatedStatus}
              adminTableStatus={adminTableStatus}
              taskStatus={taskStatus}
              spcStatus={spcStatus}
              ftcStatus={ftcStatus}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        )}

        {showStatus && (
          <div className="grow flex flex-col xl:flex-row layout relative border-[1px] border-black/10 bg-white w-full px-2 overflow-y-auto">
            <div className="w-full  pr-6 lg:pr-0 lg:py-6">
              <h1 className="b-6 text-center text-2xl font-medium  ">Users </h1>

              <div className="w-full flex justify-evenly mb-2 items-center">
                <div className="flex flex-col gap-1 pt-2 justify-start items-center">
                  <label>Line</label>
                  <input
                    value={"line"}
                    name="chart-type"
                    onChange={handleChartChange}
                    className="h-4 w-4  hover:cursor-pointer"
                    type="radio"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-2 justify-start items-center">
                  <label>Bar</label>
                  <input
                    value={"bar"}
                    name="chart-type"
                    onChange={handleChartChange}
                    className="h-4 w-4 hover:cursor-pointer"
                    type="radio"
                  />
                </div>
                <div className="flex flex-col gap-1 pt-2 justify-start items-center">
                  <label>Area</label>
                  <input
                    value={"area"}
                    name="chart-type"
                    onChange={handleChartChange}
                    className="h-4 w-4 hover:cursor-pointer"
                    type="radio"
                  />
                </div>
              </div>

              <div
                className={`w-full ${
                  loading ? "flex" : "hidden"
                }   justify-center grow items-center`}
              ></div>
              {analytics && chartType == "line" ? (
                <LineGraph data={analytics} />
              ) : null}
              {analytics && chartType == "bar" ? (
                <BarGraph data={analytics} />
              ) : null}
              {analytics && chartType == "area" ? (
                <AreaGraph data={analytics} />
              ) : null}
            </div>

            <div className="w-full">
              <h1 className="py-6 text-center text-2xl font-medium ">
                Insights
              </h1>
              {<PieGraph data={users || []} />}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Layout;
