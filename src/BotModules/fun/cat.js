const Commando = require('discord.js-commando');
const http = require("http");

class CatCommand extends Commando.Command {
    constructor (client) {
        super(client, {
            name: 'cat',
            aliases: ['neko', 'kissa'],
            group: 'fun',
            memberName: 'cat',
            throttling: {
                usages: 1,
                duration: 10
            },
            description: 'Posts awesome cat :cat:'
        });
    }

    async run(message, args) {
        var url = 'http://aws.random.cat/meow'; // currently you have to use aws subdomain
        try{
            http.get(url, function(res){
                var body = '';
        
                res.on('data', function(chunk){
                    body += chunk;
                });
        
                res.on('end', function(){
                    try {
                        var getResponse = JSON.parse(body);
                        var catReply = getResponse.file;

                        message.channel.send({
                            files: [catReply]
                        });
                    } catch(e) {
                        console.log("Got an error: ", e);
                        message.channel.send("The cat escaped! :crying_cat_face: ");
                    }
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
                message.channel.send("The cat escaped! :crying_cat_face: ");
            });
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = CatCommand;