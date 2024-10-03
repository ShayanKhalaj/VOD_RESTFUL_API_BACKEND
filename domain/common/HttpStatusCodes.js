class HttpStatusCodes{
    Continue(){
        return 100
    }
    SwitchingProtocols(){
        return 101
    }
    Processing(){
        return 102
    }
    EarlyHints(){
        return 103
    }
    OK(){
        return 200
    }
    Created(){
        return 201
    }
    Accepted(){
        return 202
    }
    NonAuthoritativeInformation(){
        return 203
    }
    NoContent(){
        return 204
    }
    ResetContent(){
        return 205
    }
    PartialContent(){
        return 206
    }
    MultiStatus(){
        return 207
    }
    MultiChoices(){
        return 300
    }
    MovedPermanently(){
        return 301
    }
    MovedTemporarily(){
        return 302
    }
    SeeOther(){
        return 303
    }
    NotModified(){
        return 304
    }
    UseProxy(){
        return 305
    }
    TemporaryRedirect(){
        return 307
    }
    PermanentRedirect(){
        return 308
    }

    BadRequest(){
        return 400
    }
    Unauthorized(){
        return 401
    }
    PaymentRequired(){
        return 402
    }
    Forbidden(){
        return 403
    }
    NotFound(){
        return 404
    }
    MethodNotAllowed(){
        return 405
    }
    NotAcceptable(){
        return 406
    }
    ProxyAuthenticationRequired(){
        return 407
    }
    RequestTimeout(){
        return 408
    }
    Conflict(){
        return 409
    }
    Gone(){
        return 410
    }
    LengthRequired(){
        return 411
    }
    PreconditionFailed(){
        return 412
    }
    RequestEntityTooLarge(){
        return 413
    }
    RequestURITooLong(){
        return 414
    }
    UnsupportedMediaType(){
        return 415
    }
    RequestedRangeNotSatisfiable(){
        return 416
    }
    ExpectationFailed(){
        return 417
    }
    IMATeaPot(){
        return 418
    }
    InsufficientSpaceOnResource(){
        return 419
    }
    MethodFailure(){
        return 420
    }
    MisdirectedRequest(){
        return 421
    }
    UnprocessableEntity(){
        return 422
    }
    Locked(){
        return 423
    }
    FailedDependency(){
        return 424
    }
    UpgradeRequired(){
        return 426
    }
    PreconditionRequired(){
        return 428
    }
    TooManyRequests(){
        return 429
    }
    RequestHeaderFieldsTooLarge(){
        return 431
    }
    UnavailableForLegalReasons(){
        return 451
    }
    InternalServerError(){
        return 500
    }
    NotImplemented(){
        return 501
    }
    BadGateway(){
        return 502
    }
    ServiceUnavailable(){
        return 503
    }
    GatewayTimeout(){
        return 504
    }
    HTTPVersionNotSupported(){
        return 505
    }
    InsufficientStorage(){
        return 507
    }
    NetworkAuthenticationRequired(){
        return 511
    }
}

export default HttpStatusCodes