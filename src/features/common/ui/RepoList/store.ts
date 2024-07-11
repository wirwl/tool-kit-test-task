import { createStore, createEvent } from "effector";
import { persist } from "effector-storage/local";

type TStore = {
    repos: any[];
    page: number;
}

const initialState = {
    repos: [],
    page: 0
}

export const $repoList = createStore<TStore>(initialState, { name: '$repoList' });
persist({ store: $repoList });

export const saveRepoList = createEvent<TStore>();
export const saveRepoListRepo = createEvent<any[]>();
export const saveRepoListPage = createEvent<number>();
export const resetRepolist = createEvent();

$repoList.on(saveRepoList, (_, payload) => payload);
$repoList.on(saveRepoListRepo, ({ page }, repos) => ({ repos, page }));
$repoList.on(saveRepoListPage, ({ repos }, page) => ({ repos, page }));
$repoList.reset(resetRepolist);
