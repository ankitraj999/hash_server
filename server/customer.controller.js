const Customer=require('./schema/customersecurityschema')
const OptObject=require('./schema/OTPschema')
const getCustomerByHash = async (req,res)=>{
    //const email = req.query.email;
    const {hash} = req.params;
    try {
        const customer = await Customer.findOne({ hash: hash });
        if (!customer) {
          return res.status(404).send('Customer not found');
        }
        res.json({pin:customer.pin});
      } catch (error) {
        res.status(500).send('Error retrieving customer');
      }
}
const getCustomerByEmail = async (req,res)=>{
    //const email = req.query.email;
    const {email} = req.params;
    try {
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
          return res.status(404).send('Customer not found');
        }
        res.json({customer});
      } catch (error) {
        res.status(500).send('Error retrieving customer');
      }
}
const getOptByEmail = async (req,res)=>{
    //const email = req.query.email;
    const {email} = req.params;
    try {
        const customer = await OptObject.findOne({ email: email });
        if (!customer) {
          return res.status(404).send('Customer not found');
        }
        res.json(customer);
      } catch (error) {
        res.status(500).send('Error retrieving customer');
      }
}
const getCustomer=async (req,res)=>{
    try{
        const customers= await Customer.find({});
        res.status(200).json(customers);
    }catch(error){
        res.status(500).json({message:error.message});

    }
}
const createCustomer=async (req,res)=>{
    try{
        const customer= await Customer.create(req.body);
        res.status(200).json(customer);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const createUpdateOPT=async (req,res)=>{
    try{
        const {email} = req.params;
        const customer = await OptObject.findOneAndUpdate({ email: email }, req.body, { new: true });
        if (!customer) {
            //if not found
            return res.status(200).json(await OptObject.create(req.body));
        }
        const updatedCustomer= await OptObject.findOne({ email: email });
        res.status(200).json(updatedCustomer);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
const updateCustomer=async (req,res)=>{
    try{
        const {email} = req.params;
        const customer= await Customer.findOneAndUpdate({ email: email }, req.body, { new: true });
        if(!customer){
            return res.status(400).json({message: "customer is not found"})
        }
        const updatedCustomer= await Customer.findOne({ email: email });
        res.status(200).json(updatedCustomer)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports={getCustomerByEmail,getOptByEmail,createUpdateOPT,getCustomerByHash,getCustomer,createCustomer,updateCustomer}