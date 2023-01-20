# Discord-Bot-E7
This Discord Bot was created using NodeJS, Google Sheets API, and DiscordJS API to help Epic 7 mobile game players to improve their guild war match ups by connecting their discord server with an in-depth Google Sheet.

## Getting Started
1. In order to use this discord bot, you must enter your corresponding credentials for both the Discord API and Google Sheets API.
2. Start the bot using `node bot.js` in your terminal. Alternatively, you can find hosting for the bot to use it virtually and not on your local machine. The guild that is using this bot is using Replit for hosting.
3. Once the bot has logged in (e.g. Bot #1234 is ready!), the discord server will listen to three names that 
4. The three inputs will populate into the Google Sheet and return back data. In this instance, I have connected it to a Google Sheets that populates Epic 7 data.
5. Data is sent into the discord channel via embed. Screenshots below.

## Screenshots

Commands:
1. User write "!commands".
![image](https://user-images.githubusercontent.com/99042142/213616023-3d634ab9-44f8-4e60-9c7e-fd33583c8ee5.png)
2. Commands will be returned to user.
![image](https://user-images.githubusercontent.com/99042142/213616162-2fe95146-31f0-4a52-8559-d0aacb0c0db3.png)

Team Composition Check:
1. User inputs three names into the discord channel following the prefix "!cc".
![image](https://user-images.githubusercontent.com/99042142/213616229-2d110c15-42e6-44a7-9da1-c2a9c7652c84.png)
2. Inputs will be populated in the google sheet.
![image](https://user-images.githubusercontent.com/99042142/203719623-66c4b43a-5edb-42f8-a87c-22f7b35f9e31.png)
3. Data populated from Google Sheets will be put into an embed and sent to discord through discord API.
![image](https://user-images.githubusercontent.com/99042142/213616816-dcb149ba-81e4-4d9b-b0fb-a3c7e4a985b7.png)
![image](https://user-images.githubusercontent.com/99042142/213616767-a18203df-33c6-4df1-99d9-82a83c4b78dd.png)



## Dependencies
- NodeJS
- Google Sheets API
- DiscordJS API
