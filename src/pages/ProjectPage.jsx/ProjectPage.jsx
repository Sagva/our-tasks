import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, query } from "firebase/firestore";
import { db } from "../../firebase";

const ProjectPage = () => {
  const { id } = useParams();

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

  //   useEffect(() => {
  //     console.log(`data`, data);
  //   }, [data]);
  const snapshot = project.data;
  return (
    <div>
      <h1>Project {id} page</h1>
      {project.isLoading && <p>Loading...</p>}
      {snapshot && <p>{snapshot.data().name}</p>}
    </div>
  );
};

export default ProjectPage;
