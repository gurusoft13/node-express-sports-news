const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  country: {
    type: String,
    unique: true,
    required: true,
  },
  language: {
    type: String,
  },
  teams: [
    {
      name: { type: String, default: '', maxlength: 400 },
      icon: { type: String },
      meta_title: { type: String },
      meta_description: { type: String },
      intro_text: { type: String },
      footer_text: { type: String },
      ad_text: { type: String },
    },
  ],
})

TeamSchema.methods = {
  addTeam: function (team) {
    this.teams.push({
      name: team.name,
      icon: team.icon,
      meta_title: team.meta_title,
      meta_description: team.meta_description,
      intro_text: team.intro_text,
      footer_text: team.footer_text,
      ad_text: team.ad_text,
    })
  },
}

mongoose.model('team', TeamSchema)
