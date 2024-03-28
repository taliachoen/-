import express from "express";
import {getmembers,getVaccines,getPositiveTestDate ,getDateOfRecovery, deleteMember, updateMember, getMemberById, createMember, getVaccinesByMemberId, updateVaccines, getCovidDatesByMemberId, updateCovidDates } from './database.js';

const app = express();
const PORT = 8080;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use(express.json());

// קריאת כל החברים
app.get('/hmo/members', async (req, res) => {
    try {
        const members = await getmembers();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// קריאת חבר על פי זיהוי
app.get('/hmo/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await getMemberById(id);
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// עדכון חבר קיים
app.put('/hmo/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await updateMember(id, req.body);
        res.json({ message: 'Member updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// יצירת חבר חדש
app.post('/hmo/members', async (req, res) => {
    try {
        const memberId = await createMember(req.body);
        res.status(201).json({ id: memberId, message: 'Member added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// מחיקת חבר
app.delete('/hmo/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteMember(id);
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// קריאת מועד תשובה חיובית עבור מבוטח מסוים
app.get('/hmo/coronapatients/:MemberId/DateOfReceiptOfResult', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const positiveTestDate = await getPositiveTestDate(MemberId);
        res.json(positiveTestDate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// קריאת מועד סיום מחלה עבור מבוטח מסוים
app.get('/hmo/coronapatients/:MemberId/dateOfRecovery', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const dateOfRecovery = await getDateOfRecovery(MemberId);
        res.json(dateOfRecovery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// עדכון מועד תשובה חיובית עבור מבוטח מסוים
app.put('/hmo/coronapatients/:MemberId/DateOfReceiptOfResult', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const { EndDateOfDisease } = req.body;
        await updateEndDateOfDisease(MemberId, EndDateOfDisease);
        res.json({ message: 'End date of disease updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// עדכון מועד סיום מחלה עבור מבוטח מסוים
app.put('/hmo/coronapatients/:MemberId/dateOfRecovery', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const { EndDateOfDisease } = req.body;
        await updateEndDateOfDisease(MemberId, EndDateOfDisease);
        res.json({ message: 'End date of disease updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/hmo/members', async (req, res) => {
    try {
        const members = await getmembers();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// קריאת כל החיסונים
app.get('/hmo/coronavaccines', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const vaccines = await getVaccines();
        res.json(vaccines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// קריאת חיסונים עבור מבוטח מסוים
app.get('/hmo/coronavaccines/:MemberId', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const vaccines = await getVaccinesByMemberId(MemberId);
        res.json(vaccines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// עדכון פרטי חיסונים עבור מבוטח מסוים
app.put('/hmo/coronavaccines/:MemberId/DateOfVaccines', async (req, res) => {
    try {
        const { MemberId } = req.params;
        await updateVaccines(MemberId, req.body);
        res.json({ message: 'Vaccines updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// קריאת תאריכי חולי קורונה עבור מבוטח מסוים
app.get('/hmo/coronavaccines/:MemberId/DateOfVaccines', async (req, res) => {
    try {
        const { MemberId } = req.params;
        const covidDates = await getCovidDatesByMemberId(id);
        res.json(covidDates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// עדכון תאריכי חולי קורונה עבור מבוטח מסוים
app.put('/hmo/coronavaccines/:MemberId/DateOfVaccines', async (req, res) => {
    try {
        const { MemberId } = req.params;
        await updateCovidDates(id, req.body);
        res.json({ message: 'Covid dates updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// קריאת יצרן החיסון עבור מבוטח מסוים
app.get('/hmo/coronavaccines/:MemberId/vaccineManufacturer',
async (req, res) => {
    try {
        const { MemberId } = req.params;
        const manufacturer = await getVaccineManufacturer(MemberId);
        res.json(manufacturer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});