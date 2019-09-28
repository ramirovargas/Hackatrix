const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
router.get('/add', (req, res) => {
    res.render('agro/add');
});

router.post('/add', async (req, res) => {
    const { nombre, categoria, lugar, direccion,startdate,endate,tipo } = req.body;
    const newLink = {
        nombre,
        categoria,
        lugar,
        direccion,
        startdate,
        endate,
        tipo,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO agro set ?', [newLink]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/agro');
});

router.get('/', isLoggedIn, async (req, res) => {
    
    const agro = await pool.query('SELECT * FROM agro WHERE user_id = ?', [req.user.id]);
    //ordena por mas reciente
    agro.sort(function(a,b){
        return new Date(b.creacion) - new Date(a.creacion);
      });
    res.render('agro/list', { agro });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM agro WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/agro');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const agro = await pool.query('SELECT * FROM agro WHERE id = ?', [id]);
    startdate=(agro[0].startdate.getFullYear()+ "-" +("0" +(agro[0].startdate.getMonth()+1)).slice(-2)+ "-" +("0" +agro[0].startdate.getDate()).slice(-2))
    endate=(agro[0].endate.getFullYear()+ "-" +("0" +(agro[0].endate.getMonth()+1)).slice(-2)+ "-" +("0" +agro[0].endate.getDate()).slice(-2))
    agro[0].startdate=startdate
    agro[0].endate=endate
    res.render('agro/edit', {link:agro[0]});
});

router.get('/detalle/:id', async (req, res) => {
    const { id } = req.params;
    const agro = await pool.query('SELECT * FROM agro WHERE id = ?', [id]);
    startdate=(agro[0].startdate.getFullYear()+ "-" +("0" +(agro[0].startdate.getMonth()+1)).slice(-2)+ "-" +("0" +agro[0].startdate.getDate()).slice(-2))
    endate=(agro[0].endate.getFullYear()+ "-" +("0" +(agro[0].endate.getMonth()+1)).slice(-2)+ "-" +("0"+agro[0].endate.getDate()).slice(-2))
    agro[0].startdate=startdate
    agro[0].endate=endate
    res.render('agro/detalle', {link:agro[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, lugar, direccion,creacion,startdate,endate,tipo} = req.body; 
    const newLink = {
        nombre,
        categoria,
        lugar,
        direccion,
        creacion,
        startdate,
        endate,
        tipo,
    };
    await pool.query('UPDATE agro set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/agro');
});

module.exports = router;