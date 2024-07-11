import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getRepo } from "../../../../entities/common/lib/gql";
import mainStyles from './index.module.scss';
import { DateTime } from "luxon";

const { root, row1, row2, row3, row4, langList, langItem, cssName, shortDesc } = mainStyles;

export function Repo() {
    const { name, owner } = useParams();

    const [fetchRepo, { data }] = useLazyQuery(getRepo, {
        variables: {
            name, owner
        }
    });

    useEffect(() => {
        fetchRepo().then((data) => {
            console.log(data);
        });

    }, []);

    if (!data) return null;

    const { stargazerCount, pushedAt, languages, shortDescriptionHTML } = data.repository;
    const { edges: lngs } = languages;
    const { avatarUrl, url } = data.repositoryOwner;

    return <div className={root}>
        <div className={row1}><span>{name}</span> &#9734; {stargazerCount} last commit: {DateTime.fromISO(pushedAt).setLocale('ru').toFormat('d MMMM tt')}</div>
        <div className={row2}>
            <img src={avatarUrl} width={200} height={200} />
            <a className={cssName} target="_blank" href={url}>{name}</a>
        </div>
        <div className={row3}>
            Список языков:{' '}
            <ul className={langList}>
                {lngs.map((lng: any) => {
                    const { color, id, name } = lng.node;
                    return <li className={langItem} key={id} style={{color}}>{name}</li>
                })}
            </ul>
        </div>
        <div className={row4}>
              <p className={shortDesc}>Краткое описание репозитория:</p>
              {shortDescriptionHTML}
        </div>
    </div>
}