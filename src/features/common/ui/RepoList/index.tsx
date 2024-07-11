import { useEffect, useState } from 'react';
import { Paginator } from '../Paginator';
import mainStyles from './index.module.scss';
import { RepoItem } from '../../../../entities/repos/ui/RepoItem';
import { $repoList, saveRepoList, saveRepoListPage, saveRepoListRepo } from './store';
import { useUnit } from 'effector-react';

const { root, list } = mainStyles;

type Props = {
    repos: any[];

}

export function RepoList({ repos }: Props) {    
    const [repoList, setPage] = useUnit([$repoList, saveRepoListPage]);

    useEffect(()=> {
        saveRepoListRepo(repos);
    },[repos]);

    if (!repos || !repos.length) return null;

    const handlePaginatorChange = (page: number) => {
        setPage(page);
    }

    return <div className={root}>
        <h1>Найдено репозиториев: {repos.length}</h1>
        <ul className={list}>
            {repos.slice(repoList.page * 10, repoList.page * 10 + 10).map((repo) => {
                return <li key={repo.repo.id}>
                    <RepoItem data={repo.repo} />
                </li>
            })}
        </ul>
        <Paginator activePage={repoList.page} onChange={handlePaginatorChange} totalItemCount={repos.length} />
    </div>
}