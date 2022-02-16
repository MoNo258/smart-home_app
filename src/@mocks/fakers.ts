import { faker } from "@faker-js/faker";

const name1 = faker.name.findName();
const email1 = faker.internet.email();
const login1 = faker.random.word();
const avatar1 = faker.internet.avatar();
const url1 = faker.internet.url();
const bio1 = faker.random.randomWords();
const date1 = faker.date.past();

const firstRandomUser: IUser = {
  login: login1,
  id: 9876,
  node_id: "1234",
  avatar_url: avatar1,
  gravatar_id: "1234",
  url: url1,
  html_url: url1,
  followers_url: "string",
  following_url: "string",
  gists_url: "string",
  starred_url: "string",
  subscriptions_url: "string",
  organizations_url: "string",
  repos_url: "string",
  events_url: "string",
  received_events_url: "string",
  type: "User",
  site_admin: false,
  name: name1,
  company: "company name",
  blog: "string",
  location: "location",
  email: email1,
  hireable: "",
  bio: bio1,
  twitter_username: "",
  public_repos: 123,
  public_gists: 123,
  followers: 1,
  following: 2,
  created_at: date1.toString(),
  updated_at: date1.toString(),
};

const name2 = faker.name.findName();
const email2 = faker.internet.email();
const login2 = faker.random.word();
const avatar2 = faker.internet.avatar();
const url2 = faker.internet.url();
const bio2 = faker.random.randomWords();
const date2 = faker.date.past();
const secondRandomUser: IUser = {
  login: login2,
  id: 1234,
  node_id: "1234",
  avatar_url: avatar2,
  gravatar_id: "1234",
  url: url2,
  html_url: url2,
  followers_url: "string",
  following_url: "string",
  gists_url: "string",
  starred_url: "string",
  subscriptions_url: "string",
  organizations_url: "string",
  repos_url: "string",
  events_url: "string",
  received_events_url: "string",
  type: "User",
  site_admin: false,
  name: name2,
  company: "company name",
  blog: "string",
  location: "location",
  email: email2,
  hireable: "",
  bio: bio2,
  twitter_username: "",
  public_repos: 123,
  public_gists: 123,
  followers: 1,
  following: 2,
  created_at: date2.toString(),
  updated_at: date2.toString(),
};

export const fakeUsersArray: IUser[] = [firstRandomUser, secondRandomUser];

export const fakeUsersOrg: IUsersOrgs[] = [
  {
    login: faker.company.companyName(),
    id: 12,
    node_id: "string",
    url: "string",
    repos_url: "string",
    events_url: "string",
    hooks_url: "string",
    issues_url: "string",
    members_url: "string",
    public_members_url: "string",
    avatar_url: "string",
    description: faker.company.catchPhraseDescriptor(),
  },
];

//   const fakeEmployee = {
//         name: '{{name.firstName}}',
//         surname: '{{name.lastName}}',
//         email: '{{internet.email}}',
//         directTeam: '{{commerce.productName}}',
//     };
//     const employee = JSON.parse(faker.fake(JSON.stringify(fakeEmployee)));
