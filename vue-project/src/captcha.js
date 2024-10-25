import express from "express";
import session from "express-session";
import path from "path";
import fs from "fs";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));


const captchaFolder = path.join(__dirname, '/src/captchaImages');


app.get('/generate-captcha', (req, res) => {
   // Read the CAPTCHA images from the folder
   fs.readdir(captchaFolder, (err, files) => {
       if (err) {
           return res.status(500).json({ error: "Failed to load CAPTCHA images" });
       }
      
       // Filter to only include .png files
       const captchaFiles = files.filter(file => file.endsWith('.png'));
      
       // Randomly select a CAPTCHA image
       const randomFile = captchaFiles[Math.floor(Math.random() * captchaFiles.length)];
      
       // Extract the CAPTCHA text from the filename (remove the .png extension)
       const captchaText = path.basename(randomFile, '.png');
      
       // Store the CAPTCHA text in the session
       req.session.captcha = captchaText;
      
       // Return the image path relative to the static files (public directory)
       res.json({ image: '/src/captchaImages/${randomFile}' });
   });
});


app.post('/validate-captcha', (req, res) => {
   const userCaptcha = req.body.captchaText;
   if (userCaptcha && userCaptcha.toLowerCase() === req.session.captcha.toLowerCase()) {
       res.json({ success: true });
   } else {
       res.json({ success: false, message: 'Incorrect CAPTCHA. Please try again.' });
   }
});


const PORT = 5173;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
