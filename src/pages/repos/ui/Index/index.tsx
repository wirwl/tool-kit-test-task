import mainStyles from "./index.module.scss";
import { getRepos } from "../../../../entities/common/lib/gql";
import { useLazyQuery } from "@apollo/client";
import { RepoList } from "../../../../features/common/ui/RepoList";
import { SearchPanel } from "../../../../features/common/ui/SearchPanel";
import { Header } from "../../../../wiggets/repos/ui/Header";
import { Footer } from "../../../../wiggets/repos/ui/Footer";
import { useEffect, useState } from "react";
import { $repoList } from "../../../../features/common/ui/RepoList/store";

const { root, header, main, searchPanel } = mainStyles;

export function Index() {
    const [fetchRepos, { loading }] = useLazyQuery(getRepos);
    const [repos, setRepos] = useState<any[]>([]);

    useEffect(() => {
        setRepos($repoList.getState().repos);
    }, []);

    const handleSearchPanel = (query: string | null) => {
        fetchRepos({ variables: { query } }).then(({ data }) => {
            setRepos(data.search.repos);
        })
    }

    const handleSearchPanelClear = () => {
        $repoList.reinit();
        setRepos([]);
    }

    return <div className={root}>
        <Header className={header} />
        <main className={main}>
            <SearchPanel className={searchPanel} onSearch={handleSearchPanel} onClear={handleSearchPanelClear} />
            <RepoList repos={repos} />
        </main>
        <Footer />
    </div>
}