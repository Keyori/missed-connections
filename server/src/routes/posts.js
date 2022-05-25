const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const  { Post  } = require( '../models');
const {splitByCampus} = require('../helpers/utils')


//gets data necessary to render map view in the frontEnd
router.get('/map', async function (req, res) {

    const posts = await Post.findAll({
        attributes: ['campus', "geoLocation", "pid"],
        where: {
            geoLocation: {
                [Op.not]: null
            }
        }
    });
    res.send(splitByCampus(posts))

});


//get post given its pid
router.get('/:pid', async function (req, res,) {
    try{
        const post = await Post.findOne({where: {pid: req.params.pid}})
        if(post === null ) throw new Error('no post found with that corresponding pid')    
        res.send(post);

    }
    catch(err){
        console.trace(err)
        res.sendStatus(500)
    }

});

router.get("/", async function (req, res) {
    const posts = req.query.not !== undefined ? 
    await Post.findAll({where: {
        pid: {
            [Op.not] : req.query.not
        }
    }})
    :
    await Post.findAll();
  
    res.send(posts);
})


module.exports = router;
