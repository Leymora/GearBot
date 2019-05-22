//Vilhelm Hansson 2018
//Started development: 05-14-2018

//Add bot to server https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot
//Get bot client ID: https://discordapp.com/developers/applications/me


//Require the discord.js module (npm install discord.js)
const Discord = require('discord.js');
//Require the config file
var { prefix, token, ownerID } = require('./config.json');

const package = require('./package.json');

var fs = require("fs");
var readline = require('readline');
var userScore = 0;
var userRank = "Default";
var dice = './Images/Dice1.png';

//Create a new Discord client
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`\n\n--------------- GearBot Version: ${package.version} ------------- Vilhelm Hansson 2019`);
    console.log(`Connected Successfully!`);
    console.log(`Bot Name: ${client.user.username}`);
    console.log(`Bot ID: ${client.user.id}`);
    console.log(`Command Prefix: ${prefix}`);
    client.user.setActivity(null);
    if(client.user.avatar != `e39c0584cb7492fc19514f9717dd236c`){ client.user.setAvatar(`./Avatars/GearBot.png`); }
});


client.on('message', message => {

//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
	function readScore()
	{	
		if (fs.existsSync(`./Scores/${message.author.id}.txt`))
		{
			userScore = fs.readFileSync(`./Scores/${message.author.id}.txt`, {"encoding": "utf-8"}); 
		}
		else
		{
			fs.writeFileSync(`./Scores/${message.author.id}.txt`, `1`);
			userScore = fs.readFileSync(`./Scores/${message.author.id}.txt`, {"encoding": "utf-8"});
		}
    }
 //-------------------------------------------------------------------------------------------------------- 

	function addScore()
	{
		userScore = fs.readFileSync(`./Scores/${message.author.id}.txt`, {"encoding": "utf-8"});
		var newUserScore = parseFloat(userScore) + 0.2;
        fs.writeFileSync(`./Scores/${message.author.id}.txt`, newUserScore.toFixed(1));
        if (newUserScore == 10) 	message.channel.send(`Congratulations <@${message.author.id}> ! You just leveled up to: **Member ⭐**`);	
        if (newUserScore == 30) 	message.channel.send(`Congratulations <@${message.author.id}> ! You just leveled up to: **Great Member ⭐⭐**`);	
        if (newUserScore == 80) 	message.channel.send(`Congratulations <@${message.author.id}> ! You just leveled up to: **Master Member ⭐⭐⭐**`);	
    }
 //--------------------------------------------------------------------------------------------------------  

 function removeScore(x)
 {
     userScore = fs.readFileSync(`./Scores/${message.author.id}.txt`, {"encoding": "utf-8"});
     var newUserScore = parseFloat(userScore) - x;
     fs.writeFileSync(`./Scores/${message.author.id}.txt`, newUserScore.toFixed(1));		
 }
//-------------------------------------------------------------------------------------------------------- 


    function checkRank()
	{
		userScore = fs.readFileSync(`./Scores/${message.author.id}.txt`, {"encoding": "utf-8"});
		var rankScore = parseInt(userScore);
		Math.floor(rankScore);
		if(rankScore < 10)
		{
            //var emoji = client.emojis.find("name", "feelsrope");
            var emoji = client.emojis.find(emojis => emojis.name === "feelsrope");
			userRank = `Incel ${emoji}`;
		}
		if(rankScore >= 10)
		{
			userRank = "Member ⭐";
		}
		if(rankScore >= 30)
		{
			userRank = "Great Member ⭐⭐";
		}
		if(rankScore >= 80)
		{
			userRank = "Master Member ⭐⭐⭐";
		}
		
    }
//--------------------------------------------------------------------------------------------------------  

function rtd()
{
    
    if(userScore >= 10)
    {	
    
        var diceNumber = Math.floor(Math.random()* 6);
    
        switch(diceNumber)
        {
            case 0: dice  =  './Images/Dice1.png'; break;
            case 1: dice  =  './Images/Dice2.png'; break;
            case 2: dice  =  './Images/Dice3.png'; break;
            case 3: dice  =  './Images/Dice4.png'; break;
            case 4: dice  =  './Images/Dice5.png'; break;
            case 5: dice  =  './Images/Dice6.png'; break;
            default: dice =  './Images/Dice1.png'; break;
        }
        message.channel.send({ files: [dice] });
    }
    else 
    {
        message.channel.send(`<@${message.author.id}> You don't have enough points to do that. (Required Score: **10**)`);
    }
}
//--------------------------------------------------------------------------------------------------------  

function changePrefix(x)
{

    let confdata = {  
        prefix: x,
        token: token
    };

    let data = JSON.stringify(confdata, null, 2);
    fs.writeFileSync('./config.json', data);
    prefix = require('./config.json');
}

function makeBadge()
{
    fs.writeFileSync(`./badge.txt`, message.author.avatarURL);

}

//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------


    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    //With Prefix and arguments
    if(message.content.startsWith(prefix))
    {  
        switch(command)
    
        {
            case `serverinfo`: message.channel.send(`Server name: **${message.guild.name}**\nTotalt Members: **${message.guild.memberCount}**`); break;
            case `commands`: message.channel.send(`serverinfo\nrank\nscore\nrtd\ndownloadbot\nshop`); break;
            case `rank`: readScore(), checkRank(), message.channel.send(`<@${message.author.id}>\nYour score is: **${Math.floor(userScore)}**!\nRank: **${userRank}**`); break;
            case `score`: readScore(), checkRank(), message.channel.send(`<@${message.author.id}>\nYour score is: **${Math.floor(userScore)}**!\nRank: **${userRank}**`); break;
            case `badge`: makeBadge(); break;
            case `truescore`: readScore(), checkRank(), message.channel.send(`<@${message.author.id}>\nYour score is: **${userScore}**!\nRank: **${userRank}**`); break;
            case `rtd`: readScore(), rtd(); break;
            case `downloadbot`: message.channel.send(`https://github.com/SentimentalWoosh/GearBot`); break;
            case `join`: if (message.member.voiceChannel) {message.member.voiceChannel.join()} break;
            case `leave`: if (message.member.voiceChannel) {message.member.voiceChannel.leave()} break;
            case `dj`: if(client.user.avatar != `bb74ed375913dfda9b7c28984f0b1be7`){ client.user.setAvatar(`./Avatars/GearBotDJ.png`);} client.user.setActivity('Music'); break;
            case `changeprefix`: if(!args.length){message.channel.send("No prefix given. Prefix unchanged.")} else { changePrefix(args[0]);  message.channel.send(`Prefix successfully changed to ${prefix}`); } break;
            case `shutdown`: if(message.author.id == ownerID){ message.channel.send(`Shutting Down 👋`); process.exit();} else message.reply.send(`Only the server owner can access this command`); break;
            case `shop`: readScore(); 
                        if(!args.length){ 
                        message.channel.send("Shop alternatives:\n**Nickname <Desired Nickname> (10 Points)** "); 
                        } 
                        else if(args[0] == "nickname"){ 
                                if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')){ 
                                    message.channel.send(`I don't have permission to change nicknames`)
                                }
                                else if (userScore < 10){
                                        message.channel.send(`<@${message.author.id}> You don't have enough points. (Requires **10** points)`)
                                }
                                else {message.guild.members.get(message.author.id).setNickname(args[1]); removeScore(10);}
                        } break;
        }
    }
    //Without Prefix and arguments
    switch(message.content)
    {
        case `help`: message.channel.send(`Hi <@${message.author.id}> \nBot prefix: **${prefix}**\nType ${prefix}commands to know more`); break;
        default: readScore(), checkRank(), addScore(); break;
    }


});


client.login(token);
