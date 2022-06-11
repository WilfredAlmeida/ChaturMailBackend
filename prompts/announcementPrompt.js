class announcementPrompt {
    constructor(emailSubject, keywords) {

        this.emailSubject = emailSubject
        this.keywords = keywords

        this.title = "Announcement"
        this.slug = "announcement-prompt"
        this.id = "2"
        this.maxTokens = 250
        this.updatedOn=1652450638
        
        this.shortDescription="An email to announce something"
        this.iconUrl="https://img.icons8.com/external-sbts2018-lineal-color-sbts2018/58/000000/external-speaker-ecommerce-basic-1-sbts2018-lineal-color-sbts2018.png"
        this.description="An email to announce something"

    }

    setSubjectAndKeywords(emailSubject, keywords) {
        this.emailSubject = emailSubject
        this.keywords = keywords
        this.promptText = `
This is a mail generator\n1.Subject: Announcement of new store, 10-15\nkeywords: Good Growth,New Store,Heavy Discounts\n\nDear Team,\n\nWe are excited to announce that, due to our remarkable growth over the last 10 years, we are expanding!\n\nIn fact, we are opening a new store besides our office.\n\nWe invite you to celebrate with us during the big opening day on April 20.There will be many exciting surprises, including irresistible discounts.\n\nIf you want to make use of your opening day discount, you're welcome\n\nSee you there.\n\nRegards,\nTeam XYZ\n&&&&Mail Sentiment: Neutral&&&&\n####\n\n2.Subject:Extra lecture scheduled,keywords:pending syllabus,extra lecture,sunday 9am,compulsary attendance\n\nHello Students,\nWe regret to inform you that an extra lecture has been scheduled for Sunday, September 9th at 9am in order to make up for any material that may have been missed in the previous lectures. This is a compulsory attendance lecture and all students are expected to be in attendance.\nWe hope that this inconvenience will not cause too much trouble for you and that you can still make it to all of the other lectures scheduled for this term.\nThank you for your cooperation.\nSincerely,The Faculty &&&&Mail Sentiment: Negative&&&&3.Subject: ${this.emailSubject}\nkeywords:${this.keywords}
`

    }

}

module.exports = announcementPrompt