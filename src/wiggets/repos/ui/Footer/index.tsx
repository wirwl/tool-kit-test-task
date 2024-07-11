import mainStyles from './index.module.scss';

const { root, copyright } = mainStyles;

export function Footer() {
    return <div className={root}>
        <a target='_blank' className={copyright} href='https://hh.ru/resume/6682d8c2ff0896801e0039ed1f66324d4d6b70'>© 2024 Дмитрий Левченко</a>
    </div>
}