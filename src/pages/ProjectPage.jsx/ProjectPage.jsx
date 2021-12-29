import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Container } from "react-bootstrap";
import arrow from "../../assets/svg/arrow.svg";
import * as S from "./style";
import Collaborators from "../../components/Collaborators/Collaborators";

const ProjectPage = () => {
  const { id } = useParams();
  const { state } = useLocation(); //to make input in focus only if user redirects first time
  const navigate = useNavigate();
  const inputRef = useRef();
  const [projectName, setProjectName] = useState("");

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

  useEffect(() => {
    if (snapshot) {
      setProjectName(snapshot.data().name);
    }
  }, [snapshot]);

  const changeProjectName = async () => {
    if (projectName && projectName !== snapshot.data().name) {
      const ref = doc(db, "projects", id);
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
  return (
    <div className="d-flex flex-column flex-md-row">
      <Collaborators />
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
