# Discord-Bot-E7
This Discord Bot was created using NodeJS, Google Sheets API, and DiscordJS API to help Epic 7 mobile game players to improve their guild war match ups by connecting their discord server with an in-depth Google Sheet.

## Getting Started
1. In order to use this discord bot, you must enter your corresponding credentials for both the Discord API and Google Sheets API.
2. Start the bot using `node bot.js` in your terminal. Alternatively, you can find hosting for the bot to use it virtually and not on your local machine. The guild that is using this bot is using Replit for hosting.
3. Once the bot has logged in (e.g. Bot #1234 is ready!), the discord server will listen to three names that 
4. The three inputs will populate into the Google Sheet and return back data. In this instance, I have connected it to a Google Sheets that populates Epic 7 data.
5. Data is sent into the discord channel via embed. Screenshots below.

## Screenshots
1. User inputs three names into the discord.
![image](https://user-images.githubusercontent.com/99042142/203718528-1fc4cb0e-6b7f-4c52-a5d5-809bdd76cc6c.png)
2. Inputs will be populated in the google sheet.
![image](https://user-images.githubusercontent.com/99042142/203719623-66c4b43a-5edb-42f8-a87c-22f7b35f9e31.png)
3. Data populated from Google Sheets will be put into an embed and sent to discord through discord API.
![image](https://user-images.githubusercontent.com/99042142/211983322-9561c0b8-a0a2-4f98-aec2-a39ed0a3b87c.png)
![image](https://user-images.githubusercontent.com/99042142/203719770-e9fc29f2-4c17-494d-adab-8cb9c53ca107.png)




## Dependencies
- NodeJS
- Google Sheets API
- DiscordJS API
