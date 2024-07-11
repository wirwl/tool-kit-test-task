export type RepoShort = {
    id: string;
    name: string;
    stargazerCount: number;
    pushedAt: string;
    url: string;
    owner: {
        login: string;
    }
}

export type RepoFull = RepoShort & {

}