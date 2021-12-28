import React, { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

const useProjectContext = () => {
  return useContext(ProjectContext);
};

const ProjectContextProvider = ({ children }) => {
  const values = {};

  return (
    <ProjectContext.Provider value={values}>
      {/* {loading && <div>Loading...</div>}
      {!loading && children} */}
    </ProjectContext.Provider>
  );
};

export { useProjectContext, ProjectContextProvider as default };
