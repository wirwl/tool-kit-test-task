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
    const [page, setPage] = useUnit([$repoList, saveRepoListPage]);
        
    if (!repos || !repos.length) return null;
    
    const handlePaginatorChange = (page: number) => {
        setPage(page);
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