# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


def names
  [
      "Andrew", "Roman", "Vova", "Nastya",  "Naruto", "Madoka", "Gintoki",
      "Mikuru", "Dio", "Jotaru", "Jhonatan"
  ]
end

def contents
  [
      "As Kobayashi sets off for another day at work, she opens her apartment door only to be met by an unusually
    frightening sight—the head of a dragon, staring at her from across the balcony. The dragon immediately transforms
    into a cute, busty, and energetic young girl dressed in a maid outfit, introducing herself as Tooru.",
      "t turns out that the stoic programmer had come across the dragon the previous night on a drunken excursion to the
     mountains, and since the mythical beast had nowhere else to go, she had offered the creature a place to stay in her home.",
      "Thus, Tooru had arrived to cash in on the offer, ready to repay her savior's kindness by working as her personal maidservant.
     Though deeply regretful of her words and hesitant to follow through on her promise, a mix of guilt and Tooru's incredible dragon
     abilities convinces Kobayashi to take the girl in.",
      "Despite being extremely efficient at her job, the maid's unorthodox methods of housekeeping often end up horrifying Kobayashi and at
      times bring more trouble than help. Furthermore, the circumstances behind the dragon's arrival on Earth seem to be much more complicated
      than at first glance, as Tooru bears some heavy emotions and painful memories."
  ]
end

50.times do |n|
  name = names.sample + "#{n}"
  User.create(name: name, email: "email#{n}@gmail.com", password: "password")
end

200.times do
  User.order("RANDOM()").first.posts.create(content: contents.sample)
end

ChatRoom.create(title: "Chat", user_id:1)

500.times do |n|
  ChatRoom.first.messages.create(body:"message#{n}", user_id: 1)
end
