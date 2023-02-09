# Discord-Bot-E7
This Discord Bot was created using NodeJS, Google Sheets API, and DiscordJS API to help Epic 7 mobile game players improve their guild war match ups, provide player gear score and winrates, and record team compositions that have no yet been created. The bot functions by connecting their discord server with an in-depth Google Sheet created by one of the players.

This discord bot is currently used by the 120 members of the #1 ranked guild in Epic 7.

## Getting Started
1. In order to use this discord bot, you must either provide your own discord development and google sheets credentials duplicate/fork this bot, or contact me for permissions to add this bot into your server.
2. Start the bot using `node bot.js` in your terminal. Alternatively, you can find hosting for the bot to use it virtually and not on your local machine. The guild that is using this bot is using AWS Lambda for hosting.
3. Once the bot has logged in (e.g. "Status"), the discord server will listen for user inputs.
4. Based on the user input, it will read or write information from and to the google sheet.
5. Data is sent into the discord channel via embed. Screenshots and example of commands below.

## Screenshots

#### Commands ####
1. User writes "!commands".
![image](https://user-images.githubusercontent.com/99042142/213616023-3d634ab9-44f8-4e60-9c7e-fd33583c8ee5.png)
2. Commands will be returned to user.
![image](https://user-images.githubusercontent.com/99042142/213699559-61ef5e6d-ab93-4d2d-bc56-2f7518bbb5bd.png)

#### Team Composition Check ####
1. User inputs three names into the discord channel following the prefix "!cc".
![image](https://user-images.githubusercontent.com/99042142/213616229-2d110c15-42e6-44a7-9da1-c2a9c7652c84.png)
2. Inputs will be populated in the google sheet.
![image](https://user-images.githubusercontent.com/99042142/213617437-630649b1-22df-46fa-a051-19120786f33c.png)
4. Data populated from Google Sheets will be put into an embed and sent to discord through discord API.
![image](https://user-images.githubusercontent.com/99042142/213616816-dcb149ba-81e4-4d9b-b0fb-a3c7e4a985b7.png)
![image](https://user-images.githubusercontent.com/99042142/213616767-a18203df-33c6-4df1-99d9-82a83c4b78dd.png)
5. More examples:
![image](https://user-images.githubusercontent.com/99042142/217400904-802e0075-3838-4b80-bab4-71c2d2755bb0.png)


#### Gear Score Check ####
1. User inputs stats of gear with abbreviation for specific traits.
2. Data of total gear score with unique multipliers applied will be returned back to user.
![image](https://user-images.githubusercontent.com/99042142/217400749-cf2ba461-04d5-40f6-be37-05970aa90dc1.png)

#### Non-Response Report ####
1. Team compositions that have not been added to the Google Sheets will be added to the non-response report.
2. Each time a team composition is added to the list, the occurances column will +1.
3. Once the team composition has been added, the sheet will automatically move the non-response team composition to the 'finished comp' section.
![image](https://user-images.githubusercontent.com/99042142/216804462-b8771975-2e7c-4e76-8a6d-c57d8f7b3ef7.png)
![image](https://user-images.githubusercontent.com/99042142/216804542-18e44abf-1830-4b2c-86c4-c06c61bb10cb.png)



## Dependencies
- NodeJS
- Google Sheets API
- DiscordJS API
