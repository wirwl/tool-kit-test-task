import { useUnit } from "effector-react";
import { $token, saveToken } from "../../../../shared/stores/token";
import { Button } from "../../../../shared/ui/Button";
import oa from 'oauthio-web';

export function AuthPanel() {
    const [token, setToken] = useUnit([$token, saveToken]);

    const handleClickLogin = () => {
        oa.OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');

        oa.OAuth.popup('github').then((github: any) => {
            console.log('github:', github);
            console.log('github', github.toJson());
            setToken(github.access_token);
            github.me().then((data: any) => {
                console.log('me data:', data);
            });
            // github.get('/user').then(data => {
            //     console.log('self data:', data);
            // })
        });
    }

    return <div>
        <Button onClick={handleClickLogin} text={token ? 'Выйти' : 'Войти на Github'} />
    </div>

}