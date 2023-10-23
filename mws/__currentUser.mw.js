module.exports = ({ meta, config, managers }) =>{
    return async ({req, res, next})=>{
        if(!req.headers.token){
            console.log('token required but not found')
            return managers.responseDispatcher.dispatch(res, {ok: false, code:401, errors: 'unauthorized'});
        }
        try {
            let decoded = managers.token.verifyLongToken({token: req.headers.token});
            console.log({decoded});
            if(!decoded){
                console.log('failed to decode-1')
                return managers.responseDispatcher.dispatch(res, {ok: false, code:401, errors: 'unauthorized'});
            };
            let currentUser = await managers.user.getUserById({ _id: decoded.userId });
            if(!currentUser)
                return managers.responseDispatcher.dispatch(res, {ok: false, code:401, errors: 'unauthorized'});
            next(currentUser);
        } catch(err){
            console.log(err.message)
            return managers.responseDispatcher.dispatch(res, {ok: false, code:401, errors: 'unauthorized'});
        }
    }
}