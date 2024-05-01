const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModels");


const createContact = asyncHandler(async(req, res) => {
    const {username, email, phone} = req.body;

    if (!username || !email || !phone) {
        res.status(400).json({
            msg : "All fields are mandatory"
        })
    }

    const contact = await Contact.create({
        username,
        email,
        phone,
        userId : req.user.id
    })

    res.status(201).json({msg : "create Contact"})
})

const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);


    if (!contact) {
        res.status(400).json({msg : "contact not found"})
    }

    res.status(200).json({msg : contact})

});


const updateContact = asyncHandler(async (req,res) => {

    const contact = await Contact.findByIdAndUpdate(req.params.id);
    

    if (!contact) {
        res.status(400).json({msg : "no contact found"});
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status.json({msg : "user cannot update other users contact"})
    } 

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new : true}

    );

    res.status(200).json(updatedContact)


});



const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(400).json({msg : "no user of this id"});
    }

    if (contact.userId.toString()  !== req.user.id) {
        res.status(400).json({msg : "cant access other user accounts"});
    }

    await Contact.deleteOne(
        req.params.id,
    );

    res.status(200).json(contact);
})


