const Error = (err , req,res,next) => {

    const status = err.status || 500;
    const message = err.message || "Something went Wrong";
    console.log(message);
    res.status(status).json({
        success:false,
        message:message
    })
}

module.exports = {Error}