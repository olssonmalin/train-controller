import bcrypt from 'bcrypt';

import mongoDBSingleton from '../db/database.mjs';

const usersService = {
    findUserByEmail: async (email) => {
        const db = await mongoDBSingleton.connect();
        const col = await db.collection('users');
        const filter = {
            email,
        };
        return await col.findOne(filter);
    },
    createUser: async (newUser) => {
        newUser.password = bcrypt.hashSync(newUser.password, 12);
        const db = await mongoDBSingleton.connect();
        const col = await db.collection('users');
        const result = await col.insertOne(newUser);
        console.log(
            `New user created with the following id: ${result.insertedId}`,
        );
        return result;
    },
};

export default usersService;
