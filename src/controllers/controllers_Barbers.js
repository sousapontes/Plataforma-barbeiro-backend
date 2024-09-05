const bcrypt = require('bcrypt');
const pool = require('../models'); // Database connection


exports.NewBarbeiro = async (req, res) => {
    const { name, email, phone, password, especialty, experience } = req.body;
    if(!name){
        return res.send('campo nome obrigatorio!')
    }
    if(!email){
        return res.send('campo email obrigatorio!')
    }
    if(!phone){
        return res.send('campo telefone obrigatorio!')
    }
    if(!password){
        return res.send('campo senha obrigatoria!')
    }
    if(!especialty){
        return res.send('campo especialidade obrigatorio!')
    }
    if(!experience){
        return res.send('campo experiencia obrigatorio!')
    }
    
    try {
        // Check if email already exists
        const userExists = await pool.Barber.findOne({ where: { email: email } });
        const NameUserExists = await pool.Barber.findOne({ where: { name: name } });
        if (userExists || NameUserExists) {
            return res.status(400).json({ msg: 'Email and Name already registered' });
        }
        

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert barber into database
        const newBarbeiro = await pool.Barber.create({name, email, phone, password : hashedPassword, especialty, experience})
            return res.send('cadastrado com sucesso!') 
            return newBarbeiro
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

