import { createStore, createEvent } from "effector";
import { persist } from "effector-storage/local";

export const $token = createStore<string | null>(null, {name: '$token'});
persist({store: $token});

export const saveToken = createEvent<string>();
export const resetToken = createEvent();

$token.on(saveToken, (_, payload)=> payload);
$token.reset(resetToken);