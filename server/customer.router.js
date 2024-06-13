const express=require('express')
const router=express.Router()
const {getCustomerByEmail,getOptByEmail,createUpdateOPT,getCustomerByHash,getCustomer,createCustomer,updateCustomer}=require('./customer.controller')
const {sendEmail} =require('./services/sendEmail')
//get customers
router.get('/',getCustomer)
router.get('/:email',getCustomerByEmail)
//get a single customer
router.get('/hash/:hash',getCustomerByHash)
router.get('/otp/:email',getOptByEmail)
//post request
router.post('/',createCustomer)
router.post("/sendEmail", sendEmail);

// update a customer
router.put('/:email',updateCustomer)
router.put('/otp/:email',createUpdateOPT)


module.exports=router