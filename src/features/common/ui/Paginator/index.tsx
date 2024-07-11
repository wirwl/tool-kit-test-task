import mainStyles from './index.module.scss';
import cn from 'classnames/bind';

const c = cn.bind(mainStyles);

const { root, page } = mainStyles;

type Props = {
    totalItemCount: number;
    maxItemsPerPage?: number;
    activePage: number;
    onChange: (page: number) => void;
}

export function Paginator({ totalItemCount, maxItemsPerPage = 10, activePage, onChange }: Props) {
    if (!totalItemCount) return null;
    const totalPageCount = Math.ceil(totalItemCount / maxItemsPerPage);
    if (totalPageCount < 2) return null;

    const handleClickPage = (page: number) => () => {
        onChange(page);
    }

    return <ul className={root}>
        {(new Array(totalPageCount)).fill(0).map((_, index) => {
            const active = index === activePage;

            return <li
                key={index}
                onClick={handleClickPage(index)}
            >
                <button className={c(page, { active })}>{index + 1}</button>
            </li>
        })}
    </ul>
}