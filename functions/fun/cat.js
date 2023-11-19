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

  await axios.get("https://api.thecatapi.com/v1/images/search")
    .then(response => {
      const { url } = response.data[0];

      return client.sendEmbed(interaction, {
        color: "Aqua",
        title: "Cute cat!",
        image: url,
        footer: client.getFooter(interaction, type),
      }, ephemeral);
    }).catch(error => {
      print(error.message, "error");

      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```An error occurred while running this command.```",
        footer: client.getFooter(interaction, type),
      }, ephemeral);
    });
}