import { createStore, createEvent } from "effector";
import { persist } from "effector-storage/local";

export const $query = createStore<string>('', { name: '$query' });
persist({ store: $query });

export const saveQuery = createEvent<string>();
export const resetQuery = createEvent();

$query.on(saveQuery, (_, payload) => payload);
$query.reset(resetQuery);
