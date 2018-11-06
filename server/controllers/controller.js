module.exports = {
    addDream: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { dream, user_id } = req.body;
        // console.log('req.body', req.body)

        dbInstance
            .addDream([dream, user_id])
            .then(response => res.status(200).json(response))
            .catch(error => {
                res.status(500).json(error);
                console.log(error)
            })
    },
    getDream: (req, res, next) => {
        // console.log(req.params.id)


        const dbInstance = req.app.get('db')
        // console.log("Controller.js", req.session.passport.profile.id)


        // dbInstance.getDream(req.session.passport.user.profile_id).then(response => res.status(200).json(response));



        dbInstance
            .getDream(req.params.id)

            .then(response =>

                res.status(200).send(response)
            )


            .catch(error => {
                res.status(500).json(error)
                console.log('AYYYYY', error)
            })
    },
    shareDream: (req, res, next) => {
        console.log(req.body.value, 'req.body in shareDream')


        const dbInstance = req.app.get('db')
        dbInstance
            .shareDream(req.body.value)
            .then(response => {
                res.status(200).send(response)
            })
            .catch(error => {
                res.status(500).send(error)
                console.log('Error in shareDream in ctrller', error)
            })
    },
    getPublicDreams: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance
            .getPublicDreams()
            .then(response => res.status(200).send(response))
            .catch(error => {
                res.status(500).send(error)
                console.log('ERROR IN GETPUBLICDREAMS', error)
            })
    }

}