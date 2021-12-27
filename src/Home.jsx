import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [project, setProjects] = useState();

  const getingData = async () => {
    const ref = collection(db, "projects");
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setProjects(data);
    console.log(`data`, data);
  };
  useEffect(() => {
    getingData();
  }, []);
  return <div></div>;
};

export default Home;
