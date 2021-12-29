import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ProjectPage = () => {
  const { id } = useParams();
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
  return (
    <div>
      <h1>Project {id} page</h1>
      {project.isLoading && <p>Loading...</p>}
      {snapshot && (
        <input
          type="text"
          ref={inputRef}
          autoFocus
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onBlur={changeProjectName}
        ></input>
      )}
    </div>
  );
};

export default ProjectPage;
