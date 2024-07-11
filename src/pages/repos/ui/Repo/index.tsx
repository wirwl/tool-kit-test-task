import { useEffect } from "react";
import { useParams } from "react-router-dom"

export function Repo() {
    const {name, owner} = useParams();
    console.log(name, owner);

    useEffect(()=>{
        (async () => {
            // const result = await apolloClient.query({query: getRepos(search)});
        })();
        
    },[]);

    return <div>
        111111111111111
    </div>
}