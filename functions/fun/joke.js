/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
*/
import axios from "axios";
import print from "#utils/print.js";

export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  const ephemeral = type === "slash" ? true : false;

  await axios.get("https://api.dadjokes.io/api/random/joke")
    .then(response => {
      const joke = response.data.body[0];

      return client.sendEmbed(interaction, {
        color: "DarkAqua",
        title: "Dad Joke",
        description: `\`\`\`${joke.setup}\n\n${joke.punchline}\`\`\``,
        footer: client.getFooter(interaction, type),
      }, ephemeral);
    }).catch(error => {
      print(error.message, "error");

      return client.sendEmbed(interaction, {
        color: "DarkAqua",
        title: "Dad Joke",
        description: "```Looks like the dad is too tired to tell you some jokes, please try again later.```",
        footer: client.getFooter(interaction, type),
      }, ephemeral);
    });
}