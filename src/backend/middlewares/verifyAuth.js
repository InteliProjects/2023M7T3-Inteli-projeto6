const express = require('express');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyAuthentication = (req, res, nxt) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: "Não Autorizado", code: 401
        })
        return
    }
    [, posToken] = token.split(" ");

    try {
        const {id} = jwt.verify(posToken, process.env.USER_AUTH_TOKEN);
        req.id = id;
        return nxt();
    } catch(error){
        res.status(401).json({
            message: "Não Autorizado!", code: 401
        })
        return
    }
}

module.exports = {
    verifyAuthentication
}