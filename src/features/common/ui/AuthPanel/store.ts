import { createStore, createEvent } from "effector";
import { persist } from "effector-storage/local";

type TStore = {
    auth: {
        access_token: string;
        provider: string;
        token_type: string;
    },
    user: {
        avatar: string;
        email: string;
        name: string;
    }
}

export const $authPanel = createStore<TStore | null>(null, { name: '$authPanel' });
persist({ store: $authPanel });

export const saveAuthData = createEvent<TStore | null>();
export const resetAuthData = createEvent();

$authPanel.on(saveAuthData, (_, payload) => payload);
$authPanel.reset(resetAuthData);
