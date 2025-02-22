import React, { createContext, useState } from "react";
export const PaginadoContext = createContext({});
function PaginadoProvider({children}) { 
  var page = 0;
  var nextPage = 0;
  var lastPage = 0;
  var totalEntries = 0; 
  const [dashboard,setDashboard] = useState(true);
  var [gastos,setGastos] = useState(false);
  var [ingresos,setIngresos] = useState(false);

  function setTotalEntries(value) {
    totalEntries = value;
  }
  function setNextPage(value) {
    nextPage = value;
  }
  function setPage(value) {
    page = value;
  }
  function setLastPage(value) {
    lastPage = value;
  }
  function getTotalEntries() {
    return totalEntries;
  }
  function getPage() {
    return page;
  }
  function getNextPage() {
    return nextPage;
  }
  function getLastPage() {
    return lastPage;
  }
  return (
    <PaginadoContext.Provider
      value={{
        getPage,
        setPage,
        getNextPage,
        setNextPage,
        getLastPage,
        setLastPage,
        dashboard,
        setDashboard,
        gastos,
        setGastos,
        ingresos,
        setIngresos,
        setTotalEntries,
        getTotalEntries
      }}
    >
      {children}
    </PaginadoContext.Provider>
  );
}

export default PaginadoProvider;
