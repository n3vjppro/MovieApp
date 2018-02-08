import Realm from 'realm';

export const FAVORITELIST_SCHEMA = "FavoriteList";
export const REMINDERLIST_SCHEMA= "ReminderList";
export const FAVORITELIST = {
    name: FAVORITELIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: { type: 'string', indexed: true },
        overview: { type: 'string' },
        release_date: { type: 'string' },
        poster_path: { type: 'string' },
        love: { type: 'bool', default: false },
        backdrop_path:{ type: 'string' },
        vote_average:{ type: 'string' },
    }
}

export const REMINDERLIST={
    name: REMINDERLIST_SCHEMA,
    properties: {
        id: 'int',
        title: { type: 'string', indexed: true },
        release_date: { type: 'string' },
        remindTime: { type: 'string' },
    }
}

const databaseOptions = {
    path: 'MovieApp.realm',
    schema: [FAVORITELIST, REMINDERLIST],
    schemaVersion:0,
}
export const insertNewFavorite = newFavorite => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(FAVORITELIST_SCHEMA, newFavorite);
            resolve(newFavorite)
        });
    }).catch((error) => reject(error));
});

export const updateFavorite = updateFavorite => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingFavorite = realm.objectForPrimaryKey(FAVORITELIST_SCHEMA, updateFavorite.id);

            resolve();
        });
    }).catch((error) => reject(error))
});

export const deleteFavorite = deleteFavoriteId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingFavorite = realm.objectForPrimaryKey(FAVORITELIST_SCHEMA, deleteFavoriteId);
            realm.delete(deletingFavorite);
            resolve();
        });
    }).catch((error) => reject(error))
});

export const queryAllFavorite = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allFavorite = realm.objects(FAVORITELIST_SCHEMA);
        resolve(allFavorite);
    }).catch((error) => reject(error))
});

export const queryItemFavorite = queryItemFavorite => new Promise((resolve, reject)=>{
    Realm.open(databaseOptions).then(realm => {
        let queryItem = realm.objectForPrimaryKey(FAVORITELIST_SCHEMA, queryItemFavorite)
        resolve(queryItem)
    }).catch((error)=>reject(error))
});


export const insertReminder = newFavorite => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(REMINDERLIST_SCHEMA, newFavorite);
            resolve(newFavorite)
        });
    }).catch((error) => reject(error));
});

export const deleteReminder = deleteFavoriteId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingFavorite = realm.objectForPrimaryKey(REMINDERLIST_SCHEMA, deleteFavoriteId);
            realm.delete(deletingFavorite);
            resolve();
        });
    }).catch((error) => reject(error))
});
export default new Realm(databaseOptions);