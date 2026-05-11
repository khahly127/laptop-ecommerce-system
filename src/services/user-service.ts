import getConnection from "config/database";

const handleCreateUser = async (name: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users` (name, email, address) VALUES (?, ?, ?)';
        const values = [name, email, address];
        const [results, fields] = await connection.execute(sql, values);
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};
const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users` '
        );
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};
const handleDeleteUser = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE id = ?';
        const values = [id];
        const [results, fields] = await connection.execute(sql, values);
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};
const getUserById = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE id = ?';
        const values = [id];
        const [results, fields] = await connection.execute(sql, values);
        return (results as any[])[0];
    } catch (err) {
        console.log(err);
        return [];
    }
};
const updateUserById = async (id: string, name: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = 'UPDATE `users` SET name = ?, email = ?, address = ? WHERE id = ?';
        const values = [name, email, address, id];
        const [results, fields] = await connection.execute(sql, values);
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };