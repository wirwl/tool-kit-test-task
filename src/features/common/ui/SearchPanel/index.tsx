import { useEffect } from 'react';
import mainStyles from './index.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { $query, saveQuery } from './store';
import { useUnit } from 'effector-react';
import cn from 'classnames/bind';

const c = cn.bind(mainStyles);
const { root, inputSearch, buttonSearch } = mainStyles;

type Props = {
    className?: string;
    onSearch: (text: string | null) => void;
    onClear: () => void;
}

export function SearchPanel({ onSearch, onClear, className }: Props) {
    const [search, setSearch] = useUnit([$query, saveQuery]);

    useEffect(() => {
        setSearch($query.getState());
    }, []);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    }
    const handleSearchClick = async () => {
        onSearch(search);
    }

    const handleClearClick = () => {
        setSearch('');
        onClear();
    }

    return <div className={c(root, className)}>
        <input className={inputSearch} value={search || ''} onChange={handleQueryChange} onKeyDown={handleInputKeyDown} />
        <div>
            <Button className={buttonSearch} onClick={handleSearchClick} text="Искать" />
            <Button onClick={handleClearClick} text="Очистить" />
        </div>
    </div>
}