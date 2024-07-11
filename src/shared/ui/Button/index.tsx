import mainStyles from './index.module.scss';
import cn from 'classnames/bind';

const c = cn.bind(mainStyles);
const { root} = mainStyles;

type Props = {
    className?: string;
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({ className, text, onClick }: Props) {
    return <button className={c(root, className)} onClick={onClick}>{text}</button>
}