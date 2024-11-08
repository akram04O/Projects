require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!✅☁️`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.channel.send('Pong!');
    console.log('👑 ' + message.author.username + '👑 pinged the bot!');
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'Hello' || commandName === 'hello') {
    await interaction.reply('Hello to you!☁️👑');
  } else if (commandName === 'Bye' || commandName === 'bye') {
    await interaction.reply('Bye!☁️👑');
  } else if (commandName === 'Sum' || commandName === 'sum') {
    const firstNumber = options.getNumber('first-number');
    const secondNumber = options.getNumber('second-number');

    if (firstNumber && secondNumber) {
      const sum = firstNumber + secondNumber;
      await interaction.reply(`The sum of ${firstNumber} and ${secondNumber} is ${sum}`);
  }
  } else if (commandName === 'weather') {
    const location = options.getString('location');

    weather.find({ search: location, degreeType: 'C' }, (err, result) => {
      if (err) {
        console.error(err);
        return interaction.reply('An error occurred while fetching the weather data.');
      }

      if (result && result.length > 0) {
        const weatherInfo = result[0];
        
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`Weather in ${weatherInfo.location.name}`)
          .setDescription(`**${weatherInfo.current.skytext}**`)
          .addFields(
            { name: 'Temperature', value: `${weatherInfo.current.temperature}°C`, inline: true },
            { name: 'Feels Like', value: `${weatherInfo.current.feelslike}°C`, inline: true },
            { name: 'Humidity', value: `${weatherInfo.current.humidity}%`, inline: true },
            { name: 'Wind Speed', value: weatherInfo.current.winddisplay, inline: true }
          )
          .setThumbnail(weatherInfo.current.imageUrl)
          .setFooter({ text: 'Weather data provided by MSN Weather' })
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('City not found. Please check the city name.');
      }
    });
  }
});

client.login(process.env.Token);
