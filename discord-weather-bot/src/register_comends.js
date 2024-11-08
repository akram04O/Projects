require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hello',
        description: 'Says hello!',
    },
    {
        name: 'bye',
        description: 'Says bye!',
    },
    {
        name: 'sum',
        description: 'Sums two numbers!',
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },
    {
        name: 'weather',
        description: 'Get the weather for a specified location',
        options: [
            {
                name: 'location',
                description: 'The location to get the weather for',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.Token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.Client_ID,
                process.env.Guild_ID
            ),
            { body: commands }
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error('There was an error', error);
    }
})();
