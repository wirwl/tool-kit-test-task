import { useCallback, useEffect } from 'react';
import mainStyles from './index.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { $query, saveQuery } from './store';
import { useUnit } from 'effector-react';
import cn from 'classnames/bind';
import { debounce } from 'lodash';
import { saveRepoListPage } from '../RepoList/store';

const c = cn.bind(mainStyles);
const { root, inputSearch } = mainStyles;

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

    const debouncedSearch = useCallback(
        debounce((text) => {
            onSearch(text);
            saveRepoListPage(0);
          }, 500), []
    ) 

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    }    

    const handleClearClick = () => {
        setSearch('');
        onClear();
        onSearch('');
    }

    return <div className={c(root, className)}>
        <input className={inputSearch} value={search || ''} onChange={handleQueryChange} />        
            <Button onClick={handleClearClick} text="Очистить" />        
    </div>
}