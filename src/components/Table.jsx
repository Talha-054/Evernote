import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useNavigate } from "react-router-dom";

function Table({
  tasks,
  ftc,
  spc,
  taskStatus,
  ftcStatus,
  spcStatus,
  updated,
  admins,
  adminTableStatus,
  loading,
  setLoading,
}) {
  let rowData = [];
  let colData = [];

  const navigate = useNavigate();

  const colDataTasks = [
    { field: "caseNo" },
    { field: "caseName" },
    { field: "task" },
    { field: "dueDate" },
    { field: "overDue" },
    { field: "bucket" },
  ];

  const colDataFtc = [
    { field: "caseNo" },
    { field: "caseName" },
    { field: "mostRecentConference" },
    { field: "monthsSinceMostRecentConference" },
    { field: "mostRecentConferenceType" },
    { field: "conferenceScheduledDate" },
    { field: "scheduledConferenceType" },
    { field: "closingConference" },
  ];

  const colDataSpc = [
    { field: "caseNo" },
    { field: "caseName" },
    { field: "referralDate" },
    { field: "lastSpcDate" },
    { field: "monthsSinceLastScp" },
    { field: "nextDueDate" },
    { field: "dueStatus" },
    { field: "worker" },
  ];

  console.log(admins);
  console.log(adminTableStatus);

  if (taskStatus) {
    rowData = tasks;
    colData = colDataTasks;
  } else if (ftcStatus) {
    rowData = ftc;
    colData = colDataFtc;
  } else if (spcStatus) {
    rowData = spc;
    colData = colDataSpc;
  } else if (updated) {
    rowData = updated;
    for (let field in updated[0]) {
      if (field == "mostRecentConference") colData = colDataFtc;
      if (field == "referralDate") colData = colDataSpc;
      if (field == "bucket") colData = colDataTasks;
    }
  } else if (adminTableStatus) {
    console.log("here");
    rowData = admins;
    for (let field in admins[0]) {
      colData.push({ field: field });
    }
  }

  function handleRowEdit(e) {
    if (!ftcStatus) return;

    navigate(`/ftc/${e.data.caseNo}/${e.data.caseName}`);
    console.log(e.data);
  }

  // if (tasks) {
  //   for (let field in tasks[0]) {
  //     console.log(field);
  //     if (field == "id") continue;
  //   }
  // }

  return (
    <div className="ag-theme-quartz w-full h-full layout">
      <AgGridReact
        rowData={rowData || []}
        columnDefs={colData || []}
        className="w-full "
        onRowClicked={handleRowEdit}
      />
    </div>
  );
}

export default Table;
