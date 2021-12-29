import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const useProjects = (id) => {
	const queryRef = query(
		collection(db, "projects"),
        where("accessList", "array-contains", id)
	  );
	  const projectQuery = useFirestoreQueryData(
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


	  return projectQuery
}

export default useProjects
