import utils from '../utils.js';
import config from '../../config/config.js';
import sql from 'mssql';

const addShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);

        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const showTimeId = utils.generateRandomID();
            
        const insertEvent = await pool.request()
                            .input('ShowTime_ID', sql.NVarChar, showTimeId)
                            .input('Movie_ID', sql.NVarChar, data.movieId)
                            .input('Date', sql.NVarChar, data.date)
                            .input('Start_Time', sql.NVarChar, data.startTime)
                            .query(sqlQueries.addShowTime);   
       
        console.log("Added showtime: " + insertEvent.recordset);
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const getComingShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const event = await pool.request().query(sqlQueries.getComingShowTime);

        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getTodayShowTime = async() => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const event = await pool.request().query(sqlQueries.getTodayShowTime);

        if (event.recordset == "") {
            return {
                message: "No show time today",
            }
        }
        return event.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const getSeatsOfShowTime = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries("ticket/sql");

        const ticket = await pool
            .request()
            .input("ShowTime_ID", sql.NVarChar, data.showTimeId)
            .query(sqlQueries.getSeatsOfShowTime);

        return ticket.recordset;
    } catch (error) {
        return error;
    }
};


const getCostOfShowTime = async(data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('showTime/sql');

        const cost = await pool.request()
                                .input('ShowTime_ID', sql.NVarChar, data.showTimeId)
                                .query(sqlQueries.getCostOfShowTime);

        return cost.recordset[0];
    } catch (error) {
        return error.message;
    }
}

export default {
    addShowTime,
    getTodayShowTime,
    getComingShowTime,
    getCostOfShowTime,
    getSeatsOfShowTime
}