import mysql from 'mysql2';

const pool = mysql.createPool({
    host:"127.0.0.1",
    password:"123talia",
    user:"root",
    database:'hmo'
}).promise();

//יצירת חבר חדש.
export const createMember = async (memberData) => {
    const { MemberID, FirstName, LastName, Address, DateOfBirth, Phone, MobilePhone } = memberData;
    const query = 'INSERT INTO members (MemberID, FirstName, LastName, Address, DateOfBirth, Phone, MobilePhone) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [MemberID, FirstName, LastName, Address, DateOfBirth, Phone, MobilePhone]);
    return result.insertId;
};

//קריאת כל החברים.
export const getmembers= async () => {
    const [members] = await pool.query('SELECT * FROM members');
    return members;
};

//קריאת חבר מסוים על פי זיהוי.
export const getMemberById = async (memberID) => {
    const [member] = await pool.query('SELECT * FROM members WHERE MemberID = ?', [memberID]);
    return member[0];
};

//עדכון פרטי חבר קיים.
export const updateMember = async (memberID, memberData) => {
    const { FirstName, LastName, Address, DateOfBirth, Phone, MobilePhone } = memberData;
    const query = 'UPDATE members SET FirstName = ?, LastName = ?, Address = ?, DateOfBirth = ?, Phone = ?, MobilePhone = ? WHERE MemberID = ?';
    await pool.query(query, [FirstName, LastName, Address, DateOfBirth, Phone, MobilePhone, memberID]);
};

//מחיקת חבר.
export const deleteMember = async (memberID) => {
    await pool.query('DELETE FROM members WHERE MemberID = ?', [memberID]);
};


//קריאת כל החיסונים.
export const getVaccines= async () => {
    const [members] = await pool.query('SELECT * FROM coronavaccines order by  DateOfVaccines');
    return members;
};

// פונקציה לעדכון מועד סיום מחלה
export const updateEndDateOfDisease = async (MemberId, EndDateOfDisease) => {
    try {
        // כאן אנו בודקים אם קיים חבר עם המזהה הנתון ומעדכנים את התאריך לתשובה חיובית
        const query = 'UPDATE coronapatients SET DateOfRecovery = ? WHERE MemberId = ?';
        await pool.query(query, [EndDateOfDisease, MemberId]);
    } catch (error) {
        throw new Error(`Failed to update end date of disease: ${error.message}`);
    }
};


// פונקציה לעדכון מועד תשובה חיובית
export const updatePositiveTestDate = async (MemberId, DateOfReceiptOfResult) => {
    try {
        // כאן אנו בודקים אם קיים חבר עם המזהה הנתון ומעדכנים את המועד לתשובה חיובית
        const query = 'UPDATE coronapatients SET DateOfReceiptOfResult = ? WHERE MemberId = ?';
        await pool.query(query, [DateOfReceiptOfResult, MemberId]);
    } catch (error) {
        throw new Error(`Failed to update positive test date: ${error.message}`);
    }
};
// פונקציה לקבלת מועד סיום מחלה
export const getDateOfRecovery = async (MemberId) => {
    try {
        const query = 'SELECT DateOfRecovery FROM coronapatients WHERE MemberId = ?';
        const [result] = await pool.query(query, [MemberId]);
        if (result.length > 0) {
            return result[0].DateOfRecovery;
        } else {
            return null; // אם לא נמצא מועד סיום מחלה עבור החבר
        }

    } catch (error) {
        throw new Error(`Failed to get date of recovery: ${error.message}`);
    }
};

// פונקציה לקבלת מועד תשובה חיובית
export const getPositiveTestDate = async (MemberId) => {
    try {
        // כאן אנו מחזירים את המועד לתשובה חיובית מבסיס הנתונים
       
        const query = 'SELECT DateOfReceiptOfResult FROM coronapatients WHERE MemberId = ?';
        const [result] = await pool.query(query, [MemberId]);
        if (result.length > 0) {
            return result[0].DateOfReceiptOfResult;
        } else {
            return null; 
        }

    } catch (error) {
        throw new Error(`Failed to get positive test date: ${error.message}`);
    }
};

//קריאת פרטי חיסונים עבור מבוטח מסוים.
export const getVaccinesByMemberId = async (memberID) => {
    const [vaccines] = await pool.query('SELECT * FROM coronavaccines WHERE MemberId = ? order by DateOfVaccines', [memberID]);
    return vaccines;
};

//עדכון פרטי חיסונים עבור מבוטח מסוים.
export const updateVaccines = async (memberID, vaccineData) => {
    const { DateOfVaccines, VaccineManufacturer } = vaccineData;
    const query = 'UPDATE coronavaccines SET DateOfVaccines = ?, VaccineManufacturer = ? WHERE MemberId = ?';
    await pool.query(query, [DateOfVaccines, VaccineManufacturer, memberID]);
};

//קריאת תאריכי חולי קורונה עבור מבוטח מסוים.
export const getCovidDatesByMemberId = async (memberID) => {
    const [covidDates] = await pool.query('SELECT DateOfRecovery FROM coronapatients WHERE MemberId = ?', [memberID]);
    return covidDates;
};

// קריאת יצרן החיסון עבור מבוטח מסוים
export const getVaccineManufacturer = async (memberID) => {
    const [vaccines] = await pool.query('SELECT VaccineManufacturer FROM coronavaccines WHERE MemberId = ?', [memberID]);
    return vaccines;
};

//עדכון תאריכי חולי קורונה עבור מבוטח מסוים.
export const updateCovidDates = async (memberID, covidDatesData) => {
    const { DateOfRecovery } = covidDatesData;
    const query = 'UPDATE coronapatients SET DateOfRecovery = ? WHERE MemberId = ?';
    await pool.query(query, [DateOfRecovery, memberID]);
};