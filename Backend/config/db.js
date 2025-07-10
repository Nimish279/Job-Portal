import mysql from 'mysql2/promise';

let connection;

const connectDB = async () => {
    try {
        connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        console.log(`MySQL Connected: ${process.env.MYSQL_HOST}`);
    } catch (error) {
        console.log(`MySQL Connection Error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
export { connection }; // optional, if you want to use the connection elsewhere
