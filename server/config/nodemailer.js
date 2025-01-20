import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sridivya8143@gmail.com',
        pass: 'aqfg khrz ydmc yuhp'
    }
});


export default transporter;