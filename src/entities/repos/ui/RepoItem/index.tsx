import { Link } from 'react-router-dom';
import { RepoShort } from '../../model/types';
import mainStyles from './index.module.scss';

const { root, cssName, link } = mainStyles;

type Props = {
    data: RepoShort;
}

export function RepoItem({data}: Props) {
    const { name, stargazerCount, pushedAt, url, owner: { login } } = data;

    return <div className={root}>
        <Link className={cssName} to={`/repo/${name}/${login}`}>{name}</Link> 
        &nbsp; &#9734; {stargazerCount} last commit: {pushedAt} <a className={link} href={url}>&#x1F517;</a> 
    </div>
}


// https://www.apollographql.com/docs/react/get-started#step-4-connect-your-client-to-react