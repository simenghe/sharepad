import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: "-",
  length: 2,
};

export default function generateName(): string {
  return uniqueNamesGenerator(customConfig); // big-donkey
}
