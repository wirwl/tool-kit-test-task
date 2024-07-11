import { Paginator } from '../Paginator';
import mainStyles from './index.module.scss';
import { RepoItem } from '../../../../entities/repos/ui/RepoItem';
import { $repoList, saveRepoListPage } from './store';
import { useUnit } from 'effector-react';
import Skeleton from 'react-loading-skeleton'

const { root, list, skeletonRoot, skeletonHeader, skeletonRepos } = mainStyles;

type Props = {
    repos: any[];
    loading: boolean;
}

export function RepoList({ repos, loading }: Props) {
    const [page, setPage] = useUnit([$repoList, saveRepoListPage]);

    if (!repos || !repos.length) return null;

    const handlePaginatorChange = (page: number) => {
        setPage(page);
    }

    if (loading) {
        return <div className={skeletonRoot}>
            <Skeleton className={skeletonHeader} height={34} />
            <Skeleton className={skeletonRepos} height={32} count={10} />
        </div>
    }

    return <div className={root}>
        <h1>Найдено репозиториев: {repos.length}</h1>
        <ul className={list}>
            {repos.slice(page.page * 10, page.page * 10 + 10).map((repo) => {
                return <li key={repo.repo.id}>
                    <RepoItem data={repo.repo} />
                </li>
            })}
        </ul>
        <Paginator activePage={page.page} onChange={handlePaginatorChange} totalItemCount={repos.length} />
    </div>
}