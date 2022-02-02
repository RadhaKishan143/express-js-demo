const handleServerError = (error, req, res, next) => {
    // error handler code
    console.log(error.message);
    return res.status(200).json({
        success: false,
        message: "Something wents wrong. We have notified out develoe.",
        data: null,
        error: null
    })
};

module.exports = handleServerError;