import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Container } from "react-bootstrap";
import arrow from "../../assets/svg/arrow.svg";
import * as S from "./style";
import Collaborators from "../../components/Collaborators/Collaborators";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useProjectContext } from "../../contexts/ProjectContext";

const ProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation(); //to make input in focus only if user redirects first time
  const navigate = useNavigate();

  const { collaborators, getCollaborators } = useProjectContext();

  //to rename project
  const inputRef = useRef();
  const [projectName, setProjectName] = useState("");

  // to get the data about project from db
  const ref = doc(db, "projects", id);
  const queryRef = query(ref);

  const project = useFirestoreDocument(
    ["project", id],
    queryRef,
    {
      idField: "id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
  const snapshot = project.data;

  //as soon as the project's data is gotten, setProjectName as it is in DB and get collaborators
  useEffect(() => {
    if (snapshot) {
      getCollaborators(snapshot.data().accessList);
      setProjectName(snapshot.data().name);
    }
  }, [snapshot, getCollaborators]);

  //to change project name either on enter click or onBlur on input
  const changeProjectName = async () => {
    if (projectName && projectName !== snapshot.data().name) {
      await updateDoc(ref, {
        name: projectName,
      });
    } else {
      setProjectName(snapshot.data().name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      changeProjectName();
    }
  };

  //to invite colaborators
  const invite = async (email) => {
    let message = {};

    //to check if the email is registered at OurTasks
    const methods = await fetchSignInMethodsForEmail(auth, email);
    let collaboratorsID;
    if (methods.length) {
      // The email exists in the Auth database.

      //find user by email
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        collaboratorsID = doc.id;
      });

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

  return (
    <div className="d-flex flex-column flex-md-row">
      <Collaborators invite={invite} collaborators={collaborators} />
      <Container>
        <S.ProjectHeader>
          <S.GoBackButton onClick={() => navigate(-1)}>
            <img src={arrow} alt="go back" />
          </S.GoBackButton>
          {project.isLoading && <p>Loading...</p>}

          {snapshot && (
            <S.ProjectName
              type="text"
              ref={inputRef}
              autoFocus={!state}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={changeProjectName}
              onKeyPress={handleKeyPress}
            ></S.ProjectName>
          )}
        </S.ProjectHeader>
      </Container>
    </div>
  );
};

export default ProjectPage;
