import React, { createContext, useContext, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const ProjectContext = createContext();

const useProjectContext = () => {
  return useContext(ProjectContext);
};

const ProjectContextProvider = ({ children }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const getCollaborators = async (usersId) => {
    let collaborators = [];
    const q = query(collection(db, "users"), where("__name__", "in", usersId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      collaborators.push(doc.data());
    });

    setCollaborators(collaborators);
  };

  //to invite colaborators
  const inviteCollaborators = async (email) => {
    const ref = doc(db, "projects", projectId);
    console.log(`email`, email);
    let message = {};

    //to check if the email is registered at OurTasks
    const methods = await fetchSignInMethodsForEmail(auth, email);
    let collaboratorsID;
    if (methods.length) {
      // The email exists in the Auth database.
      console.log(`inside email exist`);
      //find user by email
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        collaboratorsID = doc.id;
      });

      console.log(`collaboratorsID`, collaboratorsID);
      //add the user's ID to accesList array
      await updateDoc(ref, {
        accessList: arrayUnion(collaboratorsID),
      });

      message.type = "success";
      message.text = `The project was shared with the user ${email}`;
    } else {
      // User does not exist. Ask user to sign up.
      message.type = "danger";
      message.text = `The email ${email} dosen't registered at OurTasks`;
    }
    return message;
  };

  const values = {
    setProjectId,
    collaborators,
    getCollaborators,
    inviteCollaborators,
    projectId,
  };

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  );
};

export { useProjectContext, ProjectContextProvider as default };
