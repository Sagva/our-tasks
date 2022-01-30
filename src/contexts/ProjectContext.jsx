import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ProjectContext = createContext();

const useProjectContext = () => {
  return useContext(ProjectContext);
};

const ProjectContextProvider = ({ children }) => {
  const [collaborators, setCollaborators] = useState([]);

  const getCollaborators = async (usersId) => {
    let collaborators = [];
    const q = query(collection(db, "users"), where("__name__", "in", usersId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      collaborators.push(doc.data());
    });

    setCollaborators(collaborators);
  };

  const values = { collaborators, getCollaborators };

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  );
};

export { useProjectContext, ProjectContextProvider as default };
