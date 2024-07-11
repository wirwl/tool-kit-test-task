import { Logo } from '../../../../entities/repos/ui/Logo';
import mainStyles from './index.module.scss';
import cn from 'classnames/bind';
// import { AuthPanel } from '../../../../features/common/ui/AuthPanel';

const c = cn.bind(mainStyles);
const { root } = mainStyles;

type Props = {
    className?: string;
}

export function Header({className}:Props) {
    return <header className={c(root, className)}>
        <Logo/>
        {/* Сделал авторизацию через oauth.io, 
        т.к. думал что без этого не получится получить список
        репозиториев. Закомментировал за ненадобностью. */}
        {/* <AuthPanel/> */}
    </header>
}