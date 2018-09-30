
const dbClient = require('./connect/connect');
const params = {
    userOnlineTable:'useronline',
    usersNameTable:'usersname',
    usersMessages:'chatmessages',
};
const connectUser = ({socketId,msg},callback)=>{
    dbClient.connect((err, client, done) => {
        const shouldAbort = (err) => {
            if (err) {
                /*if(err.code === '23505' && err.table === params.usersNameTable){
                    return false;
                }*/
                callback(err);
                client.query('ROLLBACK');
            }
            return !!err
        };
        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return;
            const query = {
                text: `INSERT INTO ${params.usersNameTable}(name) VALUES($1) RETURNING id`,
                values: [msg],
            };
            client.query(query, (err, res) => {
                if (shouldAbort(err)) return;

                const queryOnline = {
                    text: `INSERT INTO ${params.userOnlineTable}(socketkey, nameid) VALUES ($1, (select id from ${params.usersNameTable} where name = $2))`,
                    values: [socketId,msg],
                };
                client.query(queryOnline, (err, res) => {
                    console.log(err);
                    if (shouldAbort(err)) return;
                    client.query('COMMIT', (err) => {

                        callback(err, res);
                        done();
                    });
                });
            });
        });
    });
};

module.exports = {
    connectUser
};