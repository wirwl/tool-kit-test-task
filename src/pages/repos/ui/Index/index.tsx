import mainStyles from "./index.module.scss";
import { getOwnRepos, getRepos } from "../../../../entities/common/lib/gql";
import { useLazyQuery } from "@apollo/client";
import { RepoList } from "../../../../features/common/ui/RepoList";
import { SearchPanel } from "../../../../features/common/ui/SearchPanel";
import { Header } from "../../../../wiggets/repos/ui/Header";
import { Footer } from "../../../../wiggets/repos/ui/Footer";
import { useEffect, useState } from "react";
import { $repoList, saveRepoListRepo } from "../../../../features/common/ui/RepoList/store";
import { useUnit } from "effector-react";
import { $query } from "../../../../features/common/ui/SearchPanel/store";
import { mapperRepos } from "./lib";
import { Skeleton } from "../../../../shared/ui/Skeleton";

const { root, header, main, searchPanel } = mainStyles;

export function Index() {
    const [fetchRepos, { loading:ldRepos, data }] = useLazyQuery(getRepos);
    const [fetchOwnRepos, { loading:ldOwnRepos, data: ownRepos }] = useLazyQuery(getOwnRepos);
    const [repos, setRepos] = useUnit([$repoList, saveRepoListRepo]);

    const loading = ldRepos || ldOwnRepos;

    useEffect(() => {
        const query = $query.getState();
        if (query.length === 0) {
            fetchOwnRepos().then((own) => {
                setRepos(mapperRepos(own.data.viewer.repositories.nodes));
            });
        }
    }, []);

    const handleSearchPanel = (query: string | null) => {
        if (query?.length === 0) {
            fetchOwnRepos().then((own) => {
                setRepos(mapperRepos(own.data.viewer.repositories.nodes));
            });
        } else {

            fetchRepos({ variables: { query } }).then(({ data }) => {
                setRepos(data.search.repos);
            })
        }
    }

    const handleSearchPanelClear = () => {
        $repoList.reinit();
        setRepos([]);
    }

    return <div className={root}>
        <Header className={header} />
        <main className={main}>
            <SearchPanel className={searchPanel} onSearch={handleSearchPanel} onClear={handleSearchPanelClear} />
            <RepoList repos={repos.repos} loading={loading} />
        </main>
        <Footer />
    </div>
}