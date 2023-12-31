import fs from "fs-extra";
import { join } from "path";

// Load all sql queries in folderName
const loadSqlQueries = async (folderName) => {
    const filePath = join(process.cwd(), "data", folderName);

    const files = await fs.readdir(filePath);

    // Duyệt hết file đuôi .sql
    const sqlFiles = files.filter((f) => f.endsWith(".sql"));
    const queries = {};

    // Duyệt hết files trong thư mục
    for (const sqlfile of sqlFiles) {
        const query = fs.readFileSync(join(filePath, sqlfile), {
            encoding: "UTF-8",
        });
        queries[sqlfile.replace(".sql", "")] = query;
    }

    return queries;
};

function generateRandomID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let randomID = "";

    // Generate random numbers
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        randomID += numbers[randomIndex];
    }

    // Generate random characters
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomID += characters[randomIndex];
    }

    // Shuffle the characters in the randomID
    randomID = randomID
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    return randomID;
}

function getCurrentDate() {
    const currentDate = new Date();
    // Format the date as required for your SQL query, e.g., 'yyyy-MM-dd'
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
}

export default {
    loadSqlQueries,
    generateRandomID,
    getCurrentDate,
};
