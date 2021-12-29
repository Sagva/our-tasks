import React, { useEffect } from "react";
import * as S from "./style";
import plus from "../../assets/svg/plus.svg";
import { Container } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase";

const AllProjectsPage = () => {

  const queryRef = query(
    collection(db, "projects")
  );
  const { data, isLoading } = useFirestoreQueryData(
    ["projects"],
    queryRef,
    {
      idField: "id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );
  
  return (
    <Container>
      <S.ProjectsHeader>
        <S.ButtonOutline>
          <div className="d-flex">
            <img src={plus} alt="add project" />
            <span className="mx-2"> New project</span>
          </div>
        </S.ButtonOutline>
        <div style={{ margin: "0 auto" }}>
          <S.Heading>Your projects</S.Heading>
        </div>
      </S.ProjectsHeader>
      <div className="d-flex flex-column flex-md-row mt-4">
        {isLoading && <p>Loading...</p>}
        {data && (
          <>
            {data.length ? (
              <>
                {data.map((project) => {
                  return <ProjectCard project={project} key={project.name} />;
                })}
              </>
            ) : (
              <p>You don't have any projects for the moment</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default AllProjectsPage;
