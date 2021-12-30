import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Container } from "react-bootstrap";
import arrow from "../../assets/svg/arrow.svg";
import * as S from "./style";
import Collaborators from "../../components/Collaborators/Collaborators";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const ProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation(); //to make input in focus only if user redirects first time
  const navigate = useNavigate();
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

  //as soon as the date's gotten, setProjectName as it is in DB
  useEffect(() => {
    if (snapshot) {
      setProjectName(snapshot.data().name);
    }
  }, [snapshot]);

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
    const methods = await fetchSignInMethodsForEmail(auth, email);
    console.log(`methods`, methods);
    console.log(`email`, email);

    if (methods.length) {
      // The email already exists in the Auth database.
      console.log(`user exist`);
      message.type = "success";
      message.text = `The project was shared with the user ${email}`;
    } else {
      // User does not exist. Ask user to sign up.
      console.log(`user is not exist`);
      message.type = "danger";
      message.text = `The email ${email} dosen't registered at OurTasks`;
    }
    return message;
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Collaborators invite={invite} />
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
