import { useUnit } from "effector-react";
import { Button } from "../../../../shared/ui/Button";
// @ts-ignore
import oa from 'oauthio-web';
import { $authPanel, saveAuthData } from "./store";
import mainStyles from './index.module.scss';
import Loading from './loading.svg?react';
import { useState } from "react";

const {root} = mainStyles;

export function AuthPanel() {
    const [auth, setAuth] = useUnit([$authPanel, saveAuthData]);
    const [loading, setLoading] = useState<'idle'|'loading'|'loaded'>('idle');

    const handleClickLogin = async () => {
        const currentAuth = $authPanel.getState();
        if (currentAuth) {
            setLoading('idle');
            $authPanel.reinit();
        } else {
            oa.OAuth.initialize("HwAr2OtSxRgEEnO2-JnYjsuA3tc");
            setLoading('loading')
            const github = await oa.OAuth.popup('github');            
            const user = await github.me();
            setAuth({ auth: github, user });
            setLoading('loaded');
        }
    }

    return <div className={root}>
        {{
            idle: null,
            loading: <Loading/>,
            loaded: <p><span>{auth?.user.name}</span> | <span>{auth?.user.email}</span></p> 
        }[loading]}        
        <Button onClick={handleClickLogin} text={auth ? 'Выйти' : 'Авторизоваться на Github'} />
    </div>

}